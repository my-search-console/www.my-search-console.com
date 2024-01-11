import React from "react"
import {
  ContainerProps,
  connector,
} from "./containers/HorizontalHistogram.container"
import { RankingStatEntity } from "../../../entities/RankingWebsiteEntity"
import { Histogram } from "./components/Histogram"

const Wrapper: React.FC<{
  stats: RankingStatEntity[]
  isFetching: boolean
  onCreateKeyword: () => void
  showTrash: boolean
  onDelete: () => void
}> = (props) => {
  return (
    <div className="mt-4  w-full grid-cols-1 gap-4 md:grid-cols-2">
      <Histogram
        type="query"
        data={props.stats}
        label="query"
        color="pink"
        view="position"
        onCreateKeyword={props.onCreateKeyword}
        isFetching={props.isFetching}
      />
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const HorizontalHistogramKeywords = connector(Container)
