import { RankingStatEntity } from "../entities/RankingWebsiteEntity"
import { IRepositoryResponse } from "../interfaces/IApiResponse"
import { IKeywordsRepository } from "../interfaces/IKeywordsRepository"
import { ApiService } from "../services/ApiService"
import dayjs from "dayjs"

export class ApiKeywordsRepository implements IKeywordsRepository {
  constructor(private apiService: ApiService) {}
  async fetch(params: {
    website: string
    filter?: {
      country?: string | null
      device?: "unknown" | "desktop" | "mobile" | "tablet" | null
      source?: "google" | "bing" | "yandex" | null
    }
  }): Promise<IRepositoryResponse<RankingStatEntity[]>> {
    const response = await this.apiService.post<RankingStatEntity[]>(
      `/keywords`,
      {
        websiteId: params.website,
        filter: {
          ...(params.filter || {}),
          from: dayjs().subtract(11, "days").toDate(),
          to: dayjs().subtract(4, "days").toDate(),
        },
      }
    )

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }
    return {
      error: false,
      body: response.data,
    }
  }

  async create(params: {
    websiteId: string
    keywords: string[]
  }): Promise<IRepositoryResponse<null>> {
    const response = await this.apiService.post<null>(`/keywords/create`, {
      websiteId: params.websiteId,
      keywords: params.keywords,
    })
    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
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
    const response = await this.apiService.delete<null>(`/keywords`, {
      websiteId: params.websiteId,
      keywords: params.keywords,
    })
    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }
    return {
      error: false,
      body: null,
    }
  }
}
