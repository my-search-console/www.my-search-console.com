import React, { useEffect, useRef, useState } from "react"
import "chartjs-adapter-date-fns"
import { ContainerProps, connector } from "./containers/Chart.container"
import {
  RankingOrderByType,
  RankingStatsForFrontend,
} from "../../../entities/RankingWebsiteEntity"
import { RenderChart } from "../../general/RenderChart/RenderChart"
import { ButtonPrimary, ButtonSecondary } from "../../UI/Button/Button"
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  CircleStackIcon,
} from "@heroicons/react/20/solid"
import { Logo } from "../../UI/Logo"

type Props = {
  onMount: () => void
  stats: RankingStatsForFrontend
  isFetching: boolean
  orderBy: RankingOrderByType
  onFilter: (date: string) => void
  onShow: () => void
  isRealUserData: boolean
  onDownload: () => void
}

const Wrapper: React.FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div>
      {!props.isRealUserData && (
        <div className="mb-4 mt-4 flex items-center justify-center">
          <ButtonPrimary disabled={props.isFetching} onClick={props.onShow}>
            {props.isFetching && (
              <ArrowPathIcon className="h-5 w-5 animate-spin" />
            )}
            {!props.isFetching && <CircleStackIcon className="h-5 w-5" />}
            <span className="ml-1">Show my data</span>
          </ButtonPrimary>
        </div>
      )}

      <div
        ref={ref}
        id="render-chart"
        className="bg-gradient-to-br from-pink-200 to-sky-200 p-8 pb-4"
      >
        <div className="shadow-btn-2 relative w-full rounded-lg border-2 border-slate-100 bg-white p-4 shadow-slate-100">
          <RenderChart
            date={props.stats.date}
            type={"clicks"}
            aspect="aspect-[16/7]"
            isFetching={props.isFetching}
            onFilter={props.onFilter}
          />
        </div>

        <div className="mt-4 flex justify-center">
          <ButtonSecondary size="sm">
            <Logo className="mr-1 h-5 w-5" />
            <span>foudroyer.com</span>
          </ButtonSecondary>
        </div>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        <ButtonSecondary onClick={props.onDownload}>
          <ArrowDownTrayIcon className="mr-2 h-5 w-5" />
          <span>Download</span>
        </ButtonSecondary>
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const Chart = connector(Container)
