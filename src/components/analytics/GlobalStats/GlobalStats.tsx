import {
  ArrowDownRightIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/20/solid"
import classNames from "classnames"
import React from "react"
import { useIntl } from "react-intl"
import {
  RankingOrderByType,
  RankingStatsForFrontend,
} from "../../../entities/RankingWebsiteEntity"
import {
  bigNumberFormatter,
  universalFormatNumber,
} from "../../../utils/bigNumberFormatter"
import { setArrowIcon, setEvolutionColor } from "../../../utils/setEvolution"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { Loader } from "../../general/Loader/Loader"
import { Tooltip } from "../../UI/Tooltip"
import { connector, ContainerProps } from "./containers/GlobalStats.container"

function isDecimal(n: number) {
  return n % 1 !== 0
}

const formatNumber = (value: number, style?: string) => {
  if (isDecimal(value) && style === "percent") {
    return bigNumberFormatter(value, 2) + "%"
  }
  if (isDecimal(value)) {
    return bigNumberFormatter(value, 2)
  }
  return value?.toLocaleString("en-US")
}

function percentEvolution(params: {
  type: string
  before: number
  after: number
}) {
  if (params.type === "position") {
    return ((params.before - params.after) / params.before) * 100
  }
  return ((params.after - params.before) / params.before) * 100
}

const Item: React.FC<{
  value: number
  before: number
  style?: string
  type: "clicks" | "impressions" | "position" | "click_through_rate"
  selected: boolean
  isFetching: boolean
  onClick: () => void
}> = (props) => {
  const { locale } = useIntl()

  return (
    <Tooltip
      direction="bottom"
      label={
        <p className="flex items-center font-display text-base font-medium">
          <span className="text-slate-400">
            {universalFormatNumber({
              num: props.before,
              locale,
            })}
          </span>
          <span
            className={classNames(
              setEvolutionColor({
                type: props.type,
                previous: props.before,
                current: props.value,
              }),
              "px-[2px]"
            )}
          >
            {setArrowIcon({
              type: props.type,
              previous: props.before,
              current: props.value,
            })}
          </span>
          <span>{universalFormatNumber({ num: props.value, locale })}</span>
        </p>
      }
      align="center"
    >
      <div
        className={classNames(
          "relative cursor-pointer overflow-hidden rounded-lg border border-slate-100 transition-all duration-300 ease-in-out hover:border-transparent hover:ring-2",
          props.selected && "border-transparent ring-2",
          props.type === "clicks" && "ring-pink-100",
          props.type === "impressions" && "ring-fuchsia-100",
          props.type === "position" && "ring-amber-100",
          props.type === "click_through_rate" && "ring-sky-100"
        )}
      >
        {props.isFetching && <Loader />}

        <div onClick={props.onClick} className="h-full w-full p-4">
          <dt className="text-sm font-medium leading-tight text-slate-900">
            <FormattedMessage id={`analytics/histogram/filter/${props.type}`} />
          </dt>
          <dd className="items-center justify-between sm:flex">
            <div className="flex flex-wrap items-center text-2xl font-semibold text-pink-500">
              {formatNumber(props.value, props.style)}
            </div>
            <div className="text-right">
              <div
                className={classNames(
                  percentEvolution({
                    type: props.type,
                    before: props.before,
                    after: props.value,
                  }) === 0 && "bg-slate-50 text-slate-500",
                  percentEvolution({
                    type: props.type,
                    before: props.before,
                    after: props.value,
                  }) > 0 && "bg-emerald-50 text-emerald-500",
                  percentEvolution({
                    type: props.type,
                    before: props.before,
                    after: props.value,
                  }) < 0 && "bg-red-50 text-red-500",
                  "inline-flex translate-x-2 translate-y-2 transform items-center rounded px-1 py-0.5 text-sm font-medium sm:mt-0 sm:translate-x-0 sm:translate-y-0 sm:px-2"
                )}
              >
                {percentEvolution({
                  type: props.type,
                  before: props.before,
                  after: props.value,
                }) === 0 && (
                  <ArrowRightIcon className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-slate-500" />
                )}
                {percentEvolution({
                  type: props.type,
                  before: props.before,
                  after: props.value,
                }) > 0 && (
                  <ArrowUpRightIcon className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-emerald-500" />
                )}
                {percentEvolution({
                  type: props.type,
                  before: props.before,
                  after: props.value,
                }) < 0 && (
                  <ArrowDownRightIcon className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500" />
                )}
                {props.before === 0 && "0"}
                {props.before !== 0 &&
                  bigNumberFormatter(
                    Math.abs(
                      percentEvolution({
                        type: props.type,
                        before: props.before,
                        after: props.value,
                      })
                    ),
                    2
                  )}{" "}
                %
              </div>
            </div>
          </dd>
        </div>
      </div>
    </Tooltip>
  )
}

export const Wrapper: React.FC<{
  stats: RankingStatsForFrontend["global"]
  selected: RankingOrderByType
  onClick: (type: RankingOrderByType) => void
  isFetching: boolean
}> = (props) => {
  return (
    <div className="m-auto w-full font-display">
      <dl className="mb-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Item
          value={props.stats.clicks}
          before={props.stats.previous_clicks}
          type="clicks"
          isFetching={props.isFetching}
          selected={props.selected === "clicks"}
          onClick={() => props.onClick("clicks")}
        />
        <Item
          value={props.stats.impressions}
          before={props.stats.previous_impressions}
          type="impressions"
          isFetching={props.isFetching}
          selected={props.selected === "impressions"}
          onClick={() => props.onClick("impressions")}
        />
        <Item
          value={props.stats.position}
          before={props.stats.previous_position}
          type="position"
          isFetching={props.isFetching}
          selected={props.selected === "position"}
          onClick={() => props.onClick("position")}
        />
        <Item
          value={props.stats.click_through_rate}
          before={props.stats.previous_click_through_rate}
          style="percent"
          isFetching={props.isFetching}
          selected={props.selected === "click_through_rate"}
          type="click_through_rate"
          onClick={() => props.onClick("click_through_rate")}
        />
      </dl>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const GlobalStats = connector(Container)
