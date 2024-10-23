import {
  ErrorEntity,
  UserEntity,
  WebsiteEntity,
} from "@my-search-console/interfaces"
import { uniqWith } from "ramda"
import {
  RankingStatEntity,
  RankingStatsForFrontend,
} from "../entities/RankingWebsiteEntity"
import {
  ActivateResponse,
  AddSourceResponse,
  AddUserToWebsiteResponse,
  CheckResponse,
  CheckResponseEntity,
  DeleteResponse,
  FetchGoogleDomainsResponse,
  FetchResponse,
  FetchWebsiteAnalyticsStatusResponse,
  IWebsitesRepository,
  RefreshSitemapAndIndexationResponse,
  StatsForHistogramRequest,
  StatsForHistogramResponse,
  StatsResponse,
  UpdateCredentialsResponse,
  UpdateSitemapResponse,
} from "../interfaces/IWebsitesRepository"

export class InMemoryWebsitesRepository implements IWebsitesRepository {
  private websites: WebsiteEntity[] = []
  private users: UserEntity[] = []

  private checkResponses: { [x: string]: CheckResponseEntity } = {}
  private updateCredentialsResponses: {
    [x: string]: UpdateCredentialsResponse
  } = {}
  private updateSitemapResponses: { [x: string]: UpdateSitemapResponse } = {}

  reset(params: { websiteId: string }): Promise<ActivateResponse> {
    throw new Error("Method not implemented.")
  }

  async store(website: WebsiteEntity) {
    this.websites = uniqWith<WebsiteEntity, WebsiteEntity>(
      (a, b) => a.id === b.id
    )([...this.websites, website])

    return website
  }

  async removeUserToWebsite(params: {
    websiteId: string
    email: string
  }): Promise<AddUserToWebsiteResponse> {
    this.users = this.users.filter(({ email }) => {
      return params.email !== email
    })

    return {
      error: false,
      body: { success: true },
    }
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

  __updateSitemapResponse(params: {
    website: string
    response: UpdateSitemapResponse
  }) {
    this.updateSitemapResponses[params.website] = params.response
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

  async fetchStatsHistogram(
    params: StatsForHistogramRequest
  ): Promise<StatsForHistogramResponse> {
    return {
      error: false,
      body: this.statsForHistogram[params.type],
    }
  }
}
