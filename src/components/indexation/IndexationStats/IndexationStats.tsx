import classNames from "classnames"
import React, { ReactNode } from "react"
import { IndexationType, PageEntity } from "@foudroyer/interfaces"
import {
  ContainerProps,
  connector,
} from "./containers/IndexationStats.containers"
import { Loader } from "../../general/Loader/Loader"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"

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

const Item: React.FC<{
  title: ReactNode
  value: number
  className?: string
  percentage: number | null
  selected: boolean
  isFetching: boolean
  type?: PageEntity["indexation_state"]
  onClick: () => void
}> = (props) => (
  <div
    className={classNames(
      "ring-pink relative cursor-pointer overflow-hidden rounded-lg border border-slate-100 font-display transition-all duration-300 ease-in-out hover:border-transparent hover:ring-2",
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
            props.type === IndexationType.INDEXED && "text-emerald-400",
            props.type === IndexationType.NOT_INDEXED && "text-red-400",
            props.type === IndexationType.INDEXING && "text-blue-400",
            !props.type && "text-slate-400"
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
        value={props.stats[IndexationType.INDEXED]}
        percentage={
          props.stats[IndexationType.INDEXED] / props.stats.total || 0
        }
        isFetching={props.isFetching}
        title={<FormattedMessage id="indexation/stats/indexed/title" />}
        type={IndexationType.INDEXED}
        selected={props.filterIndexationState === IndexationType.INDEXED}
        onClick={() => props.onToggleFilter(IndexationType.INDEXED)}
      />

      <Item
        className="md:col-span-1"
        value={props.stats[IndexationType.NOT_INDEXED]}
        isFetching={props.isFetching}
        selected={props.filterIndexationState === IndexationType.NOT_INDEXED}
        percentage={
          props.stats[IndexationType.NOT_INDEXED] / props.stats.total || 0
        }
        title={<FormattedMessage id="indexation/stats/not-indexed/title" />}
        type={IndexationType.NOT_INDEXED}
        onClick={() => props.onToggleFilter(IndexationType.NOT_INDEXED)}
      />

      <Item
        className="md:col-span-1"
        value={props.stats.total}
        isFetching={props.isFetching}
        selected={props.filterIndexationState === null}
        title={<FormattedMessage id="indexation/stats/total/title" />}
        percentage={1}
        onClick={() => props.onToggleFilter(null)}
      />
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const IndexationStats = connector(Container)
