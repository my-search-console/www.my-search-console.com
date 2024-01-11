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

export type SpreadActionTypes = SpreadSetFetchingAction | SpreadStoreStatsAction
