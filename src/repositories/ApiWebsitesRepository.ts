import { ErrorEntity, WebsiteEntity } from "@my-search-console/interfaces"
import {
  FetchGoogleDomainsResponse,
  FetchResponse,
  FetchWebsiteAnalyticsStatusResponse,
  IWebsitesRepository,
  StatsForHistogramResponse,
  StatsResponse,
  UpdateIsPublicResponse,
} from "../interfaces/IWebsitesRepository"
import { ApiService } from "../services/ApiService"

export class ApiWebsitesRepository implements IWebsitesRepository {
  constructor(private apiService: ApiService) {}

  async fetchStats(params: {
    website: string
    filter?: {
      source: string | null
      query: string | null
      device: string | null
      page: string | null
      country: string | null
      from: string | Date
      to: string | Date
    }
    isPublic?: boolean
    orderBy?:
      | "clicks"
      | "impressions"
      | "position"
      | "click_through_rate"
      | null
  }): Promise<StatsResponse> {
    try {
      const response = await this.apiService.post<any>(
        `/ranking/stats${params.isPublic ? "/public" : ""}`,
        {
          websiteId: params.website,
          filter: params.filter,
          orderBy: params.orderBy,
        }
      )

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  async fetchStatsHistogram(params: {
    website: string
    filter?:
      | {
          source: string | null
          query: string | null
          device: string | null
          country: string | null
          from: string | Date
          to: string | Date
          page: string | null
        }
      | undefined
    page: number
    type: "source" | "device" | "query" | "country" | "page"
    orderBy?:
      | "clicks"
      | "impressions"
      | "position"
      | "click_through_rate"
      | null
  }): Promise<StatsForHistogramResponse> {
    try {
      const response = await this.apiService.post<any>(
        `/ranking/stats/byHistogram`,
        {
          websiteId: params.website,
          filter: params.filter,
          type: params.type,
          page: params.page,
          orderBy: params.orderBy,
        }
      )

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  async fetch(): Promise<FetchResponse> {
    try {
      const endpoint = "/websites"

      const response = await this.apiService.get<{
        google: WebsiteEntity[]
        websites: WebsiteEntity[]
      }>(endpoint)

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  async updateIsPublic(params: {
    websiteId: string
    isPublic: boolean
  }): Promise<UpdateIsPublicResponse> {
    try {
      const endpoint = `/websites/setpublic`
      const response = await this.apiService.put<WebsiteEntity>(endpoint, {
        websiteId: params.websiteId,
        is_public: params.isPublic,
      })

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  async fetchWebsiteAnalyticsStatus(params: {
    websiteId: string
  }): Promise<FetchWebsiteAnalyticsStatusResponse> {
    try {
      const response = await this.apiService.post<{
        is_finished: boolean
      }>(`/ranking/stats/status`, {
        websiteId: params.websiteId,
      })

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  async fetchGoogleDomains(): Promise<FetchGoogleDomainsResponse> {
    try {
      const response = await this.apiService.get<{ id: string }[]>(
        `/websites/google`
      )

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }
}
