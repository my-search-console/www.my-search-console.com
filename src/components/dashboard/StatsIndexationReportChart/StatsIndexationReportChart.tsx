import { Chart } from "chart.js/auto"
import "chartjs-adapter-date-fns"
import React, { useEffect } from "react"
import { useIntl } from "react-intl"
import { StatsIndexationThroughTimeEntity } from "../../../interfaces/IStatsRepository"
import { bigNumberFormatter } from "../../../utils/bigNumberFormatter"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { Loader } from "../../general/Loader/Loader"
import {
  connector,
  ContainerProps,
} from "./containers/StatsIndexationReportChart.container"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

type Props = {
  state: StatsIndexationThroughTimeEntity
  isFetching: boolean
  onMount: () => void
}

const RenderChart: React.FC<{
  date: StatsIndexationThroughTimeEntity["data"]
  isFetching: boolean
  displayEmptyState?: boolean
}> = (props) => {
  const intl = useIntl()

  useEffect(() => {
    var canvas = document.getElementById("myChart") as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    Chart.defaults.font.family = "Lexend"

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: props.date.map((d) => d.date),
        datasets: [
          {
            label: "Indexed",
            data: props.date.map((d) => d.pages_indexed),
            backgroundColor: "#34d399",
            borderSkipped: false,
            borderRadius: [
              {
                topLeft: 4,
                topRight: 4,
              },
            ],
          },
          {
            label: "Not-Indexed",
            data: props.date.map((d) => d.pages_not_indexed),
            backgroundColor: "#f1f5f9",
            borderSkipped: false,
            borderRadius: [
              {
                topLeft: 4,
                topRight: 4,
              },
            ],
          },
        ],
      },
      options: {
        layout: {
          padding: {
            left: -5,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        hover: {
          mode: "index",
          intersect: false,
        },
        onResize: function (chart: any, dimensions: any) {
          chart.options.scales.x.ticks.maxTicksLimit =
            dimensions.width < 600 ? 5 : 7
        },
        animation: {
          duration: 300,
        },
        plugins: {
          tooltip: {
            enabled: true,
            mode: "index",
            intersect: false,
            position: "average",
            callbacks: {
              title: function (context: any) {
                const dateStr = new Intl.DateTimeFormat(intl.locale, {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                }).format(new Date(context[0].parsed.x))
                return dateStr.charAt(0).toUpperCase() + dateStr.slice(1)
              },
              label: function (context: any) {
                const label = intl.formatMessage({
                  id:
                    "indexation/reports/graph/tooltip/" +
                    context.dataset.label.toLowerCase(),
                })

                return `${context.parsed.y} ${label}`
              },
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            stacked: true,
            type: "time",
            time: {
              unit: "day",
              round: "day",
            },
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              color: "#0f172a",
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
              callback: (value: any, index: any, values: any) => {
                return new Intl.DateTimeFormat(intl.locale, {
                  day: "numeric",
                  month: "short",
                }).format(new Date(value))
              },
            },
          },
          y: {
            stacked: true,
            grid: {
              drawTicks: false,
            },
            border: {
              display: false,
            },
            ticks: {
              maxTicksLimit: 5,
              color: "#0f172a",
              padding: 10,
              callback: function (value: number | string, _index, _values) {
                return bigNumberFormatter(value, 1)
              },
            },
          },
        },
      },
    })

    return () => {
      chart.destroy()
    }
  }, [props.date])

  return (
    <>
      <div className="relative m-auto aspect-[16/3] w-full">
        {props.displayEmptyState && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-white bg-opacity-90">
            <div className="max-w-md text-center">
              <h2 className=" font-display text-sm font-semibold">
                <FormattedMessage id="chart/empty-state/title" />
              </h2>
              <p className="text-sm text-slate-400">
                <FormattedMessage id="chart/empty-state/description" />
              </p>
            </div>
          </div>
        )}
        <canvas id="myChart"></canvas>
      </div>
    </>
  )
}

const Wrapper: React.FC<Props> = (props) => {
  useEffect(() => {
    props.onMount()
  }, [])

  if (props.state.data.length === 0) return <></>

  return (
    <div>
      <>
        <div className="relative w-full rounded-lg border border-slate-100 bg-white p-2 sm:p-4">
          <div className="mb-8">
            <div className="font-display text-xs">
              <FormattedMessage id="dashboard/stats/indexation/title" />
            </div>
            <div className="text-xs text-slate-400">
              <FormattedMessage id="dashboard/stats/indexation/description" />
            </div>
          </div>
          {props.isFetching && <Loader />}

          <RenderChart
            date={props.state.data}
            displayEmptyState={props.state.data.length === 0}
            isFetching={props.isFetching}
          />
          <div className="mt-6 text-right font-display text-xs text-slate-400">
            This report has been updated{" "}
            {dayjs(props.state.updated_at).fromNow()}
          </div>
        </div>
      </>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const StatsIndexationReportChart = connector(Container)
