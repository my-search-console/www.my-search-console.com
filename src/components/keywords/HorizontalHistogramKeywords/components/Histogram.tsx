import { PlusIcon } from "@heroicons/react/20/solid"
import React from "react"
import {
  RankingOrderByType,
  RankingStatEntity,
} from "../../../../entities/RankingWebsiteEntity"
import { FormattedMessage } from "../../../general/FormattedMessage/FormattedMessage"
import { Loader } from "../../../general/Loader/Loader"
import { ButtonSecondary } from "../../../ui/Button/Button"
import { KeywordItem } from "./KeywordItem/KeywordItem"
import { KeywordsStickyBar } from "./KeywordsStickyBar/KeywordsStickyBar"

function addRelativePercentage(
  data: RankingStatEntity[]
): Array<RankingStatEntity & { percentage: number }> {
  const min = Math.min(...data.map((item) => item.position))

  const relative = data.map((item) => {
    return {
      ...item,
      percentage: 100 - item.position + min,
    }
  })

  return relative
}

export const Histogram: React.FC<{
  type: "device" | "query" | "country" | "source"
  data: Array<RankingStatEntity>
  label: string
  color: "orange" | "blue" | "pink" | "green"
  isFetching: boolean
  view: RankingOrderByType
  onCreateKeyword: () => void
}> = (props) => {
  return (
    <div className="relative min-h-[200px] w-full rounded-lg border border-slate-100 bg-white p-4 font-display">
      {props.isFetching && <Loader></Loader>}
      <div className="relative flex items-center justify-between">
        <div className="font-display font-medium">
          <FormattedMessage id={`analytics/histogram/${props.type}`} />
        </div>
        <div className="flex items-center">
          <ButtonSecondary size="sm" onClick={props.onCreateKeyword}>
            <PlusIcon className="h-4 w-4" />
            <span className="ml-1 hidden sm:inline">
              <FormattedMessage id={"keywords/add-keyword-button"} />
            </span>
          </ButtonSecondary>
        </div>
      </div>
      <div className="my-2 flex justify-between text-sm font-medium text-slate-500">
        <p>
          <FormattedMessage id={`analytics/histogram/legend/${props.type}`} />
        </p>
        <p>
          <FormattedMessage id={`analytics/histogram/filter/${props.view}`} />
        </p>
      </div>
      <KeywordsStickyBar />
      <ul>
        {addRelativePercentage(props.data).map((item, index) => (
          <KeywordItem
            stats={item}
            key={item.query}
            barWidth={item.percentage}
            color={index % 2 ? "gray" : "pink"}
          />
        ))}
      </ul>
    </div>
  )
}
