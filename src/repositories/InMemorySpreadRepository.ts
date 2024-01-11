import { ErrorEntity } from "@foudroyer/interfaces"
import { StatsResponse } from "../interfaces/IWebsitesRepository"
import { RankingStatsForFrontend } from "../entities/RankingWebsiteEntity"
import { ISpreadRepository } from "../interfaces/ISpreadRepository"

export class InMemorySpreadRepository implements ISpreadRepository {
  private stats: RankingStatsForFrontend = {
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
    date: [],
    sources: [],
    devices: [],
    query: [],
    countries: [],
  }

  __storeStats(stats: RankingStatsForFrontend) {
    this.stats = stats
  }

  async fetch(): Promise<StatsResponse> {
    if (!this.stats) {
      return {
        error: true,
        code: ErrorEntity.WEBSITE_NOT_FOUND,
      }
    }

    return {
      error: false,
      body: this.stats,
    }
  }
}
