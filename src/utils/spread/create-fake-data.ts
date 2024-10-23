import dayjs from "dayjs"
import { RankingStatEntity } from "../../entities/RankingWebsiteEntity"

function getRandomBetween(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min)
}

const generateDate = (): RankingStatEntity[] => {
  const numberOfDays = 360
  const today = dayjs()

  const arrayOfDays = Array.from({ length: numberOfDays }).map((e, index) => {
    return today.subtract(index, "day")
  })

  return arrayOfDays.map((day, index) => {
    const entity: RankingStatEntity = {
      id: index.toString(),
      fk_website_id: "demo",
      date: day.toDate(),
      clicks: getRandomBetween(10, 40),
      impressions: 10,
      position: 10,
      click_through_rate: 10,
      previous_clicks: 0,
      previous_impressions: 10,
      previous_position: 10,
      previous_click_through_rate: 10,
      query: "",
      device: "unknown",
      country: "",
      source: "yandex",
      page: "",
    }

    return entity
  })
}

const groupByWeeks = (stats: RankingStatEntity[]): RankingStatEntity[] => {
  const weeks = stats.reduce((acc, item) => {
    const week = dayjs(item.date).week()

    if (!acc[week]) {
      acc[week] = []
    }

    acc[week].push(item)
    return acc
  }, [] as Array<RankingStatEntity[]>)

  return weeks
    .reduce((accumulator, week) => {
      accumulator.push(
        week.reduce((acc, day) => {
          return {
            ...day,
            clicks: (acc.clicks || 0) + day.clicks,
          }
        }, {} as RankingStatEntity)
      )

      return accumulator
    }, [] as RankingStatEntity[])
    .sort((a, b) => dayjs(a.date).diff(b.date))
}

export const createFakeDataForSpread = () => {
  return {
    countries: [],
    date: groupByWeeks(generateDate()),
    devices: [],
    global: {
      click_through_rate: 0,
      clicks: 0,
      impressions: 0,
      position: 0,
      previous_clicks: 0,
      previous_click_through_rate: 0,
      previous_impressions: 0,
      previous_position: 0,
    },
    query: [],
    sources: [],
    pages: [],
    yandex: [],
    google: [],
    bing: [],
  }
}
