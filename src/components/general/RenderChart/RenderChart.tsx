import { Chart } from "chart.js/auto"
import dayjs from "dayjs"
import React, { useEffect } from "react"
import { useIntl } from "react-intl"
import {
  RankingStatsForFrontend,
  RankingOrderByType,
} from "../../../entities/RankingWebsiteEntity"
import { bigNumberFormatter } from "../../../utils/bigNumberFormatter"
import { GraphTooltip } from "../../analytics/GraphTooltip"
import { Loader } from "../Loader/Loader"
import classNames from "classnames"

function repositionTooltip(e: { clientX: number; clientY: number }) {
  const canvas = document.getElementById("myChart") as HTMLCanvasElement
  const tooltipEl = canvas.parentNode?.querySelector("div") as HTMLDivElement

  const onMobile = window.innerWidth < 768

  if (tooltipEl) {
    // if the tooltip is trespassing the right border of the parent element, we reposition it to the left of the cursor
    const parent = tooltipEl.parentNode as HTMLDivElement
    const x = e.clientX - parent.getBoundingClientRect().left
    const y = e.clientY - parent.getBoundingClientRect().top

    if (x + tooltipEl.clientWidth > parent.clientWidth - (onMobile ? 15 : 0)) {
      tooltipEl.style.left = ""
      tooltipEl.style.right = `${0 - (onMobile ? 15 : 0)}px`
    } else {
      tooltipEl.style.left = `${x - (onMobile ? -15 : 0)}px`
      tooltipEl.style.right = ""
    }

    // on mobile, reposition tooltip on top of cursor for better readability
    tooltipEl.style.top =
      y + (onMobile ? -40 : 0) - tooltipEl.clientHeight + "px"
    tooltipEl.style.opacity = "1"

    // if cursor is out of parent area, hide tooltip
    if (x < 0 || x > parent.clientWidth || y < 0 || y > parent.clientHeight) {
      tooltipEl.style.opacity = "0"
    }
  }
}

