import { RankingStatsForFrontend } from "../entities/RankingWebsiteEntity"
import { IRepositoryResponse } from "./IApiResponse"

export type StatsResponseBody = {
  stats: RankingStatsForFrontend
  websites: Array<{
    id: string
    clicks: number
    impressions: number
    timeline: RankingStatsForFrontend["date"]
  }>
  sources: {
    google: {
      clicks: number
      impressions: number
      activated: boolean
    }
    bing: {
      clicks: number
      impressions: number
      activated: boolean
    }
    yandex: {
      clicks: number
      impressions: number
      activated: boolean
    }
  }
}
export type StatsResponse = IRepositoryResponse<StatsResponseBody>

export interface ISpreadRepository {
  fetch(params: { from: string; to: string }): Promise<StatsResponse>
}
