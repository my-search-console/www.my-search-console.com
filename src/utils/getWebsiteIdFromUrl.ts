import langs from "../constants/languages.json"
import { TOOLS_AVAILABLE } from "../constants/tools"

const features = TOOLS_AVAILABLE
const allowedLocales = langs.map((lang) => lang.id)

const splitUrl = (url: string) => {
  return url.split("/").filter(Boolean)
}

/**
 * https://www.sudoku.academy/indexation/ -> /indexation/
 * https://www.sudoku.academy/fr/indexation/ -> /indexation/
 * /fr/indexation/ -> /indexation/
 */
export const normalizeUrl = (url: string) => {
  const pathname = url.startsWith("http") ? new URL(url).pathname : url
  const hasLocale = allowedLocales.includes(splitUrl(pathname)[0])
  if (hasLocale) return "/" + splitUrl(pathname).slice(1).join("/")

  return pathname
}

export const getWebsiteIdFromUrl = (url: string) => {
  const urlNormalized = normalizeUrl(url)

  if (!features.some((feature) => urlNormalized.startsWith("/" + feature)))
    return {
      feature: null,
      websiteId: null,
    }

  if (features.some((feature) => urlNormalized === "/" + feature))
    return {
      feature: urlNormalized.replace("/", ""),
      websiteId: null,
    }

  const [feature, websiteId] = splitUrl(urlNormalized)

  return {
    feature,
    websiteId: websiteId || null,
  }
}
