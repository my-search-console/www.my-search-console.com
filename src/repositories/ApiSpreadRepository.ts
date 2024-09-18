import { ErrorEntity } from "@foudroyer/interfaces"
import { RankingStatsForFrontend } from "../entities/RankingWebsiteEntity"
import { ISpreadRepository } from "../interfaces/ISpreadRepository"
import { StatsResponse } from "../interfaces/IWebsitesRepository"
import { ApiService } from "../services/ApiService"

export class ApiSpreadRepository implements ISpreadRepository {
  constructor(private apiService: ApiService) {}

  async fetch(): Promise<StatsResponse> {
    try {
      const response = await this.apiService.get<RankingStatsForFrontend>(
        `/spread`
      )

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  async fetchLadder(): Promise<any> {
    try {
      const response = await this.apiService.get<any>(`/spread/leaderboard`)

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }
}
