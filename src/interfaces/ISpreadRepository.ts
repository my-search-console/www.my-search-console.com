import { IRepositoryResponse } from "./IApiResponse"
import { RankingStatsForFrontend } from "../entities/RankingWebsiteEntity"

export type StatsResponse = IRepositoryResponse<RankingStatsForFrontend>

export interface ISpreadRepository {
  fetch(): Promise<StatsResponse>
}
