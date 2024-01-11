import { WebsiteEntity } from "@foudroyer/interfaces"
import { IRepositoryResponse } from "./IApiResponse"
import {
  RankingStatsForFrontend,
  RankingStatEntity,
} from "../entities/RankingWebsiteEntity"

export type ActivateResponse = IRepositoryResponse<WebsiteEntity>
export type UpdateSitemapResponse = IRepositoryResponse<WebsiteEntity>
export type FetchWebsiteAnalyticsStatusResponse = IRepositoryResponse<{
  is_finished: boolean
}>
export type UpdateCredentialsResponse = IRepositoryResponse<any>
export type FetchResponse = IRepositoryResponse<{
  google: WebsiteEntity[]
  websites: WebsiteEntity[]
}>
export type UpdateIsPublicResponse = IRepositoryResponse<WebsiteEntity>
export type FetchGoogleDomainsResponse = IRepositoryResponse<{ id: string }[]>
export type FetchBingDomainsResponse = IRepositoryResponse<{ id: string }[]>
export type FetchYandexDomainsResponse = IRepositoryResponse<{ id: string }[]>

export type CheckResponseEntity = {
  isCredentialsValid: boolean
  isSitemapValid: boolean
}

export type CheckResponse = IRepositoryResponse<CheckResponseEntity>
export type RefreshSitemapAndIndexationResponse = IRepositoryResponse<{
  success: boolean
}>

export type CreateWebsiteResponse = IRepositoryResponse<WebsiteEntity>
export type CreateWebsiteParams = {
  name: string
  googleDomain: string
  yandexDomain: string | null
  bingDomain: string | null
}

export type StatsResponse = IRepositoryResponse<RankingStatsForFrontend>
export type StatsForHistogramResponse = IRepositoryResponse<RankingStatEntity[]>

export type AddSourceResponse = IRepositoryResponse<WebsiteEntity>
export type DeleteResponse = IRepositoryResponse<null>

export interface IWebsitesRepository {
  addSource(params: {
    websiteId: string
    type: "yandex" | "bing"
    url: string
  }): Promise<AddSourceResponse>
  updateCredentials(params: {
    website: string
    credentials: string
  }): Promise<UpdateCredentialsResponse>
  refreshSitemapAndIndexation(params: {
    websiteId: string
  }): Promise<RefreshSitemapAndIndexationResponse>
  check(params: { website: string }): Promise<CheckResponse>
  updateIsPublic(params: {
    websiteId: string
    isPublic: boolean
  }): Promise<UpdateIsPublicResponse>
  fetch(params?: { websiteId: string }): Promise<FetchResponse>
  activate(domain: string): Promise<ActivateResponse>
  updateSitemap(params: {
    website: string
    sitemap: string
  }): Promise<UpdateSitemapResponse>

  fetchWebsiteAnalyticsStatus(params: {
    websiteId: string
  }): Promise<FetchWebsiteAnalyticsStatusResponse>

  fetch(): Promise<FetchResponse>
  delete(params: { websiteId: string }): Promise<DeleteResponse>
  fetchGoogleDomains(): Promise<FetchGoogleDomainsResponse>
  fetchBingDomains(): Promise<FetchBingDomainsResponse>
  fetchYandexDomains(): Promise<FetchYandexDomainsResponse>
  fetchStats(params: {
    website: string
    isPublic?: boolean
    filter?: {
      source: string | null
      query: string | null
      device: string | null
      country: string | null
      from: Date | string
      to: Date | string
    }
    orderBy?:
      | "clicks"
      | "impressions"
      | "position"
      | "click_through_rate"
      | null
  }): Promise<StatsResponse>
  fetchStatsHistogram(params: {
    website: string
    filter?: {
      source: string | null
      query: string | null
      device: string | null
      country: string | null
      from: Date | string
      to: Date | string
    }
    page: number
    type: "device" | "source" | "query" | "country"
    orderBy?:
      | "clicks"
      | "impressions"
      | "position"
      | "click_through_rate"
      | null
  }): Promise<StatsForHistogramResponse>
}
