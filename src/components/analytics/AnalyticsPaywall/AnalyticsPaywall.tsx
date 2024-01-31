import { PaymentPlansEntity } from "@my-search-console/interfaces"
import React from "react"
import { Pricing } from "../../marketing/Pricing/Pricing"
import { AnalyticsComingSoonModal } from "../AnalyticsComingSoonModal/AnalyticsComingSoonModal"
import { AnalyticsToastDataLate } from "../AnalyticsToastDataLate/AnayticsToastDataLate"
import { AnalyticsToastDataSyncing } from "../AnalyticsToastDataSyncing/AnalyticsToastDataSyncing"
import { FilterBar } from "../FilterBar/FilterBar"
import { GeneralChart } from "../GeneralChart/GeneralChart"
import { GlobalStats } from "../GlobalStats/GlobalStats"
import { HorizontalHistogram } from "../HorizontalHistogram/HorizontalHistogram"
import {
  ContainerProps,
  connector,
} from "./containers/AnalyticsPaywall.containers"

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
        <GlobalStats />
        <GeneralChart />
        <HorizontalHistogram />
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const AnalyticsPaywall = connector(Container)
