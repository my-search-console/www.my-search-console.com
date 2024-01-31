import classNames from "classnames"
import React, { ReactNode } from "react"
import {
  IndexationQueueStatus,
  IndexationType,
  PageEntity,
} from "@my-search-console/interfaces"
import {
  ContainerProps,
  connector,
} from "./containers/IndexationAutoStats.containers"
import { Loader } from "../../../../general/Loader/Loader"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"

type Props = {
  isFetching: boolean
  status: IndexationQueueStatus | null
  onToggleFilter: (status: IndexationQueueStatus | null) => void
  stats: {
    total: number
    [IndexationQueueStatus.done]: number
    [IndexationQueueStatus.queue]: number
  }
}

const Item: React.FC<{
  title: ReactNode
  value: number
  className?: string
  percentage: number | null
  selected: boolean
  isFetching: boolean
  type?: IndexationQueueStatus
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
            props.type === IndexationQueueStatus.done && "text-emerald-400",
            props.type === IndexationQueueStatus.queue && "text-blue-400",
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
        value={props.stats[IndexationQueueStatus.done]}
        percentage={
          props.stats[IndexationQueueStatus.done] / props.stats.total || 0
        }
        isFetching={props.isFetching}
        title={<FormattedMessage id="indexation/auto/stats/submitted" />}
        type={IndexationQueueStatus.done}
        selected={props.status === IndexationQueueStatus.done}
        onClick={() => props.onToggleFilter(IndexationQueueStatus.done)}
      />

      <Item
        className="md:col-span-1"
        value={props.stats[IndexationQueueStatus.queue]}
        isFetching={props.isFetching}
        percentage={
          props.stats.total === 0
            ? 1
            : props.stats[IndexationQueueStatus.queue] / props.stats.total || 0
        }
        title={<FormattedMessage id="indexation/auto/stats/queue" />}
        selected={props.status === IndexationQueueStatus.queue}
        type={IndexationQueueStatus.queue}
        onClick={() => props.onToggleFilter(IndexationQueueStatus.queue)}
      />

      <Item
        className="md:col-span-1"
        value={props.stats.total}
        isFetching={props.isFetching}
        selected={props.status === null}
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

export const IndexationAutoStats = connector(Container)
