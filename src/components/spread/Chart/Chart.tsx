import { GlobeEuropeAfricaIcon } from "@heroicons/react/20/solid"
import dayjs from "dayjs"
import React, { useEffect, useState } from "react"
import { useIntl } from "react-intl"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Loader } from "../../general/Loader/Loader"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart"
import { ChartFooter } from "../chart-footer/chart-footer"
import { connector, ContainerProps } from "./containers/Chart.container"

const Skeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="animate-pulse bg-gray-200 h-6 w-3/4 rounded"></CardTitle>
        <CardDescription className="animate-pulse bg-gray-200 h-4 w-1/2 mt-2 rounded"></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="animate-pulse bg-gray-200 h-32 w-full rounded"></div>
      </CardContent>
    </Card>
  )
}

const Wrapper: React.FC<ContainerProps> = (props) => {
  const intl = useIntl()
  const [isMounted, setIsMounted] = useState(false)
  const [from, setFrom] = useState<string | null>(null)
  const [to, setTo] = useState<string | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const chartConfig = {
    clicks: {
      label: intl.formatMessage({
        id: "analytics/histogram/filter/clicks",
      }),
      color: "hsl(var(--color-clicks))",
    },
    impressions: {
      label: intl.formatMessage({
        id: "analytics/histogram/filter/impressions",
      }),
      color: "hsl(var(--color-impressions))",
    },
    position: {
      label: intl.formatMessage({
        id: "analytics/histogram/filter/position",
      }),
      color: "hsl(var(--color-position))",
    },
    click_through_rate: {
      label: intl.formatMessage({
        id: "analytics/histogram/filter/click_through_rate",
      }),
      color: "hsl(var(--color-click_through_rate))",
    },
  }

  const chartData = props.stats.date.map((item) => ({
    day: item.date,
    clicks: item.clicks,
    impressions: item.impressions,
    previous_impressions: item.previous_impressions,
    position: item.position,
    click_through_rate: item.click_through_rate,
  }))

  if (!isMounted || (props.websites.length === 0 && props.isFetching)) {
    return (
      <>
        <Skeleton />
      </>
    )
  }

  return (
    <Card>
      <CardHeader className="p-4">
        <div className="font-display font-medium text-sm flex items-center gap-2">
          <GlobeEuropeAfricaIcon className="h-4 w-4" />
          Global
        </div>
      </CardHeader>
      <CardContent className="relative p-2">
        {props.isFetching && <Loader />}
        <ChartContainer config={chartConfig} className="md:aspect-[16/2]">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
            // onMouseDown={(e) => {
            //   setFrom(e.activeLabel as string)
            //   setTo(dayjs(e.activeLabel).add(1, "day").format("YYYY-MM-DD"))
            // }}
            // onMouseMove={(e) => from && setTo(e.activeLabel as string)}
            // onMouseUp={() => {
            //   if (from && to && from !== to) {
            //     const inverse = dayjs(from).isAfter(to)

            //     props.onFilter({
            //       from: inverse ? to : from,
            //       to: inverse ? from : to,
            //     })
            //   }

            //   setFrom(null)
            //   setTo(null)
            // }}
          >
            <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              hide={true}
            />
            <YAxis
              yAxisId="clicks"
              stroke="var(--color-clicks)"
              tickLine={false}
              axisLine={false}
              hide={true}
            />
            <YAxis
              yAxisId="impressions"
              orientation="right"
              stroke="var(--color-impressions)"
              tickLine={false}
              axisLine={false}
              hide={true}
            />
            <YAxis
              yAxisId="position"
              orientation="right"
              stroke="var(--color-position)"
              tickLine={false}
              axisLine={false}
              hide={true}
            />
            <YAxis
              yAxisId="click_through_rate"
              orientation="right"
              stroke="var(--color-click_through_rate)"
              tickLine={false}
              axisLine={false}
              hide={true}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
              labelFormatter={(label) => {
                return dayjs(label).format("DD MMMM YYYY")
              }}
            />

            <Area
              yAxisId="clicks"
              dataKey="clicks"
              fillOpacity={0}
              strokeWidth={2}
              stroke="hsl(var(--chart-clicks))"
              isAnimationActive={false}
              hide={!props.dimensions.clicks}
            />
            <Area
              yAxisId="impressions"
              dataKey="impressions"
              fillOpacity={0}
              strokeWidth={2}
              stroke="hsl(var(--chart-impressions))"
              isAnimationActive={false}
              hide={!props.dimensions.impressions}
            />
            <Area
              yAxisId="position"
              dataKey="position"
              fillOpacity={0}
              strokeWidth={2}
              stroke="hsl(var(--chart-position))"
              isAnimationActive={false}
              hide={!props.dimensions.position}
            />
            <YAxis
              yAxisId="click_through_rate"
              orientation="right"
              stroke="var(--color-click_through_rate)"
              tickLine={false}
              axisLine={false}
              hide={!props.dimensions.click_through_rate}
            />

            {/* {from && to && (
              <ReferenceArea
                yAxisId="left"
                x1={from}
                x2={to}
                strokeOpacity={0.3}
                stroke="hsl(var(--chart-clicks))"
                fill="hsl(var(--chart-clicks))"
                fillOpacity={0.1}
              />
            )} */}
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <ChartFooter
        clicks={props.stats.global.clicks}
        impressions={props.stats.global.impressions}
        position={props.stats.global.position}
        click_through_rate={props.stats.global.click_through_rate}
      />
    </Card>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const Chart = connector(Container)
