export const normalizeUrl = (params: {
  url: string
  locale: string
  removeLocaleIfExists?: boolean
}) => {
  if (params.url.startsWith("#")) {
    return `${params.url}`
  }

  if (params.removeLocaleIfExists) {
    if (params.url.match(/^\/[a-z]{2}\//)) {
      if (params.locale === "en")
        return params.url.replace(/^\/[a-z]{2}\//, `/`)

      return params.url.replace(/^\/[a-z]{2}\//, `/${params.locale}/`)
    }
  }

  if (params.url.startsWith("/")) {
    if (params.locale === "en") return `${params.url}`
    if (params.url.startsWith("/")) return `/${params.locale}${params.url}`
  }

  const { origin, pathname } = new URL(params.url)

  if (params.locale === "en") return origin + pathname

  return origin + "/" + params.locale + pathname
}
