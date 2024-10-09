import classNames from "classnames"
import React from "react"
import { useIntl } from "react-intl"
import { RankingStatEntity } from "../../../../../entities/RankingWebsiteEntity"
import {
  bigNumberFormatter,
  universalFormatNumber,
} from "../../../../../utils/bigNumberFormatter"
import {
  setArrowIcon,
  setEvolutionColor,
} from "../../../../../utils/setEvolution"
import { Tooltip } from "../../../../uiii/Tooltip"
import { connector, ContainerProps } from "./containers/KeywordItem.container"

type Props = {
  stats: RankingStatEntity
  onSelect: (keyword: string) => void
  onClick: (keyword: string) => void
  isSelected: boolean
  barWidth: number
  color: "pink" | "gray"
}

export const Wrapper: React.FC<Props> = (props) => {
  const { locale } = useIntl()

  return (
    <li className="group flex items-center justify-between">
      <div className="relative my-0.5 flex flex-grow items-center p-2 pl-0">
        <div
          className={classNames(
            "absolute left-0 top-0 block h-full rounded-lg bg-pink-100 transition-all duration-300 ease-in-out hover:w-full"
          )}
          style={{ width: props.barWidth + "%" }}
        ></div>

        <div
          className={classNames(
            "absolute left-0 top-0 block h-full w-full rounded-lg bg-pink-200 opacity-0 transition-all duration-300 ease-in-out hover:w-full group-hover:opacity-100"
          )}
        ></div>

        <input
          onClick={() => props.onSelect(props.stats.query)}
          aria-describedby="comments-description"
          checked={props.isSelected}
          type="checkbox"
          className="z-10 ml-2 h-4 w-4 rounded border-slate-200 text-pink-400 focus:ring-pink-400"
        />
        <span
          className="font-base relative ml-2 cursor-pointer font-display text-sm font-medium text-slate-900 hover:underline"
          onClick={() => props.onClick(props.stats.query)}
        >
          {props.stats.query}
        </span>
      </div>
      <div className="w-28 justify-end text-right">
        <Tooltip
          direction="left"
          align="left"
          label={
            <p className="flex items-center font-display text-base font-medium">
              <span className="text-slate-400">
                {universalFormatNumber({
                  num: props.stats.previous_position,
                  locale,
                })}
              </span>
              <span
                className={classNames(
                  setEvolutionColor({
                    type: "position",
                    previous: props.stats.previous_position,
                    current: props.stats.position,
                  }),
                  "px-[2px]"
                )}
              >
                {setArrowIcon({
                  type: "position",
                  previous: props.stats.previous_position,
                  current: props.stats.position,
                })}
              </span>
              <span>
                {universalFormatNumber({ num: props.stats.position, locale })}
              </span>
            </p>
          }
        >
          <p className="flex items-center justify-end pl-4 text-right font-display font-medium leading-5">
            <span className="text-slate-500">
              {bigNumberFormatter(props.stats.previous_position, 1)}
            </span>
            <span
              className={classNames(
                setEvolutionColor({
                  type: "position",
                  previous: props.stats.previous_position,
                  current: props.stats.position,
                }),
                "px-[2px]"
              )}
            >
              {setArrowIcon({
                type: "position",
                previous: props.stats.previous_position,
                current: props.stats.position,
              })}
            </span>
            <span>{bigNumberFormatter(props.stats.position, 1)}</span>
          </p>
        </Tooltip>
      </div>
    </li>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const KeywordItem = connector(Container)
