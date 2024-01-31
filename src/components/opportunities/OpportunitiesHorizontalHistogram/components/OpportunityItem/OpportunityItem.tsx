import React from "react"
import classNames from "classnames"
import {
  ContainerProps,
  connector,
} from "./containers/OpportunityItem.container"
import { StarIcon } from "@heroicons/react/20/solid"
import { OpportunityEntity } from "@my-search-console/interfaces"

function getGrade(opportunity: OpportunityEntity): number {
  const rules = {
    0.02: 1,
    0.05: 2,
    0.1: 3,
    0.15: 4,
    0.2: 5,
  }
  if (opportunity.ratio < 0.02) {
    return rules[0.02]
  }
  if (opportunity.ratio < 0.05) {
    return rules[0.05]
  }
  if (opportunity.ratio < 0.1) {
    return rules[0.1]
  }
  if (opportunity.ratio < 0.15) {
    return rules[0.15]
  }
  return rules[0.2]
}

const Stars: React.FC<{ grade: number }> = (props) => {
  return (
    <div className="flex h-5 justify-end">
      {Array.from(Array(props.grade).keys()).map((i) => (
        <StarIcon className="text-yellow-500" />
      ))}
    </div>
  )
}

type Props = {
  data: OpportunityEntity
  onClick: (opportunity: string) => void
}

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <li className="group flex items-center justify-between">
      <div className="relative my-0.5 flex flex-grow items-center p-2 pl-0">
        <div
          className={classNames(
            "absolute left-0 top-0 block h-full rounded-lg bg-slate-100 transition-all duration-300 ease-in-out hover:w-full"
          )}
          style={{ width: getGrade(props.data) * 20 + "%" }}
        ></div>

        <div
          className={classNames(
            "absolute left-0 top-0 block h-full w-full rounded-lg bg-slate-200 opacity-0 transition-all duration-300 ease-in-out hover:w-full group-hover:opacity-100"
          )}
        ></div>
        <span
          className="font-base relative ml-2 cursor-pointer font-display text-sm font-medium text-slate-900 hover:underline"
          onClick={() => props.onClick(props.data.query)}
        >
          {props.data.query}
        </span>
      </div>
      <div className="ml-4 w-24 text-right">
        <Stars grade={getGrade(props.data)} />
      </div>
    </li>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const OpportunityItem = connector(Container)
