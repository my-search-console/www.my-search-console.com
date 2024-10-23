import { RankingStatsForFrontend } from "../../entities/RankingWebsiteEntity"

export const SpreadSetFetching = "SpreadSetFetching"
export interface SpreadSetFetchingAction {
  type: typeof SpreadSetFetching
  payload: {
    value: boolean
  }
}

export const SpreadStoreStats = "SpreadStoreStats"
export interface SpreadStoreStatsAction {
  type: typeof SpreadStoreStats
  payload: RankingStatsForFrontend
}

export const SpreadStoreWebsites = "SpreadStoreWebsites"
export interface SpreadStoreWebsitesAction {
  type: typeof SpreadStoreWebsites
  payload: Array<{
    id: string
    clicks: number
    impressions: number
    timeline: RankingStatsForFrontend["date"]
  }>
}

export const SpreadStoreSources = "SpreadStoreSources"
export interface SpreadStoreSourcesAction {
  type: typeof SpreadStoreSources
  payload: {
    google: {
      clicks: number
      impressions: number
      activated: boolean
    }
    bing: {
      clicks: number
      impressions: number
      activated: boolean
    }
    yandex: {
      clicks: number
      impressions: number
      activated: boolean
    }
  }
}

export const SpreadStoreLadder = "SpreadStoreLadder"
export interface SpreadStoreLadderAction {
  type: typeof SpreadStoreLadder
  payload: any
}

export type SpreadActionTypes =
  | SpreadSetFetchingAction
  | SpreadStoreStatsAction
  | SpreadStoreWebsitesAction
  | SpreadStoreLadderAction
  | SpreadStoreSourcesAction
