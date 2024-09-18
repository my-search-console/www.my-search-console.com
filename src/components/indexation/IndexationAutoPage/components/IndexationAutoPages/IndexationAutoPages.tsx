import { CheckCircleIcon, ClockIcon } from "@heroicons/react/20/solid"
import React, { ReactNode } from "react"

import {
  IndexationQueueEntity,
  IndexationQueueStatus,
} from "@foudroyer/interfaces"
import { ItemLoading } from "./components/ItemLoading"
import {
  connector,
  ContainerProps,
} from "./containers/IndexationAutoPages.containers"

import classNames from "classnames"

import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { Tooltip } from "../../../../UI/Tooltip"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

const formatUrl = (url: string) => {
  try {
    const formatted = decodeURIComponent(
      url.replace(/https?:\/\/[a-z0-9\-_.]+/, "")
    )
    if (formatted === "") return "/"
    return formatted
  } catch (e) {
    console.log(url)
    return url
  }
}

export const ItemContainer: React.FC<{
  index: number
  children: ReactNode
}> = ({ children, index }) => (
  <div className="rounded-md border border-slate-100 bg-white">
    <div
      className={`group relative block h-14 transition-colors duration-300 ease-in-out ${
        index % 2 !== 0 ? "" : ""
      }`}
    >
      {children}
    </div>
  </div>
)

export const ItemPrimary: React.FC<{
  isInfoOpen?: boolean
  children: ReactNode
}> = (props) => (
  <div
    className={`flex h-full transform items-center overflow-hidden px-2 transition-all duration-300 ease-in-out ${
      !props.isInfoOpen && ""
    }`}
  >
    {props.children}
  </div>
)

export const ItemSecondary: React.FC<{
  isInfoOpen: boolean
  children: ReactNode
}> = (props) => (
  <div
    className={`absolute left-0 right-0 top-0 flex h-full w-full translate-y-full transform items-center space-x-2 rounded-md bg-white px-2 transition-all duration-300 ease-in-out ${
      !props.isInfoOpen && "group-hover:translate-y-0"
    }`}
  >
    {props.children}
  </div>
)

export const ItemInfosContainer: React.FC<{ children: ReactNode }> = (
  props
) => (
  <div className="rounded-b-md border-t border-slate-100 bg-white px-4 py-5 sm:p-0">
    <dl className="sm:divide-y sm:divide-slate-100">{props.children}</dl>
  </div>
)

const Item: React.FC<{
  page: IndexationQueueEntity
  index: number
}> = (props) => {
  return (
    <div>
      <ItemContainer index={props.index}>
        <ItemPrimary>
          <div className="flex min-w-0 flex-1 items-center">
            <Tooltip
              direction="right"
              label={
                props.page.status === IndexationQueueStatus.done ? (
                  <FormattedMessage id="indexation/auto/queue/status/done" />
                ) : (
                  <FormattedMessage id="indexation/auto/queue/status/queue" />
                )
              }
            >
              <div className={classNames("flex items-center p-1 ")}>
                {props.page.status === IndexationQueueStatus.done && (
                  <CheckCircleIcon className="h-4 w-4 text-emerald-400" />
                )}

                {props.page.status === IndexationQueueStatus.queue && (
                  <ClockIcon className="h-4 w-4 text-blue-400" />
                )}
              </div>
            </Tooltip>
            <a
              target="_blank"
              href={props.page.page}
              className="block truncate pl-1 font-medium text-slate-900 hover:underline"
            >
              {formatUrl(props.page.page)}
            </a>
          </div>
          <div className="flex items-center pr-2 font-display text-sm">
            <Tooltip
              label={
                <FormattedMessage
                  id={`indexation/auto/pages/date/tooltip/${
                    props.page.indexed_at ? "submitted" : "added"
                  }`}
                  values={{
                    d: dayjs(
                      props.page.indexed_at || props.page.created_at
                    ).format("DD MMMM YYYY HH:mm"),
                  }}
                />
              }
              direction={"left"}
            >
              {dayjs(props.page.indexed_at || props.page.created_at).fromNow()}
            </Tooltip>
          </div>
        </ItemPrimary>
      </ItemContainer>
    </div>
  )
}

type Props = {
  pages: IndexationQueueEntity[]
  isLoading: boolean
}

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <div className="mt-2">
      <ul className="space-y-2">
        {!props.isLoading &&
          props.pages.length > 0 &&
          props.pages.map((page, index) => (
            <Item key={page.page} page={page} index={index} />
          ))}

        {props.isLoading &&
          Array.from({ length: 10 }).map((value, index) => (
            <ItemLoading key={index} delay={index * 100} />
          ))}
      </ul>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const IndexationAutoPages = connector(Container)
