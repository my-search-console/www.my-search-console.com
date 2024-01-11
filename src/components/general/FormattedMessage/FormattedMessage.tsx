import React from "react"
import { FormattedMessage as ReactFormattedMessage } from "react-intl"
import { ITranslations } from "../../../interfaces/ITranslations"

type FormattedMessageProps = {
  id: ITranslations["keys"]
  values?: Record<string, () => React.ReactNode> | Record<string, any>
  children?: () => React.ReactElement
  className?: string
}

export function FormattedMessage(props: FormattedMessageProps) {
  return <ReactFormattedMessage {...props}></ReactFormattedMessage>
}
