import { RankingStatEntity } from "../entities/RankingWebsiteEntity"
import { IRepositoryResponse } from "../interfaces/IApiResponse"
import { IKeywordsRepository } from "../interfaces/IKeywordsRepository"

export class InMemoryKeywordsRepository implements IKeywordsRepository {
  private keywords: Map<string, RankingStatEntity> = new Map()
  private createId(
    websiteId: string,
    keyword: string,
    filter?: {
      country?: string | null
      device?: "unknown" | "desktop" | "mobile" | "tablet" | null
      source?: "google" | "bing" | "yandex" | null
    }
  ) {
    return (
      websiteId +
      "/" +
      keyword +
      "/" +
      (filter?.source || null) +
      "/" +
      (filter?.device || null) +
      "/" +
      (filter?.country || null)
    )
  }

  async fetch(params: {
    website: string
    filter?: {
      country?: string | null
      device?: "unknown" | "desktop" | "mobile" | "tablet" | null
      source?: "google" | "bing" | "yandex" | null
    }
  }): Promise<IRepositoryResponse<RankingStatEntity[]>> {
    return {
      error: false,
      body: Array.from(this.keywords.values())
        .filter(
          (keyword) =>
            keyword.id ===
            this.createId(params.website, keyword.query, params.filter)
        )
        .sort((a, b) => a.position - b.position),
    }
  }

  async create(params: {
    websiteId: string
    keywords: string[]
    filter?: {
      country?: string | null
      device?: "unknown" | "desktop" | "mobile" | "tablet" | null
      source?: "google" | "bing" | "yandex" | null
    }
  }): Promise<IRepositoryResponse<null>> {
    for (const keyword of params.keywords) {
      this.keywords.set(
        this.createId(params.websiteId, keyword, params.filter),
        {
          id: this.createId(params.websiteId, keyword, params.filter),
          fk_website_id: params.websiteId,
          date: new Date(),
          clicks: 13,
          impressions: 20,
          position: Math.random() * 100 + 1,
          click_through_rate: 0.5,
          previous_clicks: 15,
          previous_impressions: 30,
          previous_position: Math.random() * 100 + 1,
          previous_click_through_rate: 1,
          query: keyword,
          device: params.filter?.device ?? "desktop",
          country: params.filter?.country ?? "world",
          source: params.filter?.source ?? "google",
        }
      )
    }

    return {
      error: false,
      body: null,
    }
  }

  async delete(params: {
    websiteId: string
    keywords: string[]
  }): Promise<IRepositoryResponse<null>> {
    for (const keyword of params.keywords) {
      this.keywords.delete(this.createId(params.websiteId, keyword))
    }
    return {
      error: false,
      body: null,
    }
  }
}
