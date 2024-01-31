import React from "react"
import {
  ContainerProps,
  connector,
} from "./containers/OpportunitiesHorizontalHistogram"
import { Histogram } from "./components/Histogram"
import { OpportunityEntity } from "@my-search-console/interfaces"

const Wrapper: React.FC<{
  opportunities: OpportunityEntity[]
  isFetching: boolean
}> = (props) => {
  return (
    <div className="mt-4  w-full grid-cols-1 gap-4 md:grid-cols-2">
      <Histogram
        type="query"
        data={props.opportunities}
        label="query"
        isFetching={props.isFetching}
      />
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const OpportunitiesHorizontalHistogram = connector(Container)
