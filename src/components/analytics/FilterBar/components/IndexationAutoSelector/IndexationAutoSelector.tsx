import React from "react"
import { ButtonSecondary } from "../../../../uiii/Button/Button"
import {
  connector,
  ContainerProps,
} from "./containers/IndexationAutoSelector.container"

import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"

type Props = {
  onChange: (view: "auto" | "indexation" | "report") => void
  view: "auto" | "indexation" | "report"
}

export const Wrapper: React.FC<Props> = (props) => (
  <div className="flex items-center space-x-2">
    <ButtonSecondary
      active={props.view === "indexation"}
      size="sm"
      onClick={() => props.onChange("indexation")}
    >
      <FormattedMessage id="indexation/auto/switcher/manual" />
    </ButtonSecondary>

    <ButtonSecondary
      active={props.view === "auto"}
      size="sm"
      onClick={() => props.onChange("auto")}
    >
      <FormattedMessage id="indexation/auto/switcher/auto" />
    </ButtonSecondary>

    <ButtonSecondary
      active={props.view === "report"}
      size="sm"
      onClick={() => props.onChange("report")}
    >
      <FormattedMessage id="indexation/auto/switcher/report" />
    </ButtonSecondary>
  </div>
)

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const IndexationAutoSelector = connector(Container)
