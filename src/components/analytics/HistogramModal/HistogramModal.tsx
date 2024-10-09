import {
  ArrowDownRightIcon,
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/20/solid"
import classNames from "classnames"
import React, { ReactElement } from "react"
import { useIntl } from "react-intl"
import { RankingStatEntity } from "../../../entities/RankingWebsiteEntity"
import { universalFormatNumber } from "../../../utils/bigNumberFormatter"
import { formatUrl } from "../../../utils/formatUrl"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { Modal } from "../../ui/Modal/Modal"
import {
  connector,
  ContainerProps,
} from "./containers/HistogramModal.containers"

function getEvolutionFromPreviousAndCurrentValues(options: {
  type: string
  previous: number
  current: number
}): string {
  const smaller = options.previous > options.current
  const bigger = options.previous < options.current
  if (options.type === "position") {
    if (smaller) return "up"
    if (bigger) return "down"
  }
  if (bigger) return "up"
  if (smaller) return "down"
  return "equal"
}

function setEvolutionColor(options: {
  type: string
  previous: number
  current: number
}): string {
  switch (getEvolutionFromPreviousAndCurrentValues({ ...options })) {
    case "up":
      return "text-emerald-500"
    case "down":
      return "text-red-500"
    case "equal":
      return "text-slate-500"
    default:
      return "text-slate-500"
  }
}

function setArrowIcon(options: {
  type: string
  previous: number
  current: number
}): ReactElement {
  switch (getEvolutionFromPreviousAndCurrentValues({ ...options })) {
    case "up":
      return <ArrowUpRightIcon className="h-6 w-6" />
    case "down":
      return <ArrowDownRightIcon className="h-6 w-6" />
    case "equal":
      return <ArrowRightIcon className="h-6 w-6" />
    default:
      return <ArrowRightIcon className="h-6 w-6" />
  }
}

const TableHead: React.FC<{
  type: "device" | "query" | "country" | "source" | "page"
}> = (props) => {
  return (
    <div className="sticky -top-4 z-10 w-full min-w-[1000px] bg-white bg-opacity-90 px-2 pb-2 pt-4  sm:-top-8 sm:px-4 sm:pt-8">
      <p className="font-medium">
        <FormattedMessage id={`analytics/histogram/${props.type}`} />
      </p>
      <div className="mt-2 grid grid-cols-5 gap-4 text-sm font-semibold text-slate-500">
        <p>
          <FormattedMessage id={`analytics/histogram/legend/${props.type}`} />
        </p>
        {["clicks", "impressions", "position", "click_through_rate"].map(
          (item, index) => (
            <p key={index} className="text-right">
              {/* @ts-ignore */}
              <FormattedMessage id={`analytics/histogram/filter/${item}`} />
            </p>
          )
        )}
      </div>
    </div>
  )
}

const DisplayEvolution: React.FC<{
  item: RankingStatEntity
  type: "clicks" | "impressions" | "position" | "click_through_rate"
}> = (props) => {
  const { locale } = useIntl()
  const universal = (num: number) => universalFormatNumber({ num, locale })

  return (
    <div className="flex items-center justify-end pl-10 text-right font-display">
      <div className="justify-end">
        <p className="flex items-center justify-end pl-4 text-right font-display font-medium leading-5">
          <span className="text-slate-500">
            {universal(props.item[`previous_${props.type}`])}
          </span>
          <span
            className={classNames(
              setEvolutionColor({
                type: props.type,
                previous: props.item[`previous_${props.type}`],
                current: props.item[props.type],
              }),
              "px-[2px]"
            )}
          >
            {setArrowIcon({
              type: props.type,
              previous: props.item[`previous_${props.type}`],
              current: props.item[props.type],
            })}
          </span>
          <span>{universal(props.item[props.type])}</span>
        </p>
      </div>
    </div>
  )
}

const ValuesList: React.FC<{
  type: "device" | "query" | "country" | "source" | "page"
  stats: RankingStatEntity[]
}> = (props) => {
  return (
    <ul className="min-w-[1000px]">
      {props.stats.map((item, index) => (
        <li
          key={index}
          className="grid grid-cols-5 gap-4 rounded px-2 odd:bg-slate-50 sm:px-4"
        >
          <div className="relative my-0.5 flex flex-grow py-2">
            <span className="font-base relative font-display text-sm text-slate-900">
              {props.type === "country" && (
                // @ts-ignore
                <FormattedMessage id={`country/${item[props.type]}`} />
              )}

              {props.type === "page" && (
                <div className="flex items-center">
                  <span>{formatUrl(item[props.type])}</span>

                  <a
                    href={item[props.type]}
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
                item[props.type]}
            </span>
          </div>
          <DisplayEvolution item={item} type="clicks" />
          <DisplayEvolution item={item} type="impressions" />
          <DisplayEvolution item={item} type="position" />
          <DisplayEvolution item={item} type="click_through_rate" />
        </li>
      ))}
    </ul>
  )
}

export const Wrapper: React.FC<ContainerProps> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} leavePaddingTop>
      <div
        className="w-[calc(100vw-4em)] max-w-6xl md:w-[calc(100vw-8em)]"
        style={{ overflowX: "auto" }}
      >
        <TableHead type={props.type} />
        <ValuesList type={props.type} stats={props.stats} />
      </div>
    </Modal>
  )
}

export const HistogramModal = connector(Wrapper)
