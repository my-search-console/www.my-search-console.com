import { RankingStatEntity } from "../entities/RankingWebsiteEntity"
import { RoastWithReportEntity } from "../entities/RoastEntity"
import { IRepositoryResponse } from "../interfaces/IApiResponse"
import { IKeywordsRepository } from "../interfaces/IKeywordsRepository"
import {
  FetchRoastResponse,
  IRoastRepository,
  RoastRefreshResponse,
  RoastRoastResponse,
} from "../interfaces/IRoastRepository"
import { ApiService } from "../services/ApiService"
import dayjs from "dayjs"

export class ApiRoastRepository implements IRoastRepository {
  constructor(private apiService: ApiService) {}

  async fetchWebsites(): Promise<FetchRoastResponse> {
    const response = await this.apiService.get<RoastWithReportEntity[]>(
      `/roast`
    )

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }
    return {
      error: false,
      body: { websites: response.data },
    }
  }

  async roast(): Promise<RoastRoastResponse> {
    const response = await this.apiService.post<RoastWithReportEntity[]>(
      `/roast`,
      {}
    )

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }
    return {
      error: false,
      body: { websites: response.data },
    }
  }

  refresh(params: { websiteId: string }): Promise<RoastRefreshResponse> {
    throw new Error("Method not implemented.")
  }

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
