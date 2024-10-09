import { CrawlResponse } from "../../interfaces/ISitemapsService"

export const SitemapsSetLoading = "SitemapsSetLoading"
export interface SitemapsSetLoadingAction {
  type: typeof SitemapsSetLoading
  payload: { value: boolean }
}

export const SitemapsStoreSitemaps = "SitemapsStoreSitemaps"
export interface SitemapsStoreSitemapsAction {
  type: typeof SitemapsStoreSitemaps
  payload: { sitemap: CrawlResponse }
}

export type SitemapsActionTypes =
  | SitemapsSetLoadingAction
  | SitemapsStoreSitemapsAction
