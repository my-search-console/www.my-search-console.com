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
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart"
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
  }

  const chartData = props.stats.date.map((item) => ({
    day: item.date,
    clicks: item.clicks,
    impressions: item.impressions,
    previous_impressions: item.previous_impressions,
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
              yAxisId="left"
              orientation="left"
              stroke="var(--color-clicks)"
              tickLine={false}
              axisLine={false}
              hide={true}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="var(--color-impressions)"
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
            <defs>
              <linearGradient id="fill-impressions" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-impressions))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="80%"
                  stopColor="hsl(var(--chart-impressions))"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fill-clicks" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-clicks))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="80%"
                  stopColor="hsl(var(--chart-clicks))"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              yAxisId="left"
              dataKey="clicks"
              type="monotone"
              fill="url(#fill-clicks)"
              fillOpacity={0.4}
              stroke="hsl(var(--chart-clicks))"
              isAnimationActive={false}
            />
            <Area
              yAxisId="right"
              dataKey="impressions"
              type="monotone"
              fill="url(#fill-impressions)"
              fillOpacity={0.4}
              stroke="hsl(var(--chart-impressions))"
              isAnimationActive={false}
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

      <CardFooter className="p-4">
        <div className="flex text-xs font-display justify-between gap-4">
          <div className="flex  items-center gap-1">
            <div className="w-3 h-3 rounded bg-[hsl(var(--chart-clicks))]"></div>
            <span className="text-slate-500">Clicks</span>
            <span className="ml-1 font-medium">
              {props.stats.global.clicks.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-[hsl(var(--chart-impressions))]"></div>
            <span className="text-slate-500">Impressions</span>
            <span className="ml-1 font-medium">
              {props.stats.global.impressions.toLocaleString()}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const Chart = connector(Container)
