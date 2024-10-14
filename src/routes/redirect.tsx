import { RouteComponentProps } from "@reach/router"
import React, { useEffect } from "react"
import { Loader } from "../components/general/Loader/Loader"
import { languagesAvailable } from "../constants/langs"

const getLangFromNavigator = (lang: string) => {
  const langWithoutLocale = lang.split("-")[0]

  if (languagesAvailable.includes(langWithoutLocale)) return langWithoutLocale
  return "en"
}

export const RedirectPage: React.FC<RouteComponentProps> = (props) => {
  useEffect(() => {
    const lang = getLangFromNavigator(navigator.language)
    if (lang === "en") window.location.replace(`/${props["*"]}`)
    else window.location.replace(`/${lang}/${props["*"]}`)
  }, [])

  return <Loader />
}
