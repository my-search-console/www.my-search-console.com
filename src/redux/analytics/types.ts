import {
  RankingOrderByType,
  RankingStatEntity,
  RankingStatsForFrontend,
} from "../../entities/RankingWebsiteEntity"

export const RankingSetAnalyticsToastDataLateAccepted =
  "RankingSetAnalyticsToastDataLateAccepted"
export interface RankingSetAnalyticsToastDataLateAcceptedAction {
  type: typeof RankingSetAnalyticsToastDataLateAccepted
  payload: {
    value: boolean
  }
}

export const RankingSetFetching = "RankingSetFetching"
export interface RankingSetFetchingAction {
  type: typeof RankingSetFetching
  payload: {
    value: boolean
  }
}

export const AnalyticsStorePreviousUrl = "AnalyticsStorePreviousUrl"
export interface AnalyticsStorePreviousUrlAction {
  type: typeof AnalyticsStorePreviousUrl
  payload: {
    value: string | null
  }
}

export const AnalyticsStoreIsFinishedStatus = "AnalyticsStoreIsFinishedStatus"
export interface AnalyticsStoreIsFinishedStatusAction {
  type: typeof AnalyticsStoreIsFinishedStatus
  payload: {
    value: boolean
  }
}

export const RankingSetHistogramView = "RankingSetHistogramView"
export interface RankingSetHistogramViewAction {
  type: typeof RankingSetHistogramView
  payload: {
    value: RankingOrderByType
  }
}

export const RankingStoreFilterQuery = "RankingStoreFilterQuery"
export interface RankingStoreFilterQueryAction {
  type: typeof RankingStoreFilterQuery
  payload: {
    value: string
  }
}

export const RankingStoreOrderBy = "RankingStoreOrderBy"
export interface RankingStoreOrderByAction {
  type: typeof RankingStoreOrderBy
  payload: {
    value: "clicks" | "impressions" | "position" | "click_through_rate"
  }
}

export const RankingStoreStats = "RankingStoreStats"
export interface RankingStoreStatsAction {
  type: typeof RankingStoreStats
  payload: RankingStatsForFrontend
}

export const RankingHistogramModalSetFetching =
  "RankingHistogramModalSetFetching"
export interface RankingHistogramModalSetFetchingAction {
  type: typeof RankingHistogramModalSetFetching
  payload: { value: boolean }
}

export const RankingHistogramModalSetToggle = "RankingHistogramModalSetToggle"
export interface RankingHistogramModalSetToggleAction {
  type: typeof RankingHistogramModalSetToggle
  payload: { value: boolean }
}

export const RankingHistogramModalSetType = "RankingHistogramModalSetType"
export interface RankingHistogramModalSetTypeAction {
  type: typeof RankingHistogramModalSetType
  payload: { value: "device" | "query" | "country" | "source" | "page" }
}

export const RankingStoreStatsHistogram = "RankingStoreStatsHistogram"
export interface RankingStoreStatsHistogramAction {
  type: typeof RankingStoreStatsHistogram
  payload: RankingStatEntity[]
}

export const AnalyticsSetAnalyticsComingSoonModalIsOpen =
  "AnalyticsSetAnalyticsComingSoonModalIsOpen"
export interface AnalyticsSetAnalyticsComingSoonModalIsOpenAction {
  type: typeof AnalyticsSetAnalyticsComingSoonModalIsOpen
  payload: {
    value: boolean
  }
}

/**
 *
 *
 *
 * ACTIVATE
 *
 *
 *
 */

export const AnalyticsSetAnalyticsDiscoverModalIsFetching =
  "AnalyticsSetAnalyticsDiscoverModalIsFetching"
export interface AnalyticsSetAnalyticsDiscoverModalIsFetchingAction {
  type: typeof AnalyticsSetAnalyticsDiscoverModalIsFetching
  payload: {
    value: boolean
  }
}

export const AnalyticsSetAnalyticsDiscoverModalIsOpen =
  "AnalyticsSetAnalyticsDiscoverModalIsOpen"
export interface AnalyticsSetAnalyticsDiscoverModalIsOpenAction {
  type: typeof AnalyticsSetAnalyticsDiscoverModalIsOpen
  payload: {
    value: boolean
  }
}

export type RankingActionTypes =
  /**
   *
   * ACTIVATE
   *
   */
  | AnalyticsSetAnalyticsDiscoverModalIsFetchingAction
  | AnalyticsSetAnalyticsDiscoverModalIsOpenAction

  /**
   *
   * TOAST
   *
   */
  | RankingSetAnalyticsToastDataLateAcceptedAction
  | RankingSetFetchingAction
  | RankingStoreFilterQueryAction
  | RankingSetHistogramViewAction
  | RankingStoreOrderByAction
  | RankingHistogramModalSetToggleAction
  | RankingStoreStatsAction
  | RankingHistogramModalSetFetchingAction
  | RankingHistogramModalSetTypeAction
  | RankingStoreStatsHistogramAction
  | AnalyticsStoreIsFinishedStatusAction
  | AnalyticsStorePreviousUrlAction
  | AnalyticsSetAnalyticsComingSoonModalIsOpenAction
