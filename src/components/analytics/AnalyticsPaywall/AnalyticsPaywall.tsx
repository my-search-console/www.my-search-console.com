import React from "react"
import { FilterBar } from "../FilterBar/FilterBar"
import { GeneralChart } from "../GeneralChart/GeneralChart"
import { GlobalStats } from "../GlobalStats/GlobalStats"
import { HorizontalHistogram } from "../HorizontalHistogram/HorizontalHistogram"
import {
  connector,
  ContainerProps,
} from "./containers/AnalyticsPaywall.containers"

export const Wrapper: React.FC<ContainerProps> = (props) => {
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
