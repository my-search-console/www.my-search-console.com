import { ErrorEntity } from "@my-search-console/interfaces"
import { RankingStatsForFrontend } from "../entities/RankingWebsiteEntity"
import {
  ISpreadRepository,
  StatsResponse,
} from "../interfaces/ISpreadRepository"

export class InMemorySpreadRepository implements ISpreadRepository {
  fetchLadder(): Promise<any> {
    throw new Error("Method not implemented.")
  }
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
    sources_trending_down: [],
    devices_trending_down: [],
    pages: [],
    pages_trending_down: [],
    query_trending_down: [],
    countries_trending_down: [],
    google: [],
    yandex: [],
    bing: [],
  }

  __storeStats(stats: RankingStatsForFrontend) {
    this.stats = stats
  }

  async fetch(params: { from: string; to: string }): Promise<StatsResponse> {
    if (!this.stats) {
      return {
        error: true,
        code: ErrorEntity.WEBSITE_NOT_FOUND,
      }
    }

    return {
      error: false,
      body: {
        stats: this.stats,
        websites: [],
        sources: {
          google: { clicks: 0, impressions: 0, activated: false },
          bing: { clicks: 0, impressions: 0, activated: false },
          yandex: { clicks: 0, impressions: 0, activated: false },
        },
      },
    }
  }
}
