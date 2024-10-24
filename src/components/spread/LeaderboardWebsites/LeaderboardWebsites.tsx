import React, { useEffect, useState } from "react"
import {
  connector,
  ContainerProps,
} from "./containers/LeaderboardWebsites.container"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { RankingStatsForFrontend } from "../../../entities/RankingWebsiteEntity"
import { getFavicon } from "../../../utils/getFavicon"

import dayjs from "dayjs"
import { useIntl } from "react-intl"
import { FoudroyerLink } from "../../general/FoudroyerLink/FoudroyerLink"
import { Loader } from "../../general/Loader/Loader"
import { ChartFooter } from "../chart-footer/chart-footer"

const Item: React.FC<{
  id: string
  clicks: number
  impressions: number
  position: number
  click_through_rate: number
  timeline: RankingStatsForFrontend["date"]
  isLoading: boolean
  onClick: () => void
  dimensions: {
    clicks: boolean
    impressions: boolean
    position: boolean
    click_through_rate: boolean
  }
}> = (props) => {
  const favicon = getFavicon(props.id)
  const intl = useIntl()

  const chartConfig = {
    clicks: {
      label: intl.formatMessage({
        id: "analytics/histogram/filter/clicks",
      }),
    },
    impressions: {
      label: intl.formatMessage({
        id: "analytics/histogram/filter/impressions",
      }),
    },
    position: {
      label: intl.formatMessage({
        id: "analytics/histogram/filter/position",
      }),
    },
    click_through_rate: {
      label: intl.formatMessage({
        id: "analytics/histogram/filter/click_through_rate",
      }),
    },
  }

  const chartData = props.timeline.map((item) => ({
    day: item.date,
    clicks: item.clicks,
    impressions: item.impressions,
    position: item.position,
    click_through_rate: item.click_through_rate,
  }))

  return (
    <Card>
      <CardHeader className="p-4">
        <FoudroyerLink
          to={`/analytics/${props.id}`}
          className="font-display font-medium text-sm hover:underline flex items-center gap-2"
        >
          <img src={favicon} className="h-4 w-4" />
          {props.id}
        </FoudroyerLink>
      </CardHeader>
      <CardContent className="p-2 relative">
        {props.isLoading && <Loader />}
        <ChartContainer className="aspect-[16/5]" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
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
              orientation="left"
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
            <Area
              yAxisId="click_through_rate"
              dataKey="click_through_rate"
              fillOpacity={0}
              strokeWidth={2}
              stroke="hsl(var(--chart-click_through_rate))"
              isAnimationActive={false}
              hide={!props.dimensions.click_through_rate}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <ChartFooter
        clicks={props.clicks}
        impressions={props.impressions}
        position={props.position}
        click_through_rate={props.click_through_rate}
      />
    </Card>
  )
}

type Props = ContainerProps

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

const Wrapper: React.FC<Props> = (props) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-2">
      {!isMounted ||
        (props.websites.length === 0 && props.fetching && (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ))}

      {props.websites.map((website, index) => (
        <div key={index} className="w-full h-full">
          <Item
            {...website}
            onClick={() => props.goAnalytics(website.id)}
            isLoading={props.fetching}
            dimensions={props.dimensions}
          />
        </div>
      ))}
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const LeaderboardWebsites = connector(Container)
