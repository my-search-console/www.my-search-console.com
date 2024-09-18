import {
  ErrorEntity,
  UserEntity,
  UserWithRoleEntity,
  WebsiteEntity,
} from "@foudroyer/interfaces"
import { SitemapEntity } from "../entities/SitemapEntity"
import {
  ActivateResponse,
  AddSourceResponse,
  AddUserToWebsiteResponse,
  CheckResponse,
  CreateWebsiteParams,
  CreateWebsiteResponse,
  DeleteResponse,
  FetchBingDomainsResponse,
  FetchGoogleDomainsResponse,
  FetchResponse,
  FetchWebsiteAnalyticsStatusResponse,
  FetchYandexDomainsResponse,
  GetUsersFromWebsiteResponse,
  IWebsitesRepository,
  RefreshSitemapAndIndexationResponse,
  SitemapsDeleteResponse,
  SitemapsFetchAllResponse,
  StatsForHistogramResponse,
  StatsResponse,
  UpdateCredentialsResponse,
  UpdateIsPublicResponse,
  UpdateSitemapResponse,
} from "../interfaces/IWebsitesRepository"
import { ApiService } from "../services/ApiService"

export class ApiWebsitesRepository implements IWebsitesRepository {
  constructor(private apiService: ApiService) {}

  /**
   *
   *
   * SITEMAP
   *
   *
   */

  async SitemapsFetchAll(params: {
    websiteId: string
  }): Promise<SitemapsFetchAllResponse> {
    try {
      const response = await this.apiService.post<{
        sitemaps: SitemapEntity[]
      }>(`/sitemap/fetch-all`, {
        websiteId: params.websiteId,
      })

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: { sitemaps: response.data.sitemaps } }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  async SitemapsDelete(params: {
    websiteId: string
    id: SitemapEntity["id"]
  }): Promise<SitemapsDeleteResponse> {
    try {
      const response = await this.apiService.delete<{}>(`/sitemap/delete`, {
        websiteId: params.websiteId,
        id: params.id,
      })

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: {} }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  /**
   *
   *
   * ====================================================================
   *
   *
   */

  async addUserToWebsite(params: {
    websiteId: string
    email: string
  }): Promise<AddUserToWebsiteResponse> {
    try {
      const response = await this.apiService.post<UserEntity>(
        `/websites/add-user`,
        {
          websiteId: params.websiteId,
          email: params.email,
        }
      )

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: { success: true } }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  async removeUserToWebsite(params: {
    websiteId: string
    email: string
  }): Promise<AddUserToWebsiteResponse> {
    try {
      const response = await this.apiService.delete<UserEntity>(
        `/websites/remove-user`,
        {
          websiteId: params.websiteId,
          email: params.email,
        }
      )

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: { success: true } }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  async getUsersFromWebsite(params: {
    websiteId: string
  }): Promise<GetUsersFromWebsiteResponse> {
    try {
      const response = await this.apiService.post<{
        users: UserWithRoleEntity[]
      }>(`/websites/get-users`, {
        websiteId: params.websiteId,
      })

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data.users }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  async delete(params: { websiteId: string }): Promise<DeleteResponse> {
    try {
      const response = await this.apiService.delete(`/websites`, {
        websiteId: params.websiteId,
      })

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: null }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

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

  async fetch(params?: { websiteId?: string }): Promise<FetchResponse> {
    try {
      const endpoint = params?.websiteId
        ? `/websites/public/${params.websiteId}`
        : "/websites"

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

  async create(params: CreateWebsiteParams): Promise<CreateWebsiteResponse> {
    try {
      const response = await this.apiService.post<any>(
        `/ranking/websites`,
        params
      )

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

  async fetchYandexDomains(): Promise<FetchYandexDomainsResponse> {
    try {
      const response = await this.apiService.get<{ id: string }[]>(
        `/ranking/websites/yandex`
      )

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  async fetchBingDomains(): Promise<FetchBingDomainsResponse> {
    try {
      const response = await this.apiService.get<{ id: string }[]>(
        `/ranking/websites/bing`
      )

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  private async updateCredentialsRequest(params: {
    website: string
    credentials: string
  }): Promise<UpdateCredentialsResponse> {
    const response = await this.apiService.put<void>(
      "/websites/update-google-cloud-api",
      {
        key: params.credentials,
        websiteId: params.website,
      }
    )

    if (response.data.statusCode === 400)
      return { error: true, code: response.data.message }

    return { error: false, body: response.data }
  }

  async updateCredentials(params: {
    website: string
    credentials: string
  }): Promise<UpdateCredentialsResponse> {
    try {
      return await this.updateCredentialsRequest(params)
    } catch (error) {
      try {
        return await this.updateCredentialsRequest(params)
      } catch (error) {
        return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
      }
    }
  }

  async check(params: { website: string }): Promise<CheckResponse> {
    try {
      const response = await this.apiService.get<{
        isCredentialsValid: boolean
        isSitemapValid: boolean
      }>(`/websites/check?website=${params.website}`)

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  async refreshSitemapAndIndexation(params: {
    websiteId: string
  }): Promise<RefreshSitemapAndIndexationResponse> {
    try {
      const response = await this.apiService.post<{
        success: boolean
      }>(`/sitemap/sync`, {
        websiteId: params.websiteId,
      })

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  async activate(domain: string): Promise<ActivateResponse> {
    try {
      const response = await this.apiService.post<WebsiteEntity>(`/websites`, {
        searchConsoleDomain: domain,
      })

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  async reset(params: { websiteId: string }): Promise<ActivateResponse> {
    try {
      const response = await this.apiService.post<WebsiteEntity>(
        `/websites/reset`,
        {
          websiteId: params.websiteId,
        }
      )

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  async activateAnalytics(params: {
    websiteId: string
  }): Promise<ActivateResponse> {
    try {
      const response = await this.apiService.post<WebsiteEntity>(
        `/websites/set-analytics-activated`,
        {
          websiteId: params.websiteId,
        }
      )

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  async updateSitemap(params: {
    website: string
    sitemap: string
  }): Promise<UpdateSitemapResponse> {
    try {
      const response = await this.apiService.put<WebsiteEntity>(`/sitemap`, {
        sitemap: params.sitemap,
        websiteId: params.website,
      })

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  async addSource(params: {
    websiteId: string
    type: "yandex" | "bing"
    url: string
  }): Promise<AddSourceResponse> {
    try {
      const response = await this.apiService.put<WebsiteEntity>(
        `/websites/sources`,
        {
          type: params.type,
          value: params.url,
          websiteId: params.websiteId,
        }
      )

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  async fetchAllWebsitesSettings(): Promise<any> {
    try {
      const response = await this.apiService.get<WebsiteEntity[]>(
        `/websites/all-websites-settings`
      )

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }
}
