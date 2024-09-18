import { LogsEntity } from "@foudroyer/interfaces"
import { Menu, Transition } from "@headlessui/react"
import {
  ArrowPathIcon,
  ArrowRightIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid"
import classNames from "classnames"
import dayjs from "dayjs"
import React, { ReactNode } from "react"
import { FormattedMessage } from "react-intl"
import { formatUrl } from "../../../utils/formatUrl"
import { Loader } from "../../general/Loader/Loader"
import { connector, ContainerProps } from "./containers/LogItem.container"

const Item: React.FC<{
  color: "pink" | "amber" | "sky" | "purple"
  children: ReactNode
}> = (props) => {
  return (
    <span
      className={`px-1 font-display border rounded-md ${
        props.color === "pink" && "border-pink-100 bg-pink-50 text-pink-500"
      } ${
        props.color === "amber" && "border-amber-100 bg-amber-50 text-amber-500"
      } ${props.color === "sky" && "border-sky-100 bg-sky-50 text-sky-500"} ${
        props.color === "purple" &&
        "border-purple-100 bg-purple-50 text-purple-500"
      }`}
    >
      {props.children}
    </span>
  )
}

const Dropdown: React.FC<{
  onDelete: () => void
  onSync: () => void
  onUpdate: () => void
}> = (props) => (
  <Menu as="div" className="">
    <Menu.Button
      onClick={(e) => e.stopPropagation()}
      className="-mr-1 -mt-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition duration-300 ease-in-out hover:bg-pink-100 hover:text-pink-500"
    >
      <EllipsisHorizontalIcon className="h-5 w-5" />
    </Menu.Button>

    <Transition
      as={React.Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white font-display font-medium shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <button
              className={classNames(
                active ? "bg-pink-100 text-pink-500" : "",
                "flex items-center w-full px-4 py-2 text-left text-sm transition-all duration-300 ease-in-out"
              )}
              onClick={(e) => {
                e.stopPropagation()
                props.onUpdate()
              }}
            >
              <PencilIcon className="w-4 h-4 mr-1" />
              <FormattedMessage id="logs/dropdown/update" />
            </button>
          )}
        </Menu.Item>

        <Menu.Item>
          {({ active }) => (
            <button
              className={classNames(
                active ? "bg-pink-100 text-pink-500" : "",
                "flex items-center w-full px-4 py-2 text-left text-sm transition-all duration-300 ease-in-out"
              )}
              onClick={(e) => {
                e.stopPropagation()
                props.onSync()
              }}
            >
              <ArrowPathIcon className="w-4 h-4 mr-1" />
              <FormattedMessage id="logs/dropdown/sync" />
            </button>
          )}
        </Menu.Item>

        <Menu.Item>
          {({ active }) => (
            <button
              className={classNames(
                active ? "bg-pink-100 text-pink-500" : "",
                "flex items-center w-full px-4 py-2 text-left text-sm transition-all duration-300 ease-in-out"
              )}
              onClick={(e) => {
                e.stopPropagation()
                props.onDelete()
              }}
            >
              <TrashIcon className="w-4 h-4 mr-1" />
              <FormattedMessage id="logs/dropdown/delete" />
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Transition>
  </Menu>
)

const calculateDifference = (log: LogsEntity) => {
  if (log.clicks === null || log.previous_clicks === null) return "equals"
  if (log.clicks >= log.previous_clicks) return "up"
  return "down"
}

const Wrapper: React.FC<ContainerProps> = (props) => {
  return (
    <li key={props.log.id} className="group relative rounded-md pt-4 ">
      {props.isFetching && <Loader />}

      <div className="relative">
        {!props.isLast && (
          <span
            className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-100"
            aria-hidden="true"
          />
        )}

        <div className="relative flex items-start space-x-3">
          <>
            <div className="relative">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 ring-8 ring-white">
                {calculateDifference(props.log) === "down" && (
                  <ArrowTrendingDownIcon className="h-5 w-5 text-red-500" />
                )}

                {calculateDifference(props.log) === "up" && (
                  <ArrowTrendingUpIcon className="h-5 w-5 text-emerald-500" />
                )}

                {calculateDifference(props.log) === "equals" && (
                  <ArrowRightIcon className="h-5 w-5 text-slate-500" />
                )}
              </div>
            </div>

            <div className="pb-4 w-full">
              <div className="flex">
                <div className="flex flex-wrap w-full gap-x-2 items-center mb-2">
                  <div
                    className="hover:underline font-display cursor-pointer"
                    onClick={() => props.onSelect(props.log)}
                  >
                    <div className="font-medium  text-slate-900">
                      {props.log.title}
                    </div>
                  </div>

                  <span className="text-slate-400 hidden md:block">•</span>

                  <p className="font-display text-slate-400">
                    {dayjs(props.log.log_date).format("DD MMMM YYYY")}
                  </p>
                </div>

                <div>
                  <Dropdown
                    onUpdate={() => props.onSelect(props.log)}
                    onDelete={() => props.onDelete(props.log.id)}
                    onSync={() => props.onSync(props.log.id)}
                  />
                </div>
              </div>

              {props.log.description && (
                <p className="mb-2 text-slate-700 p-2 border-l-2 border-slate-100">
                  {props.log.description}
                </p>
              )}

              <div className="text-slate-700">
                {props.log.type === "query" && (
                  <>
                    <FormattedMessage
                      id="logs/item/query"
                      values={{
                        q: <Item color="sky">{props.log.query}</Item>,
                        e: (value) => <Item color="pink">{value}</Item>,
                        pc: props.log.clicks,
                        c: props.log.previous_clicks,
                        d: (
                          <Item color="sky">
                            {dayjs(props.log.log_date).format("DD MMMM YYYY")}
                          </Item>
                        ),
                      }}
                    />
                  </>
                )}

                {props.log.type === "global" && (
                  <>
                    <FormattedMessage
                      id="logs/item/global"
                      values={{
                        e: (value) => <Item color="pink">{value}</Item>,
                        pc: props.log.clicks,
                        c: props.log.previous_clicks,
                        d: (
                          <Item color="sky">
                            {dayjs(props.log.log_date).format("DD MMMM YYYY")}
                          </Item>
                        ),
                      }}
                    />
                  </>
                )}

                {props.log.type === "page" && (
                  <>
                    <FormattedMessage
                      id="logs/item/page"
                      values={{
                        q: <Item color="sky">{formatUrl(props.log.page)}</Item>,
                        e: (value) => <Item color="pink">{value}</Item>,
                        pc: props.log.clicks,
                        c: props.log.previous_clicks,
                        d: (
                          <Item color="sky">
                            {dayjs(props.log.log_date).format("DD MMMM YYYY")}
                          </Item>
                        ),
                      }}
                    />
                  </>
                )}

                <div />

                <FormattedMessage
                  id="logs/item/impressions"
                  values={{
                    bq: props.log.impressions,
                    q: props.log.previous_impressions,
                    e: (value) => <Item color="purple">{value}</Item>,
                  }}
                />

                <div />

                <FormattedMessage
                  id="logs/item/position"
                  values={{
                    pp: <Item color="amber">{props.log.position}</Item>,
                    p: <Item color="amber">{props.log.previous_position}</Item>,
                  }}
                />
              </div>
            </div>
          </>
        </div>
      </div>
    </li>
  )
}

export const LogItem = connector(Wrapper)
