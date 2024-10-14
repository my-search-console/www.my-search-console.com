export interface RankingStatEntity {
  id: string
  fk_website_id: string
  date: Date | string
  clicks: number
  impressions: number
  position: number
  click_through_rate: number
  previous_clicks: number
  previous_impressions: number
  previous_position: number
  previous_click_through_rate: number
  query: string
  device: "desktop" | "mobile" | "tablet" | "unknown"
  country: string
  source: "google" | "bing" | "yandex"
  page: string
}

export type RankingOrderByType =
  | "clicks"
  | "impressions"
  | "position"
  | "click_through_rate"

export interface RankingStatsForFrontend {
  global: Pick<
    RankingStatEntity,
    | "click_through_rate"
    | "clicks"
    | "impressions"
    | "position"
    | "previous_clicks"
    | "previous_click_through_rate"
    | "previous_impressions"
    | "previous_position"
  >
  date: Array<
    Pick<
      RankingStatEntity,
      | "date"
      | "click_through_rate"
      | "clicks"
      | "impressions"
      | "position"
      | "previous_clicks"
      | "previous_click_through_rate"
      | "previous_impressions"
      | "previous_position"
    >
  >
  sources: Array<
    Pick<
      RankingStatEntity,
      | "click_through_rate"
      | "clicks"
      | "source"
      | "impressions"
      | "position"
      | "previous_clicks"
      | "previous_click_through_rate"
      | "previous_impressions"
      | "previous_position"
    >
  >
  devices: Array<
    Pick<
      RankingStatEntity,
      | "click_through_rate"
      | "clicks"
      | "device"
      | "impressions"
      | "position"
      | "previous_clicks"
      | "previous_click_through_rate"
      | "previous_impressions"
      | "previous_position"
    >
  >
  pages: Array<
    Pick<
      RankingStatEntity,
      | "click_through_rate"
      | "clicks"
      | "page"
      | "impressions"
      | "position"
      | "previous_clicks"
      | "previous_click_through_rate"
      | "previous_impressions"
      | "previous_position"
    >
  >
  query: Array<
    Pick<
      RankingStatEntity,
      | "click_through_rate"
      | "clicks"
      | "query"
      | "impressions"
      | "position"
      | "previous_clicks"
      | "previous_click_through_rate"
      | "previous_impressions"
      | "previous_position"
    >
  >
  countries: Array<
    Pick<
      RankingStatEntity,
      | "click_through_rate"
      | "clicks"
      | "country"
      | "impressions"
      | "position"
      | "previous_clicks"
      | "previous_click_through_rate"
      | "previous_impressions"
      | "previous_position"
    >
  >
  google: Array<
    Pick<
      RankingStatEntity,
      | "date"
      | "click_through_rate"
      | "clicks"
      | "impressions"
      | "position"
      | "previous_clicks"
      | "previous_click_through_rate"
      | "previous_impressions"
      | "previous_position"
    >
  >
  yandex: Array<
    Pick<
      RankingStatEntity,
      | "date"
      | "click_through_rate"
      | "clicks"
      | "impressions"
      | "position"
      | "previous_clicks"
      | "previous_click_through_rate"
      | "previous_impressions"
      | "previous_position"
    >
  >
  bing: Array<
    Pick<
      RankingStatEntity,
      | "date"
      | "click_through_rate"
      | "clicks"
      | "impressions"
      | "position"
      | "previous_clicks"
      | "previous_click_through_rate"
      | "previous_impressions"
      | "previous_position"
    >
  >
}

export interface LeaderboardWebsitesEntity {
  id: string
  clicks: number
  impressions: number
}
