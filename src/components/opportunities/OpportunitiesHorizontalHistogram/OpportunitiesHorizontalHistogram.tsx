import { OpportunityEntity } from "@foudroyer/interfaces"
import React from "react"
import { Histogram } from "./components/Histogram"
import {
  connector,
  ContainerProps,
} from "./containers/OpportunitiesHorizontalHistogram"

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
