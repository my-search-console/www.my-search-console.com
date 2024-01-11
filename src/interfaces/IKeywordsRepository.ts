import { RankingStatEntity } from "./../entities/RankingWebsiteEntity"
import { IRepositoryResponse } from "./IApiResponse"

export interface IKeywordsRepository {
  fetch(params: {
    website: string
    filter?: {
      country?: string | null
      device?: "unknown" | "desktop" | "mobile" | "tablet" | null
      source?: "google" | "bing" | "yandex" | null
    }
  }): Promise<IRepositoryResponse<RankingStatEntity[]>>
  create(params: {
    websiteId: string
    keywords: string[]
  }): Promise<IRepositoryResponse<null>>
  delete(params: {
    websiteId: string
    keywords: string[]
  }): Promise<IRepositoryResponse<null>>
}
