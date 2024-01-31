import { OpportunityEntity } from "@my-search-console/interfaces"
import React from "react"
import { FormattedMessage } from "../../../general/FormattedMessage/FormattedMessage"
import { Loader } from "../../../general/Loader/Loader"
import { OpportunityItem } from "./OpportunityItem/OpportunityItem"

export const Histogram: React.FC<{
  type: "device" | "query" | "country" | "source"
  data: Array<OpportunityEntity>
  label: string
  isFetching: boolean
}> = (props) => {
  return (
    <div className="relative min-h-[200px] w-full rounded-lg border border-slate-100 bg-white p-4 font-display">
      {props.isFetching && <Loader></Loader>}
      <div className="relative flex items-center justify-between">
        <div className="font-display font-medium">
          <FormattedMessage id={`opportunities/histogram/${props.type}`} />
        </div>
      </div>
      <div className="my-2 flex justify-between text-sm font-medium text-slate-500">
        <p>
          <FormattedMessage
            id={`opportunities/histogram/legend/${props.type}`}
          />
        </p>
        <p>
          <FormattedMessage id={`opportunities/histogram/filter`} />
        </p>
      </div>
      <ul>
        {props.data.map((item) => (
          <OpportunityItem data={item} key={item.query} />
        ))}
      </ul>
    </div>
  )
}
