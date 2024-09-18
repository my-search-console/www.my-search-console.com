import React from "react"
import {
  connector,
  ContainerProps,
} from "./containers/FilterByRequestIndexingButton.containers"

import { FunnelIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { getSecondaryStyle } from "../../../../UI/Button/Button"
import { Tooltip } from "../../../../UI/Tooltip"

type Props = {
  active: boolean
  onClick: () => void
}

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <div className="flex space-x-2">
      <Tooltip
        label={
          !props.active ? (
            <FormattedMessage id="indexation/filter/submitted/show" />
          ) : (
            <FormattedMessage id="indexation/filter/submitted/hide" />
          )
        }
        className="flex h-full"
        direction="bottom"
        align="right"
      >
        <div
          onClick={props.onClick}
          className={classNames(
            getSecondaryStyle({ size: "sm" }),
            "relative flex h-auto cursor-pointer items-center justify-center rounded-md bg-slate-50 px-4",
            !props.active && "!bg-pink-50 !text-pink-400"
          )}
        >
          <FunnelIcon className={classNames("h-5 w-5")} />
        </div>
      </Tooltip>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const FilterByRequestIndexingButton = connector(Container)
