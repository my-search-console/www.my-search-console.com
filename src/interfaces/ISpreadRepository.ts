import {
  LeaderboardWebsitesEntity,
  RankingStatsForFrontend,
} from "../entities/RankingWebsiteEntity"
import { IRepositoryResponse } from "./IApiResponse"

export type StatsResponse = IRepositoryResponse<{
  stats: RankingStatsForFrontend
  websites: Array<LeaderboardWebsitesEntity>
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
}>

export interface ISpreadRepository {
  fetch(params: { from: string; to: string }): Promise<StatsResponse>
  fetchLadder(): Promise<any>
}
