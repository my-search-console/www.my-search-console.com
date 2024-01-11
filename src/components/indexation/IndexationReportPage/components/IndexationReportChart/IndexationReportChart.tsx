import React, { useEffect } from "react"
import { Chart } from "chart.js/auto"
import {
  ContainerProps,
  connector,
} from "./containers/IndexationReportChart.container"
import { Loader } from "../../../../general/Loader/Loader"
import { bigNumberFormatter } from "../../../../../utils/bigNumberFormatter"
import { useIntl } from "react-intl"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { ButtonPrimary, ButtonSecondary } from "../../../../UI/Button/Button"

type Props = {
  graph: Array<{
    date: Date
    indexed: number
    notIndexed: number
  }>
  isFetching: boolean
  isPremium: boolean
  noTotalFromQueue: boolean
  onOpenPremiumModal: () => void
}

const RenderChart: React.FC<{
  date: Array<{ date: Date; indexed: number; notIndexed: number }>
  isFetching: boolean
  displayEmptyState?: boolean
  isPremium?: boolean
  onOpenPremiumModal?: () => void
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
            data: props.date.map((d) => d.indexed),
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
            data: props.date.map((d) => d.notIndexed),
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
  return (
    <div className="relative w-full rounded-lg border border-slate-100 bg-white p-2 sm:p-4">
      {props.isFetching && <Loader />}
      <RenderChart
        date={props.graph}
        displayEmptyState={props.noTotalFromQueue}
        isFetching={props.isFetching}
        isPremium={props.isPremium}
        onOpenPremiumModal={props.onOpenPremiumModal}
      />
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const IndexationReportChart = connector(Container)
