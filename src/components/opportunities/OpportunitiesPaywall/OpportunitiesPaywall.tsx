import { PaymentPlansEntity } from "@my-search-console/interfaces"
import React, { useEffect } from "react"
import { FilterBar } from "../../analytics/FilterBar/FilterBar"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { HelperBlock } from "../../general/HelperBlock/HelperBlock"
import { Pricing } from "../../marketing/Pricing/Pricing"
import { OpportunitiesHorizontalHistogram } from "../OpportunitiesHorizontalHistogram/OpportunitiesHorizontalHistogram"
import {
  ContainerProps,
  connector,
} from "./containers/OpportunitiesPaywall.containers"

type Props = {
  signedUpAt: Date | undefined
  plans: Set<PaymentPlansEntity>
}

export const Wrapper: React.FC<Props> = (props) => {
  const isMoreThanThreeDays = props.signedUpAt
    ? new Date().getTime() - props.signedUpAt.getTime() > 259200000
    : false
  if (isMoreThanThreeDays && props.plans.size === 0) {
    return <Pricing />
  }
  return (
    <div className="my-4">
      <FilterBar />

      <div className="relative">
        <div className="mt-4" />
        <HelperBlock
          title={<FormattedMessage id="opportunities/help/title" />}
          description={<FormattedMessage id="opportunities/help/description" />}
        />
        <OpportunitiesHorizontalHistogram />
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const OpportunitiesPaywall = connector(Container)
