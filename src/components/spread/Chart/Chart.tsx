import { useLocation } from "@reach/router"
import "chartjs-adapter-date-fns"
import React, { useEffect, useRef } from "react"
import {
  RankingOrderByType,
  RankingStatsForFrontend,
} from "../../../entities/RankingWebsiteEntity"
import { RenderChart } from "./components/RenderChart/RenderChart"
import { connector, ContainerProps } from "./containers/Chart.container"

type Props = {
  onMount: () => void
  stats: RankingStatsForFrontend
  isFetching: boolean
  orderBy: RankingOrderByType
  onFilter: (date: string) => void
  onShow: () => void
  isRealUserData: boolean
  onDownload: () => void
  type: RankingOrderByType
}

const Wrapper: React.FC<Props> = (props) => {
  useEffect(() => {
    props.onMount()
  }, [])

  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const search = new URL(location.href || "https://www.foudroyer.com")
  const type = search.searchParams.get("orderBy") || "clicks"

  return (
    <div>
      <div ref={ref} id="render-chart">
        <div className="relative w-full rounded-lg border border-slate-100 bg-white p-4 ">
          <RenderChart
            date={props.stats.date}
            type={type as RankingOrderByType}
            aspect="aspect-[16/6]"
            isFetching={props.isFetching}
            onFilter={() => null}
          />
        </div>
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const Chart = connector(Container)
