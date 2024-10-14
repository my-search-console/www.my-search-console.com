import { Menu, Transition } from "@headlessui/react"
import {
  ArrowsPointingOutIcon,
  ArrowTopRightOnSquareIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid"
import { useLocation } from "@reach/router"
import classNames from "classnames"
import React, { Fragment } from "react"
import { useIntl } from "react-intl"
import {
  RankingOrderByType,
  RankingStatEntity,
} from "../../../../entities/RankingWebsiteEntity"
import {
  bigNumberFormatter,
  universalFormatNumber,
} from "../../../../utils/bigNumberFormatter"
import { formatUrl } from "../../../../utils/formatUrl"
import { getFiltersFromUrl } from "../../../../utils/getFiltersFromUrl"
import { setArrowIcon, setEvolutionColor } from "../../../../utils/setEvolution"
import { FormattedMessage } from "../../../general/FormattedMessage/FormattedMessage"
import { Loader } from "../../../general/Loader/Loader"
import { Tooltip } from "../../../ui/Tooltip"
import { MenuFilterItem } from "./MenuFilterItem"

function addRelativePercentage(
  data: RankingStatEntity[],
  type: RankingOrderByType
): Array<RankingStatEntity & { percentage: number }> {
  const { href } = useLocation()
  const filters = getFiltersFromUrl({ url: href })

  const total = data.reduce((accumularor, value) => {
    return accumularor + value[type]
  }, 0)

  const relative = [...data].map((item) => ({
    ...item,
    percentage: (item[filters.orderBy ?? "clicks"] / total) * 100,
  }))

  // set biggest relative percentage to 100% and the others relatively
  let biggestRelativePercentage = 0
  relative.forEach((item) => {
    if (item.percentage > biggestRelativePercentage) {
      biggestRelativePercentage = item.percentage
    }
  })

  relative.forEach((item) => {
    item.percentage = (item.percentage / biggestRelativePercentage) * 100
  })

  return relative
}

export const Histogram: React.FC<{
  type: "device" | "query" | "country" | "source" | "page"
  data: Array<RankingStatEntity>
  hideActions?: boolean
  label: string
  color: "orange" | "blue" | "pink" | "green" | "slate"
  isFetching: boolean
  view: RankingOrderByType
  fluid?: boolean
  onShowMore: () => void
  onChangeView: (view: RankingOrderByType) => void
  onClick: (value: string) => void
}> = (props) => {
  const dataWithRelativePercentage = addRelativePercentage(
    props.data,
    props.view
  )
  const { locale } = useIntl()

  return (
    <div
      className={classNames(
        "relative min-h-[200px] w-full rounded-lg border border-slate-100 bg-white p-4 font-display",
        props.fluid && "col-span-full"
      )}
    >
      {props.isFetching && <Loader></Loader>}
      <div className="flex items-center justify-between">
        <div className="font-display font-medium">
          <FormattedMessage id={`analytics/histogram/${props.type}`} />
        </div>
        <div className="flex items-center">
          {!props.hideActions && (
            <button
              onClick={props.onShowMore}
              className="-mt-1 mr-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition duration-300 ease-in-out hover:bg-pink-100 hover:text-pink-500"
            >
              <ArrowsPointingOutIcon className="h-4 w-4" />
            </button>
          )}
          <Menu as="div" className="relative">
            <Menu.Button className="-mr-1 -mt-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition duration-300 ease-in-out hover:bg-pink-100 hover:text-pink-500">
              <EllipsisHorizontalIcon className="h-5 w-5" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white font-display font-medium shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <MenuFilterItem
                    onChangeView={props.onChangeView}
                    type="clicks"
                  />
                  <MenuFilterItem
                    onChangeView={props.onChangeView}
                    type="position"
                  />
                  <MenuFilterItem
                    onChangeView={props.onChangeView}
                    type="impressions"
                  />
                  <MenuFilterItem
                    onChangeView={props.onChangeView}
                    type="click_through_rate"
                  />
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
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
      <ul>
        {dataWithRelativePercentage.map((item, index) => (
          <li key={index} className="flex items-center justify-between">
            <div className="relative my-0.5 flex flex-grow items-center p-2">
              <div
                className={classNames(
                  "absolute left-0 top-0 block h-full rounded-lg",
                  props.color === "orange" && "bg-orange-50",
                  props.color === "pink" && "bg-pink-100",
                  props.color === "blue" && "bg-blue-50",
                  props.color === "green" && "bg-emerald-50",
                  props.color === "slate" && "bg-slate-50"
                )}
                style={{ width: item.percentage + "%" }}
              ></div>
              <span
                className="font-base relative cursor-pointer font-display text-sm font-medium text-slate-900 hover:underline"
                onClick={() => props.onClick(item[props.label])}
              >
                {props.type === "country" && (
                  // @ts-ignore
                  <FormattedMessage id={`country/${item[props.label]}`} />
                )}

                {props.type === "page" && (
                  <div className="flex items-center">
                    <span>{formatUrl(item[props.label])}</span>
                    <a
                      href={item[props.label]}
                      className="ml-2"
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    </a>
                  </div>
                )}

                {props.type !== "country" &&
                  props.type !== "page" &&
                  item[props.label]}
              </span>
            </div>
            <div className="justify-end">
              <Tooltip
                direction="left"
                align="left"
                label={
                  <p className="flex items-center font-display text-base font-medium">
                    <span className="text-slate-400">
                      {universalFormatNumber({
                        num: item[`previous_` + props.view],
                        locale,
                      })}
                    </span>
                    <span
                      className={classNames(
                        setEvolutionColor({
                          type: props.view,
                          previous: item[`previous_${props.view}`],
                          current: item[props.view],
                        }),
                        "px-[2px]"
                      )}
                    >
                      {setArrowIcon({
                        type: props.view,
                        previous: item[`previous_${props.view}`],
                        current: item[props.view],
                      })}
                    </span>
                    <span>
                      {universalFormatNumber({ num: item[props.view], locale })}
                    </span>
                  </p>
                }
              >
                <p className="flex items-center justify-end pl-4 text-right font-display font-medium leading-5">
                  <span className="text-slate-500">
                    {bigNumberFormatter(item[`previous_` + props.view], 1)}
                  </span>
                  <span
                    className={classNames(
                      setEvolutionColor({
                        type: props.view,
                        previous: item[`previous_${props.view}`],
                        current: item[props.view],
                      }),
                      "px-[2px]"
                    )}
                  >
                    {setArrowIcon({
                      type: props.view,
                      previous: item[`previous_${props.view}`],
                      current: item[props.view],
                    })}
                  </span>
                  <span>{bigNumberFormatter(item[props.view], 1)}</span>
                </p>
              </Tooltip>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
