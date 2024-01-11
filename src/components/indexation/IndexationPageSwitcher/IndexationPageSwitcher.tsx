import React from "react"
import {
  ContainerProps,
  connector,
} from "./containers/IndexationPageSwitcher.containers"
import { IndexationAutoPage } from "../IndexationAutoPage/IndexationAutoPage"
import { IndexationManualPage } from "../IndexationManualPage/IndexationManualPage"

import { IndexationReportPage } from "../IndexationReportPage/IndexationReportPage"

type Props = {
  view: "indexation" | "auto" | "report"
}

export const Wrapper: React.FC<Props> = (props) => {
  if (props.view === "auto") return <IndexationAutoPage />
  if (props.view === "report") return <IndexationReportPage />
  return <IndexationManualPage />
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const IndexationPageSwitcher = connector(Container)
