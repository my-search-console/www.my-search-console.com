import React from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { ButtonPrimary } from "../../../../ui/Button/Button"
import {
  connector,
  ContainerProps,
} from "./containers/IndexationReportHelp.containers"

type Props = {
  onClickSubscribe: () => void
}

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <div className="rounded-md  bg-pink-50  p-4">
      <div className="font-display text-sm text-pink-500">
        <FormattedMessage id="indexation/reports/non-premium/title" />
      </div>
      <p className="text-sm text-pink-400">
        <FormattedMessage id="indexation/reports/non-premium/description" />
      </p>
      <div className="mt-2">
        <ButtonPrimary size="sm" onClick={props.onClickSubscribe}>
          <FormattedMessage id={"marketing/pricing/premium/cta"} />
        </ButtonPrimary>
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const IndexationReportNonPremium = connector(Container)
