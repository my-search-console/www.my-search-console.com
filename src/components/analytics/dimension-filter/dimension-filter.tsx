import clsx from "clsx"
import { EyeIcon, ListOrderedIcon, MousePointerClickIcon } from "lucide-react"
import React from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { Tooltip } from "../../ui/Tooltip"
import {
  connector,
  ContainerProps,
} from "./containers/dimension-filter.container"

const Wrapper: React.FC<ContainerProps> = (props) => {
  return (
    <div className="flex items-center gap-1 ml-2 bg-slate-50 p-1 rounded-md">
      <Tooltip
        direction="bottom"
        align="center"
        label={<FormattedMessage id="analytics/histogram/filter/clicks" />}
      >
        <button
          onClick={() => props.onToggleDimension({ type: "clicks" })}
          className={clsx(
            "w-8 h-8 rounded flex  text-slate-500 rounded-r-none items-center justify-center",
            props.clicks && "bg-white !text-clicks",
            !props.clicks && "hover:bg-white hover:!text-clicks"
          )}
        >
          <MousePointerClickIcon className="w-4 h-4 " />
        </button>
      </Tooltip>
      <Tooltip
        direction="bottom"
        align="center"
        label={<FormattedMessage id="analytics/histogram/filter/impressions" />}
      >
        <button
          onClick={() => props.onToggleDimension({ type: "impressions" })}
          className={clsx(
            "w-8 h-8 flex items-center text-slate-500 rounded-none justify-center",
            props.impressions && "bg-white !text-impressions",
            !props.impressions && "hover:bg-white hover:!text-impressions"
          )}
        >
          <EyeIcon className="w-4 h-4 " />
        </button>
      </Tooltip>
      <Tooltip
        direction="bottom"
        align="center"
        label={<FormattedMessage id="analytics/histogram/filter/position" />}
      >
        <button
          onClick={() => props.onToggleDimension({ type: "position" })}
          className={clsx(
            "w-8 h-8 flex items-center rounded-r text-slate-500 justify-center",
            props.position && "bg-white !text-position",
            !props.position && "hover:bg-white hover:!text-position"
          )}
        >
          <ListOrderedIcon className="w-4 h-4" />
        </button>
      </Tooltip>
      {/* <Tooltip
        direction="bottom"
        align="center"
        label={
          <FormattedMessage id="analytics/histogram/filter/click_through_rate" />
        }
      >
        <button
          onClick={() =>
            props.onToggleDimension({ type: "click_through_rate" })
          }
          className={clsx(
            "w-8 h-8 rounded flex items-center text-slate-500 rounded-l-none justify-center",
            props.click_through_rate && "bg-white !text-click_through_rate",
            !props.click_through_rate &&
              "hover:bg-white hover:!text-click_through_rate"
          )}
        >
          <PercentIcon className="w-4 h-4 " />
        </button>
      </Tooltip> */}
    </div>
  )
}

export const DimensionFilter = connector(Wrapper)
