import React from "react"
import {
  connector,
  ContainerProps,
} from "./containers/IndexationStatsBar.containers"

import { IndexationType, PageEntity } from "@foudroyer/interfaces"
import classNames from "classnames"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { Tooltip } from "../../ui/Tooltip"
import { ItemLoading } from "../IndexedTable/components/ItemLoading"

type Props = {
  filterIndexationState: PageEntity["indexation_state"] | null
  onToggleFilter: (filter: PageEntity["indexation_state"] | null) => void
  isFetching: boolean
  stats: {
    total: number
    [IndexationType.INDEXED]: number
    [IndexationType.NOT_INDEXED]: number
    [IndexationType.INDEXING]: number
  }
}

const Bar: React.FC<{
  isVisible: boolean
  type: IndexationType
  total: number
  value: number
  tooltipPosition?: "center" | "right"
  onClick: () => void
}> = (props) => {
  if (props.value === 0 || !props.value) return <></>

  return (
    <div
      style={{
        width: `${(props.value / props.total) * 100}%`,
      }}
      onClick={props.onClick}
      className={classNames(
        "shadow-btn h-full min-w-[20px] rounded-md border transition-all  duration-300 ease-in-out md:min-w-[40px]",

        props.type === IndexationType.INDEXED &&
          "!border-emerald-500 !bg-emerald-400 !shadow-emerald-500",

        props.type === IndexationType.NOT_INDEXED &&
          "!border-red-500 !bg-red-400 !shadow-red-500",

        props.type === IndexationType.INDEXING &&
          "!border-slate-300 !bg-slate-100 !shadow-slate-300",

        props.type === IndexationType.SUBMITTED &&
          "!border-blue-400 !bg-blue-300 !shadow-blue-400",

        props.type === IndexationType["checking-indexation-state"] &&
          "!border-sky-400 !bg-sky-300 !shadow-sky-400",

        props.type === IndexationType["first-check-done-but-not-indexed"] &&
          "!border-indigo-400 !bg-indigo-300 !shadow-indigo-400",

        "border-orange-300 bg-orange-100 shadow-orange-300",

        !props.isVisible && "opacity-20 hover:opacity-100"
      )}
    >
      <Tooltip
        direction={"bottom"}
        align={props.tooltipPosition || "center"}
        // @ts-ignore
        label={
          <div>
            {/* @ts-ignore */}
            <FormattedMessage id={`indexation/state/${props.type}`} />
            <span className="ml-1">({props.value})</span>
          </div>
        }
        className="w-full"
        fluid
      >
        <div className="h-10 w-full cursor-pointer"></div>
      </Tooltip>
    </div>
  )
}

const getAllErrorsWithoutMainStats = (stats: {
  total: number
  [IndexationType.INDEXED]: number
  [IndexationType.NOT_INDEXED]: number
  [IndexationType.INDEXING]: number
}) => {
  const allErrorsStats: Array<string> = Object.keys(stats).filter(
    (key) =>
      ![
        IndexationType.INDEXED,
        IndexationType.NOT_INDEXED,
        IndexationType.INDEXING,
        IndexationType.SUBMITTED,
        IndexationType["first-check-done-but-not-indexed"],
        IndexationType["checking-indexation-state"],
        "total",
      ].includes(key as IndexationType)
  )

  return allErrorsStats
}

export const Wrapper: React.FC<Props> = (props) => {
  const allErrorsStats = getAllErrorsWithoutMainStats(props.stats)

  if (props.stats.total === 0)
    return <ItemLoading delay={0} className="!h-10" />

  return (
    <div className="relative z-10">
      <div className="flex h-10 w-full items-center space-x-1 rounded-md">
        <Bar
          value={props.stats[IndexationType.INDEXED]}
          total={props.stats.total}
          isVisible={
            !Boolean(
              props.filterIndexationState &&
                props.filterIndexationState !== IndexationType.INDEXED
            )
          }
          type={IndexationType.INDEXED}
          onClick={() => props.onToggleFilter(IndexationType.INDEXED)}
        />

        <Bar
          value={props.stats[IndexationType.NOT_INDEXED]}
          total={props.stats.total}
          isVisible={
            !Boolean(
              props.filterIndexationState &&
                props.filterIndexationState !== IndexationType.NOT_INDEXED
            )
          }
          type={IndexationType.NOT_INDEXED}
          onClick={() => props.onToggleFilter(IndexationType.NOT_INDEXED)}
        />

        <Bar
          value={props.stats[IndexationType.SUBMITTED]}
          total={props.stats.total}
          tooltipPosition="right"
          isVisible={
            !Boolean(
              props.filterIndexationState &&
                props.filterIndexationState !== IndexationType.SUBMITTED
            )
          }
          type={IndexationType.SUBMITTED}
          onClick={() => props.onToggleFilter(IndexationType.SUBMITTED)}
        />

        <Bar
          value={props.stats[IndexationType["checking-indexation-state"]]}
          total={props.stats.total}
          tooltipPosition="right"
          isVisible={
            !Boolean(
              props.filterIndexationState &&
                props.filterIndexationState !==
                  IndexationType["checking-indexation-state"]
            )
          }
          type={IndexationType["checking-indexation-state"]}
          onClick={() =>
            props.onToggleFilter(IndexationType["checking-indexation-state"])
          }
        />

        <Bar
          value={
            props.stats[IndexationType["first-check-done-but-not-indexed"]]
          }
          total={props.stats.total}
          tooltipPosition="right"
          isVisible={
            !Boolean(
              props.filterIndexationState &&
                props.filterIndexationState !==
                  IndexationType["first-check-done-but-not-indexed"]
            )
          }
          type={IndexationType["first-check-done-but-not-indexed"]}
          onClick={() =>
            props.onToggleFilter(
              IndexationType["first-check-done-but-not-indexed"]
            )
          }
        />

        <Bar
          value={props.stats[IndexationType.INDEXING]}
          total={props.stats.total}
          tooltipPosition="right"
          isVisible={
            !Boolean(
              props.filterIndexationState &&
                props.filterIndexationState !== IndexationType.INDEXING
            )
          }
          type={IndexationType.INDEXING}
          onClick={() => props.onToggleFilter(IndexationType.INDEXING)}
        />

        {allErrorsStats.map((key, index) => {
          if (props.stats[key] === 0) return <></>

          return (
            <Bar
              key={key}
              value={props.stats[key]}
              total={props.stats.total}
              tooltipPosition={
                index === allErrorsStats.length - 1 ? "right" : "center"
              }
              isVisible={
                !Boolean(
                  props.filterIndexationState &&
                    props.filterIndexationState !== IndexationType[key]
                )
              }
              type={IndexationType[key]}
              onClick={() => props.onToggleFilter(IndexationType[key])}
            />
          )
        })}
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const IndexationStatsBar = connector(Container)
