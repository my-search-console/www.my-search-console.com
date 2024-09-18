import { UserWithRoleEntity, WebsiteEntity } from "@foudroyer/interfaces"
import {
  RankingStatEntity,
  RankingStatsForFrontend,
} from "../entities/RankingWebsiteEntity"
import { SitemapEntity } from "../entities/SitemapEntity"
import { IRepositoryResponse } from "./IApiResponse"

export type ActivateResponse = IRepositoryResponse<WebsiteEntity>
export type UpdateSitemapResponse = IRepositoryResponse<WebsiteEntity>
export type GetUsersFromWebsiteResponse = IRepositoryResponse<
  UserWithRoleEntity[]
>
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

/**
 *
 *
 * SITEMAP
 *
 *
 */

export type SitemapsFetchAllResponse = IRepositoryResponse<{
  sitemaps: SitemapEntity[]
}>

export type SitemapsDeleteResponse = IRepositoryResponse<any>

/**
 *
 *
 * ============================================================
 *
 *
 */

export interface IWebsitesRepository {
  activateAnalytics(params: { websiteId: string }): Promise<ActivateResponse>
  reset(params: { websiteId: string }): Promise<ActivateResponse>

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

  addUserToWebsite(params: {
    websiteId: string
    email: string
  }): Promise<AddUserToWebsiteResponse>

  removeUserToWebsite(params: {
    websiteId: string
    email: string
  }): Promise<AddUserToWebsiteResponse>

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

  getUsersFromWebsite(params: {
    websiteId: string
  }): Promise<GetUsersFromWebsiteResponse>

  fetchWebsiteAnalyticsStatus(params: {
    websiteId: string
  }): Promise<FetchWebsiteAnalyticsStatusResponse>

  /**
   *
   *
   * SITEMAP
   *
   *
   */
  SitemapsFetchAll(params: {
    websiteId: string
  }): Promise<SitemapsFetchAllResponse>

  SitemapsDelete(params: {
    websiteId: string
    id: SitemapEntity["id"]
  }): Promise<SitemapsFetchAllResponse>

  /**
   *
   *
   * ========================================================================
   *
   *
   */

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
      page: string | null
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
      page: string | null
      from: Date | string
      to: Date | string
    }
    page: number
    type: "device" | "source" | "query" | "country" | "page"
    orderBy?:
      | "clicks"
      | "impressions"
      | "position"
      | "click_through_rate"
      | null
  }): Promise<StatsForHistogramResponse>
}
