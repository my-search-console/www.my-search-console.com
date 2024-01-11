import { ErrorEntity, WebsiteEntity } from "@foudroyer/interfaces"
import { uniqWith } from "ramda"
import {
  CreateWebsiteParams,
  CreateWebsiteResponse,
  FetchBingDomainsResponse,
  FetchGoogleDomainsResponse,
  FetchResponse,
  FetchYandexDomainsResponse,
  IWebsitesRepository,
  StatsForHistogramResponse,
  StatsResponse,
  ActivateResponse,
  CheckResponse,
  CheckResponseEntity,
  RefreshSitemapAndIndexationResponse,
  UpdateCredentialsResponse,
  UpdateSitemapResponse,
  AddSourceResponse,
  FetchWebsiteAnalyticsStatusResponse,
  DeleteResponse,
  UpdateIsPublicResponse,
} from "../interfaces/IWebsitesRepository"
import {
  RankingStatEntity,
  RankingStatsForFrontend,
} from "../entities/RankingWebsiteEntity"

export class InMemoryWebsitesRepository implements IWebsitesRepository {
  updateIsPublic(params: {
    websiteId: string
    isPublic: boolean
  }): Promise<UpdateIsPublicResponse> {
    throw new Error("Method not implemented.")
  }
  private websites: WebsiteEntity[] = []

  private checkResponses: { [x: string]: CheckResponseEntity } = {}
  private updateCredentialsResponses: {
    [x: string]: UpdateCredentialsResponse
  } = {}
  private updateSitemapResponses: { [x: string]: UpdateSitemapResponse } = {}

  async store(website: WebsiteEntity) {
    this.websites = uniqWith<WebsiteEntity, WebsiteEntity>(
      (a, b) => a.id === b.id
    )([...this.websites, website])

    return website
  }

  async fetchWebsiteAnalyticsStatus(params: {
    websiteId: string
  }): Promise<FetchWebsiteAnalyticsStatusResponse> {
    return {
      error: false,
      body: {
        is_finished: true,
      },
    }
  }

  async delete(params: { websiteId: string }): Promise<DeleteResponse> {
    this.websites = this.websites.filter(({ id }) => id !== params.websiteId)

    return {
      error: false,
      body: null,
    }
  }

  async check(params: { website: string }): Promise<CheckResponse> {
    const found = this.checkResponses[params.website]

    console.log(params.website)

    if (!found)
      return {
        error: false,
        body: { isCredentialsValid: true, isSitemapValid: true },
      }

    return { error: false, body: this.checkResponses[params.website] }
  }

  __checkResponse(params: { website: string; response: CheckResponseEntity }) {
    this.checkResponses[params.website] = params.response
  }

  async remove(id: WebsiteEntity["id"]) {
    this.websites = this.websites.filter((website) => website.id !== id)
  }

  private fetchResponse: FetchResponse | null = null

  __setFetchResponse(response: FetchResponse) {
    this.fetchResponse = response
  }

  async fetch(): Promise<FetchResponse> {
    if (this.fetchResponse) return this.fetchResponse

    return {
      error: false,
      body: {
        websites: this.websites,
        google: [],
      },
    }
  }

  async addSource(params: {
    websiteId: string
    type: "yandex" | "bing"
    url: string
  }): Promise<AddSourceResponse> {
    this.websites = this.websites.map((website) => {
      if (website.id !== params.websiteId) return website
      if (params.type === "yandex")
        return { ...website, yandex_domain: params.url }
      if (params.type === "bing") return { ...website, bing_domain: params.url }
      return website
    })

    return {
      error: false,
      body: this.websites.find(
        ({ id }) => params.websiteId === id
      ) as WebsiteEntity,
    }
  }

  async activate(domain: string): Promise<ActivateResponse> {
    if (domain === "should_return_error_on_activate")
      return {
        error: true,
        code: ErrorEntity.UNKNOWN_ERROR,
      }

    const entity: WebsiteEntity = {
      already_activated: true,
      id: domain.replace("google:", ""),
      search_console_domain: domain,
      yandex_domain: null,
      bing_domain: null,
      image: "",
      sitemap: null,
      index_now_key: null,
      index_now_installed: false,
      is_premium: false,
      is_analytics_activated: false,
      sitemap_updated_at: new Date(),
      deleted_at: null,
      is_public: false,
      indexation_auto_activated: false,
      indexation_auto_activated_sources: [],
      google_api_keys: [],
    }

    this.websites.push(entity)

    return { body: entity, error: false }
  }

