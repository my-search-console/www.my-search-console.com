import { useLocation } from "@reach/router"
import dayjs from "dayjs"
import "dayjs/locale/de"
import "dayjs/locale/en"
import "dayjs/locale/es"
import "dayjs/locale/fr"
import "dayjs/locale/it"
import "dayjs/locale/ko"
import "dayjs/locale/pt"
import "dayjs/locale/ru"
import "dayjs/locale/tr"
import React, { ReactElement, useEffect } from "react"

import { IntlProvider } from "react-intl"

import de from "../../../i18n/messages/de.json"
import en from "../../../i18n/messages/en.json"
import es from "../../../i18n/messages/es.json"
import fr from "../../../i18n/messages/fr.json"
import it from "../../../i18n/messages/it.json"
import ko from "../../../i18n/messages/ko.json"
import pt from "../../../i18n/messages/pt.json"
import ru from "../../../i18n/messages/ru.json"
import tr from "../../../i18n/messages/tr.json"
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

const setDayjsLocale = (lang: string) => {
  dayjs.locale(lang)
}

export const Wrapper: React.FC<Props> = (props) => {
  const { langKey } = props
  const { pathname } = useLocation()
  const lang = langKey || getLangFromUrl(pathname)

  setDayjsLocale(lang)

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
