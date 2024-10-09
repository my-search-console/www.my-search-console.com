import React from "react"
import {
  connector,
  ContainerProps,
} from "./containers/LeaderboardWebsites.container"

import { useIntl } from "react-intl"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { RankingStatsForFrontend } from "../../../entities/RankingWebsiteEntity"
import { getFavicon } from "../../../utils/getFavicon"

import dayjs from "dayjs"
import { Loader } from "../../general/Loader/Loader"
export const description = "An area chart with gradient fill"

const chartConfig = {
  clicks: {
    label: "clicks",
    color: "hsl(var(--color-clicks))",
  },
  impressions: {
    label: "impressions",
    color: "hsl(var(--color-impressions))",
  },
}

const Item: React.FC<{
  id: string
  clicks: number
  impressions: number
  timeline: RankingStatsForFrontend["date"]
  isLoading: boolean
  onClick: () => void
}> = (props) => {
  const favicon = getFavicon(props.id)
  const { timeline } = props

  const chartData = timeline.map((item) => ({
    day: item.date,
    clicks: item.clicks,
    impressions: item.impressions,
  }))

  return (
    <Card>
      <CardHeader className="p-4">
        <div
          onClick={props.onClick}
          className="font-display hover:text-pink-500 text-sm hover:underline flex items-center gap-2"
        >
          <img src={favicon} className="h-4 w-4" />
          {props.id}
        </div>
      </CardHeader>
      <CardContent className="p-2 relative">
        {props.isLoading && <Loader />}
        <ChartContainer config={chartConfig}>
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
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  )
}

type Props = ContainerProps

const Wrapper: React.FC<Props> = (props) => {
  const { locale } = useIntl()

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4">
      {props.websites.map((website, index) => (
        <div key={index} className="w-full h-full">
          <Item
            {...website}
            onClick={() => props.goAnalytics(website.id)}
            isLoading={props.fetching}
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

{
  /* <div className="relative w-full h-96 no-scroll-bar overflow-y-auto">
        {props.websites.map(({ id, clicks, impressions }, index) => (
          <div
            key={index}
            className={clsx(
              "flex items-center justify-between bg-slate-50/50 px-4 py-3 font-display sm:py-3",
              index !== 0 && "mt-4"
            )}
          >
            <div className="flex items-center">
              <div className="font-display">
                <div className="text-xs font-semibold uppercase text-slate-400">
                  <FormattedMessage id="leaderboard/domain" />
                </div>
                <div className="break-words text-slate-900 sm:text-lg">
                  {id}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <Tooltip
                  direction="left"
                  align="left"
                  label={
                    <p className="text-base font-medium">
                      {universalFormatNumber({ num: clicks, locale })}
                    </p>
                  }
                >
                  <div className="text-right font-display">
                    <div className="text-xs font-semibold uppercase text-slate-400">
                      <FormattedMessage id="leaderboard/clicks" />
                    </div>

                    <div className="text-sm font-semibold text-pink-400 sm:text-base">
                      {bigNumberFormatter(clicks, 0)}
                    </div>
                  </div>
                </Tooltip>
              </div>
              <div>
                <Tooltip
                  direction="left"
                  align="left"
                  label={
                    <p className="text-base font-medium">
                      {universalFormatNumber({ num: impressions, locale })}
                    </p>
                  }
                >
                  <div className="text-right font-display">
                    <div className="text-xs font-semibold uppercase text-slate-400">
                      <FormattedMessage id="leaderboard/impressions" />
                    </div>

                    <div className="text-sm font-semibold text-indigo-400 sm:text-base">
                      {bigNumberFormatter(impressions, 0)}
                    </div>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        ))}
      </div> */
}
