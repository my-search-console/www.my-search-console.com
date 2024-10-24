import { EyeIcon, ListOrdered, MousePointerClick } from "lucide-react"
import React from "react"
import { CardFooter } from "../../ui/card"

export const ChartFooter = (props: {
  clicks: number
  impressions: number
  position: number
  click_through_rate: number
}) => {
  return (
    <CardFooter className="p-4">
      <div className="flex font-display flex-wrap text-xs justify-between gap-4">
        <div className="flex items-center gap-1">
          <span className="text-[hsl(var(--chart-clicks))]">
            <MousePointerClick className="w-4 h-4" />
          </span>
          <span className="font-medium">{props.clicks.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[hsl(var(--chart-impressions))]">
            <EyeIcon className="w-4 h-4" />
          </span>
          <span className="font-medium">
            {props.impressions.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[hsl(var(--chart-position))]">
            <ListOrdered className="w-4 h-4" />
          </span>
          <span className="font-medium">{props.position.toLocaleString()}</span>
        </div>
        {/* <div className="flex items-center gap-1">
          <span className="text-[hsl(var(--chart-click_through_rate))]">
            <PercentIcon className="w-4 h-4" />
          </span>
          <span className="font-medium">
            {props.position.toLocaleString()}
          </span>
        </div> */}
      </div>
    </CardFooter>
  )
}
