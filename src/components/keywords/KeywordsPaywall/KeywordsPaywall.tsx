import { PaymentPlansEntity } from "@foudroyer/interfaces"
import React from "react"
import { FilterBar } from "../../analytics/FilterBar/FilterBar"
import { HorizontalHistogramKeywords } from "../HorizontalHistogramKeywords/HorizontalHistogramKeywords"
import {
  connector,
  ContainerProps,
} from "./containers/KeywordsPaywall.containers"

type Props = {
  signedUpAt: Date | undefined
  plans: Set<PaymentPlansEntity>
}

export const Wrapper: React.FC<Props> = (props) => {
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
