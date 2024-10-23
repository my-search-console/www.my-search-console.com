import { WebsiteEntity } from "@my-search-console/interfaces"
import {
  RankingStatEntity,
  RankingStatsForFrontend,
} from "../entities/RankingWebsiteEntity"
import { IRepositoryResponse } from "./IApiResponse"

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
export type AddUserToWebsiteResponse = IRepositoryResponse<{
  success: boolean
}>

export type StatsResponse = IRepositoryResponse<RankingStatsForFrontend>

export type AddSourceResponse = IRepositoryResponse<WebsiteEntity>
export type DeleteResponse = IRepositoryResponse<null>

export type StatsForHistogramRequest = {
  website: string
  filter?: {
    source: string | null
    query: string | null
    device: string | null
    country: string | null
    page: string | null
    from: Date | string
    to: Date | string
  }
  page: number
  type: "device" | "source" | "query" | "country" | "page"
  orderBy?: "clicks" | "impressions" | "position" | "click_through_rate" | null
}
export type StatsForHistogramResponse = IRepositoryResponse<RankingStatEntity[]>

export interface IWebsitesRepository {
  fetch(params?: { websiteId: string }): Promise<FetchResponse>
  fetchGoogleDomains(): Promise<FetchGoogleDomainsResponse>
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
      page: string | null
    }
    orderBy?:
      | "clicks"
      | "impressions"
      | "position"
      | "click_through_rate"
      | null
  }): Promise<StatsResponse>
  fetchStatsHistogram(
    params: StatsForHistogramRequest
  ): Promise<StatsForHistogramResponse>
}
