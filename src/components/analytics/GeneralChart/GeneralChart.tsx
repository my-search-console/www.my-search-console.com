import "chartjs-adapter-date-fns"
import React from "react"
import {
  RankingOrderByType,
  RankingStatsForFrontend,
} from "../../../entities/RankingWebsiteEntity"
import { RenderChart } from "../../general/RenderChart/RenderChart"
import { connector, ContainerProps } from "./containers/GeneralChart.container"

type Props = {
  onMount: () => void
  stats: RankingStatsForFrontend
  isFetching: boolean
  orderBy: RankingOrderByType
  onFilter: (date: string) => void
}

const Wrapper: React.FC<Props> = (props) => {
  return (
    <div className="w-full rounded-lg border border-slate-100 bg-white p-2 sm:p-4">
      <RenderChart
        date={props.stats.date}
        type={props.orderBy}
        isFetching={props.isFetching}
        onFilter={props.onFilter}
      />
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const GeneralChart = connector(Container)
