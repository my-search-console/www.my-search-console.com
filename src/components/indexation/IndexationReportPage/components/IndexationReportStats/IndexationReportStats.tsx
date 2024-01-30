import classNames from "classnames"
import React, { ReactNode } from "react"

import {
  ContainerProps,
  connector,
} from "./containers/IndexationReportStats.containers"
import { Loader } from "../../../../general/Loader/Loader"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"

type Props = {
  isFetching: boolean
  isIndexed: boolean | null
  onFilter: (status: boolean | null) => void
  stats: {
    total: number
    indexed: number
    notIndexed: number
  }
}

const Item: React.FC<{
  title: ReactNode
  value: number
  className?: string
  percentage: number | null
  selected: boolean
  isFetching: boolean
  type?: "indexed" | "notIndexed" | "total"
  onClick: () => void
}> = (props) => (
  <div
    className={classNames(
      "relative cursor-pointer overflow-hidden rounded-lg border border-slate-100 font-display transition-all duration-300 ease-in-out hover:border-transparent hover:ring-2",
      props.className
    )}
  >
    {props.isFetching && <Loader />}

    <div onClick={props.onClick} className="h-full w-full p-4">
      <dt className="flex items-center justify-between text-sm font-medium leading-tight text-slate-900">
        {props.title}

        <input
          type="radio"
          checked={props.selected}
          onChange={() => {}}
          className="ml-auto h-4 w-4 border-slate-200 text-blue-400 focus:ring-blue-400"
        />
      </dt>
      <dd className="mt-1 flex items-center justify-between">
        <div
          className={classNames(
            "flex flex-wrap items-center text-2xl font-semibold ",
            props.type === "indexed" && "text-emerald-400",
            props.type === "notIndexed" && "text-red-400",
            props.type === "total" && "text-slate-400"
          )}
        >
          {props.value}
        </div>

        <div className="inline-flex translate-x-2 translate-y-2 transform items-center rounded py-0.5 text-sm font-medium text-slate-500 sm:mt-0 sm:translate-x-0 sm:translate-y-0">
          {props.percentage === null
            ? ""
            : Math.round(props.percentage * 100) + "%"}
        </div>
      </dd>
    </div>
  </div>
)

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
      <Item
        className="md:col-span-1"
        value={props.stats.indexed}
        percentage={props.stats.indexed / props.stats.total || 0}
        isFetching={props.isFetching}
        title={<FormattedMessage id="indexation/reports/stats/indexed/title" />}
        type={"indexed"}
        selected={props.isIndexed === true}
        onClick={() => props.onFilter(true)}
      />

      <Item
        className="md:col-span-1"
        value={props.stats.notIndexed}
        isFetching={props.isFetching}
        percentage={props.stats.notIndexed / props.stats.total || 0}
        title={
          <FormattedMessage id="indexation/reports/stats/not-indexed/title" />
        }
        selected={props.isIndexed === false}
        type={"notIndexed"}
        onClick={() => props.onFilter(false)}
      />

      <Item
        className="md:col-span-1"
        value={props.stats.total}
        isFetching={props.isFetching}
        selected={props.isIndexed === null}
        title={<FormattedMessage id="indexation/reports/stats/total/title" />}
        percentage={1}
        type={"total"}
        onClick={() => props.onFilter(null)}
      />
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const IndexationReportStats = connector(Container)
