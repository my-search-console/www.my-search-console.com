import React from "react"
import {
  RankingOrderByType,
  RankingStatEntity,
  RankingStatsForFrontend,
} from "../../../entities/RankingWebsiteEntity"
import { Histogram } from "./components/Histogram"
import {
  connector,
  ContainerProps,
} from "./containers/HorizontalHistogram.container"

const Wrapper: React.FC<{
  stats: RankingStatsForFrontend
  isFetching: boolean
  hideActions?: boolean
  onFilter: (params: {
    type: "query" | "country" | "device" | "source" | "date" | "page"
    value: string
  }) => void
  onChangeView: (view: RankingOrderByType) => void
  onShowMore: (params: {
    type: "device" | "query" | "country" | "source" | "page"
  }) => void
  view: RankingOrderByType
}> = (props) => {
  return (
    <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      <Histogram
        type="query"
        data={props.stats.query as RankingStatEntity[]}
        label="query"
        color="pink"
        isFetching={props.isFetching}
        view={props.view}
        onClick={(value) => props.onFilter({ type: "query", value })}
        onShowMore={() => props.onShowMore({ type: "query" })}
        onChangeView={props.onChangeView}
        hideActions={props.hideActions}
        highlights={props.stats.query_trending_down as RankingStatEntity[]}
      />

      <Histogram
        type="country"
        data={props.stats.countries as RankingStatEntity[]}
        label="country"
        color="blue"
        view={props.view}
        isFetching={props.isFetching}
        onClick={(value) => props.onFilter({ type: "country", value })}
        onShowMore={() => props.onShowMore({ type: "country" })}
        onChangeView={props.onChangeView}
        hideActions={props.hideActions}
        highlights={props.stats.countries_trending_down as RankingStatEntity[]}
      />
      <Histogram
        type="source"
        data={props.stats.sources as RankingStatEntity[]}
        label="source"
        color="orange"
        isFetching={props.isFetching}
        view={props.view}
        onClick={(value) => props.onFilter({ type: "source", value })}
        onShowMore={() => props.onShowMore({ type: "source" })}
        onChangeView={props.onChangeView}
        hideActions={props.hideActions}
        highlights={props.stats.sources_trending_down as RankingStatEntity[]}
      />
      <Histogram
        type="device"
        label="device"
        color="green"
        isFetching={props.isFetching}
        view={props.view}
        onClick={(value) => props.onFilter({ type: "device", value })}
        onShowMore={() => props.onShowMore({ type: "device" })}
        onChangeView={props.onChangeView}
        data={props.stats.devices as RankingStatEntity[]}
        hideActions={props.hideActions}
        highlights={props.stats.devices_trending_down as RankingStatEntity[]}
      />
      <Histogram
        type="page"
        label="page"
        color="slate"
        isFetching={props.isFetching}
        view={props.view}
        onClick={(value) => props.onFilter({ type: "page", value })}
        onShowMore={() => props.onShowMore({ type: "page" })}
        onChangeView={props.onChangeView}
        data={props.stats.pages as RankingStatEntity[]}
        hideActions={props.hideActions}
        highlights={props.stats.pages_trending_down as RankingStatEntity[]}
        fluid
      />
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const HorizontalHistogram = connector(Container)
