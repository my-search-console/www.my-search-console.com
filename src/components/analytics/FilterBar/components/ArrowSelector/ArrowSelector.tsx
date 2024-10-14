import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"
import React from "react"
import { getSecondaryStyle } from "../../../../ui/Button/Button"
import {
  connector,
  ContainerProps,
} from "./containers/ArrowSelector.containers"

export const Wrapper: React.FC<{
  onNextPeriod: () => void
  onPreviousPeriod: () => void
}> = (props) => {
  return (
    <div className="flex space-x-1 text-slate-700">
      <button
        className={classNames(
          getSecondaryStyle({
            size: "sm",
          }),
          "rounded-none rounded-l-md !px-2"
        )}
        onClick={props.onPreviousPeriod}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <button
        className={classNames(
          getSecondaryStyle({
            size: "sm",
          }),
          "rounded-none rounded-r-md !px-2"
        )}
        onClick={props.onNextPeriod}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const ArrowSelector = connector(Container)
