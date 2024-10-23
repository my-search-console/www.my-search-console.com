import dayjs from "dayjs"
import { getFiltersFromUrl } from "./getFiltersFromUrl"

const getDayInterval = (params: { from: Date | string; to: Date | string }) => {
  const from = dayjs(params.from)
  const to = dayjs(params.to)

  return Math.max(1, Math.abs(from.diff(to, "days")))
}

export const getMonthInterval = (params: {
  from: Date | string
  to: Date | string
}) => {
  const from = dayjs(params.from)
  const to = dayjs(params.to)

  return Math.max(1, Math.round(Math.abs(from.diff(to, "days")) / 30))
}

const isAfterToday = (date: Date | dayjs.Dayjs) => {
  if (dayjs(date).isAfter(dayjs())) return true
  if (dayjs(date).isSame(dayjs())) return true
  return false
}

const moveDayInterval = (params: {
  from: Date | string
  to: Date | string
  direction: "future" | "past"
}) => {
  const intervale = getDayInterval(params)
  const method = params.direction === "past" ? "subtract" : "add"

  if (dayjs(params.to)[method](intervale, "days").isAfter(dayjs())) {
    const to = dayjs().subtract(4, "days").format("YYYY-MM-DD")
    const from = dayjs()
      .subtract(intervale + 4, "days")
      .format("YYYY-MM-DD")

    return { to, from }
  }

  return {
    from: dayjs(params.from)[method](intervale, "days").format("YYYY-MM-DD"),
    to: dayjs(params.to)[method](intervale, "days").format("YYYY-MM-DD"),
  }
}

const moveMonthInterval = (params: {
  from: Date | string
  to: Date | string
  direction: "future" | "past"
}) => {
  const intervale = getMonthInterval(params)
  const method = params.direction === "past" ? "subtract" : "add"

  if (dayjs(params.to)[method](intervale, "month").isAfter(dayjs())) {
    const to = dayjs().subtract(4, "days").format("YYYY-MM-DD")
    const from = dayjs().subtract(intervale, "month").format("YYYY-MM-DD")

    return { to, from }
  }

  const from = dayjs(params.from)
    [method](intervale, "month")
    .startOf("month")
    .format("YYYY-MM-DD")

  const to = dayjs(params.to)
    [method](intervale, "month")
    .endOf("month")
    .format("YYYY-MM-DD")

  return {
    from,
    to,
  }
}

export const moveDate = (params: {
  url: string
  direction: "past" | "future"
  period?: "month" | string
}) => {
  const { from, to } = getFiltersFromUrl({
    url: params.url,
  })

  if (params.period === "month")
    return moveMonthInterval({
      direction: params.direction,
      from,
      to,
    })

  return moveDayInterval({ from, to, direction: params.direction })
}