  __updateSitemapResponse(params: {
    website: string
    response: UpdateSitemapResponse
  }) {
    this.updateSitemapResponses[params.website] = params.response
  }

  async updateSitemap(params: {
    website: string
    sitemap: string
  }): Promise<UpdateSitemapResponse> {
    if (this.updateSitemapResponses[params.website]) {
      return this.updateSitemapResponses[params.website]
    }

    this.websites = this.websites.map((website) => ({
      ...website,
      sitemap: params.website === website.id ? params.sitemap : website.sitemap,
    }))

    const website = this.websites.find(
      (website) => website.id === params.website
    )

    if (!website) {
      return {
        error: true,
        code: ErrorEntity.WEBSITE_NOT_FOUND,
      }
    }

    return {
      error: false,
      body: website,
    }
  }

  __updateCredentialsResponse(params: {
    website: string
    response: UpdateCredentialsResponse
  }) {
    this.updateCredentialsResponses[params.website] = params.response
  }

  async updateCredentials(params: {
    website: string
    credentials: string
  }): Promise<UpdateCredentialsResponse> {
    if (!this.updateCredentialsResponses[params.website])
      return {
        error: true,
        code: ErrorEntity.WEBSITE_NOT_FOUND,
      }

    return this.updateCredentialsResponses[params.website]
  }

  async refreshSitemapAndIndexation(params: {
    websiteId: string
  }): Promise<RefreshSitemapAndIndexationResponse> {
    return { error: false, body: { success: true } }
  }

  private stats: Map<string, RankingStatsForFrontend> = new Map()
  private statsForHistogram: {
    country: RankingStatEntity[]
    device: RankingStatEntity[]
    query: RankingStatEntity[]
    source: RankingStatEntity[]
  } = {
    country: [],
    device: [],
    query: [],
    source: [],
  }

  async create(params: CreateWebsiteParams): Promise<CreateWebsiteResponse> {
    const entity: WebsiteEntity = {
      id: Date.now().toString(),
      search_console_domain: params.googleDomain,
      image: "",
      sitemap: null,
      already_activated: false,
      yandex_domain: null,
      bing_domain: null,
      index_now_key: null,
      index_now_installed: false,
      is_premium: false,
      is_analytics_activated: false,
      // @ts-ignore
      is_analytics_sync_done: false,
      ...params,
    }

    return {
      error: false,
      body: entity,
    }
  }

  __storeStats(websiteId: string, stats: RankingStatsForFrontend) {
    this.stats.set(websiteId, stats)
  }

  __storeStatsHistogram(
    stats: RankingStatEntity[],
    type: "device" | "query" | "country" | "source"
  ) {
    this.statsForHistogram[type] = stats
  }

  async fetchStats(params: {
    website: string
    filter?:
      | {
          source: string | null
          query: string | null
          device: string | null
          country: string | null
          from: string | Date
          to: string | Date
        }
      | undefined
  }): Promise<StatsResponse> {
    const stats = this.stats.get(params.website)

    if (!stats) {
      return {
        error: true,
        code: ErrorEntity.WEBSITE_NOT_FOUND,
      }
    }

    return {
      error: false,
      body: stats,
    }
  }

  private googleDomains: { id: string }[] = []

  __storeFetchGoogleDomainsResponse(domains: typeof this.googleDomains) {
    this.googleDomains = domains
  }

  async fetchGoogleDomains(): Promise<FetchGoogleDomainsResponse> {
    return {
      error: false,
      body: this.googleDomains,
    }
  }

  private yandexDomains: { id: string }[] = []

  __storeFetchYandexDomainsResponse(domains: typeof this.yandexDomains) {
    this.yandexDomains = domains
  }

  async fetchYandexDomains(): Promise<FetchYandexDomainsResponse> {
    return {
      error: false,
      body: this.yandexDomains,
    }
  }

  private bingDomains: { id: string }[] = []

  __storeFetchBingDomainsResponse(domains: typeof this.bingDomains) {
    this.bingDomains = domains
  }

  async fetchBingDomains(): Promise<FetchBingDomainsResponse> {
    return {
      error: false,
      body: this.bingDomains,
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
        }
      | undefined
    page: number
    type: "device" | "source" | "query" | "country"
  }): Promise<StatsForHistogramResponse> {
    return {
      error: false,
      body: this.statsForHistogram[params.type],
    }
  }
}
