import { PaymentPlansEntity } from "@my-search-console/interfaces"
import React from "react"
import { FilterBar } from "../../analytics/FilterBar/FilterBar"
import { Pricing } from "../../marketing/Pricing/Pricing"
import { HorizontalHistogramKeywords } from "../HorizontalHistogramKeywords/HorizontalHistogramKeywords"
import {
  ContainerProps,
  connector,
} from "./containers/KeywordsPaywall.containers"

type Props = {
  signedUpAt: Date | undefined
  plans: Set<PaymentPlansEntity>
}

export const Wrapper: React.FC<Props> = (props) => {
  const isMoreThanThreeDays = props.signedUpAt
    ? new Date().getTime() - props.signedUpAt.getTime() > 259200000
    : false
  if (isMoreThanThreeDays && props.plans.size === 0) return <Pricing />
  return (
    <div className="my-4">
      <FilterBar />
      <div className="relative">
        <div className="mt-4" />
        <HorizontalHistogramKeywords />
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const KeywordsPaywall = connector(Container)
