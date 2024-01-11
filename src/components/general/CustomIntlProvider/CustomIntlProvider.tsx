import { useLocation } from "@reach/router"
import React, { ReactElement, useEffect } from "react"

import { IntlProvider } from "react-intl"

import en from "../../../i18n/messages/en.json"
import fr from "../../../i18n/messages/fr.json"
import ko from "../../../i18n/messages/ko.json"
import it from "../../../i18n/messages/it.json"
import es from "../../../i18n/messages/es.json"
import pt from "../../../i18n/messages/pt.json"
import tr from "../../../i18n/messages/tr.json"
import ru from "../../../i18n/messages/ru.json"
import de from "../../../i18n/messages/de.json"
import {
  connector,
  ContainerProps,
} from "./containers/CustomIntlProvider.containers"

const messages = { en, fr, ko, it, es, pt, ru, tr, de }

type Props = {
  langKey: string
  children: ReactElement
  onMount: (lang: string) => void
}

const getLangFromUrl = (pathname: string) => {
  try {
    const lang = pathname.split("/").filter((value) => value.length > 0)[0]
    if (messages[lang]) return lang
    return "en"
  } catch (e) {
    return "en"
  }
}

export const Wrapper: React.FC<Props> = (props) => {
  const { langKey } = props
  const { pathname } = useLocation()
  const lang = langKey || getLangFromUrl(pathname)

  useEffect(() => {
    props.onMount(lang)
  }, [])

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      {props.children}
    </IntlProvider>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const CustomIntlProvider = connector(Container)