export const RenderChart: React.FC<{
  date: RankingStatsForFrontend["date"]
  isFetching: boolean
  type: RankingOrderByType
  onFilter: (date: string) => void
  aspect?: string
}> = (props) => {
  const intl = useIntl()

  useEffect(() => {
    var canvas = document.getElementById("myChart") as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    var gradient = ctx.createLinearGradient(0, 0, 0, 300)

    if (props.type === "clicks") {
      gradient.addColorStop(0, "rgba(236, 72, 153, 0.4)")
      gradient.addColorStop(1, "rgba(236, 72, 153, 0.05)")
    }

    if (props.type === "impressions") {
      gradient.addColorStop(0, "rgba(232, 121, 249, 0.4)")
      gradient.addColorStop(1, "rgba(232, 121, 249, 0.05)")
    }

    if (props.type === "position") {
      gradient.addColorStop(0, "rgba(251, 191, 36, 0.4)")
      gradient.addColorStop(1, "rgba(251, 191, 36, 0.05)")
    }

    if (props.type === "click_through_rate") {
      gradient.addColorStop(0, "rgba(14, 165, 233, 0.4)")
      gradient.addColorStop(1, "rgba(14, 165, 233, 0.05)")
    }

    // triger following listener only if hovering over canvas
    canvas.addEventListener("mousemove", repositionTooltip)
    // also reposition on touchmove
    canvas.addEventListener("touchmove", (e) => {
      // if touch is inside canvas, reposition tooltip
      const touch = e.touches[0]
      repositionTooltip({ clientX: touch.clientX, clientY: touch.clientY })
    })

    // when touch stats, prevent page scrolling
    canvas.addEventListener("touchstart", (e) => {
      // e.preventDefault()
      // if touch is outside canvas, hide tooltip
      const touch = e.touches[0]
      repositionTooltip({ clientX: touch.clientX, clientY: touch.clientY })
    })

    // when leaving canvas, hide tooltip
    canvas.addEventListener("mouseleave", () => {
      const tooltipEl = canvas.parentNode?.querySelector(
        "div"
      ) as HTMLDivElement
      if (tooltipEl) {
        tooltipEl.style.opacity = "0"
      }
    })

    Chart.defaults.font.family = "Lexend"

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: props.date.map((d) => d.date),
        datasets: [
          {
            label: "Clicks",
            data: props.date.map((d) => d.clicks),
            fill: true,
            borderColor: "rgba(236, 72, 153, 1)",
            borderWidth: 2,
            pointHoverRadius: 4,
            backgroundColor: gradient,
            tension: 0.1,
            pointBorderColor: "rgba(0, 0, 0, 0)",
            pointBackgroundColor: "rgba(236, 72, 153, 0)",
            pointHoverBackgroundColor: "rgb(255, 99, 132)",
            pointHoverBorderColor: "rgb(255, 99, 132)",
          },
          {
            label: "Previous Clicks",
            data: props.date.map((d) => d.previous_clicks),
            fill: true,
            borderColor: "rgba(236, 72, 153, 0.3)",
            borderWidth: 2,
            pointHoverRadius: 4,
            backgroundColor: "rgba(236, 72, 153, 0.05)",
            tension: 0,
            borderDash: [5, 4],
            pointBorderColor: "rgba(0, 0, 0, 0)",
            pointBackgroundColor: "rgba(0, 0, 0, 0)",
            pointHoverBackgroundColor: "rgba(236, 72, 153, 0.3)",
            pointHoverBorderColor: "rgba(236, 72, 153, 0.3)",
          },
          {
            label: "Impressions",
            data: props.date.map((d) => d.impressions),
            fill: true,
            borderColor: "rgb(217,70,239)",
            borderWidth: 2,
            pointHoverRadius: 4,
            backgroundColor: gradient,
            tension: 0,
            pointBorderColor: "rgba(0, 0, 0, 0)",
            pointBackgroundColor: "#d946ef",
            pointHoverBackgroundColor: "#d946ef",
            pointHoverBorderColor: "#d946ef",
          },
          {
            label: "Previous Impressions",
            data: props.date.map((d) => d.previous_impressions),
            fill: true,
            borderColor: "rgba(217,70,239, 0.3)",
            borderWidth: 2,
            pointHoverRadius: 4,
            backgroundColor: "rgba(217,70,239, 0.05)",
            tension: 0,
            borderDash: [5, 4],
            pointBorderColor: "rgba(0, 0, 0, 0)",
            pointBackgroundColor: "rgba(0, 0, 0, 0)",
            pointHoverBackgroundColor: "rgba(217,70,239, 0.3)",
            pointHoverBorderColor: "rgba(217,70,239, 0.3)",
          },
          {
            label: "Position",
            data: props.date.map((d) => d.position),
            fill: "start",
            borderColor: "#f59e0b",
            borderWidth: 2,
            pointHoverRadius: 4,
            backgroundColor: gradient,
            tension: 0,
            pointBorderColor: "rgba(0, 0, 0, 0)",
            pointBackgroundColor: "#f59e0b",
            pointHoverBackgroundColor: "#f59e0b",
            pointHoverBorderColor: "#f59e0b",
          },
          {
            label: "Previous Position",
            data: props.date.map((d) => d.previous_position),
            fill: "start",
            borderColor: "rgba(245,158,11,0.3)",
            borderWidth: 2,
            pointHoverRadius: 4,
            backgroundColor: "rgba(245,158,11,0.05)",
            tension: 0,
            borderDash: [5, 4],
            pointBorderColor: "rgba(0, 0, 0, 0)",
            pointBackgroundColor: "rgba(0, 0, 0, 0)",
            pointHoverBackgroundColor: "rgba(245,158,11,0.3)",
            pointHoverBorderColor: "rgba(245,158,11,0.3)",
          },
          {
            label: "Click_Through_Rate",
            data: props.date.map((d) => d.click_through_rate),
            fill: "start",
            borderColor: "rgb(14, 165, 233)",
            borderWidth: 2,
            pointHoverRadius: 4,
            backgroundColor: gradient,
            tension: 0,
            pointBorderColor: "rgba(0, 0, 0, 0)",
            pointBackgroundColor: "rgb(14, 165, 233)",
            pointHoverBackgroundColor: "rgb(14, 165, 233)",
            pointHoverBorderColor: "rgb(14, 165, 233)",
          },
          {
            label: "Previous Click_Through_Rate",
            data: props.date.map((d) => d.previous_click_through_rate),
            fill: "start",
            borderColor: "rgba(14, 165, 233, 0.3)",
            borderWidth: 2,
            pointHoverRadius: 4,
            backgroundColor: "rgba(14, 165, 233, 0.05)",
            tension: 0,
            borderDash: [5, 4],
            pointBorderColor: "rgba(0, 0, 0, 0)",
            pointBackgroundColor: "rgba(0, 0, 0, 0)",
            pointHoverBackgroundColor: "rgba(14, 165, 233, 0.3)",
            pointHoverBorderColor: "rgba(14, 165, 233, 0.3)",
          },
        ].filter(({ label }) => {
          return (
            label.toLowerCase() === props.type ||
            label.toLocaleLowerCase() === `previous ${props.type}`
          )
        }),
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
        onClick: function (e: any, activeElements: any) {
          if (activeElements.length > 0) {
            const dataIndex = activeElements[0].element.$context.dataIndex
            const date = props.date[dataIndex].date
            props.onFilter(dayjs(date).format("YYYY-MM-DD"))
          }
        },
        animation: {
          duration: 600,
        },
        plugins: {
          tooltip: {
            enabled: false,
            mode: "index",
            intersect: false,
            position: "average",
            external: GraphTooltip(intl),
            callbacks: {
              title: function (context: any) {
                const dateStr = new Intl.DateTimeFormat(intl.locale, {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }).format(new Date(context[0].parsed.x))

                return dateStr.charAt(0).toUpperCase() + dateStr.slice(1)
              },
              label: function (context: any) {
                // transform all letters to lowercase
                return `${
                  context.parsed.y
                } ${context.dataset.label.toLowerCase()}`
              },
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
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
            reverse: props.type === "position",
            min: props.type === "position" ? 1 : 0,
            grid: {
              color: "rgba(255, 20, 147, 0.2)",
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
      window.removeEventListener("mousemove", repositionTooltip)
    }
  }, [props.date])

  return (
    <>
      <div
        className={classNames(
          "relative m-auto mt-8 w-full",
          props.aspect ? props.aspect : "aspect-square sm:aspect-[16/5]"
        )}
      >
        {props.isFetching && <Loader></Loader>}
        {/* set width to 100% and important */}
        <canvas id="myChart"></canvas>
      </div>
    </>
  )
}
