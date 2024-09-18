import {
  StatsIndexationThroughTimeEntity,
  StatsWebsiteIndexationThroughTimeEntity,
} from "../../interfaces/IStatsRepository"

export const StatsIndexationStateStore = "StatsIndexationStateStore"
export interface StatsIndexationStateStoreAction {
  type: typeof StatsIndexationStateStore
  payload: StatsIndexationThroughTimeEntity
}

export const StatsIndexationStateSetFetching = "StatsIndexationStateSetFetching"
export interface StatsIndexationStateSetFetchingAction {
  type: typeof StatsIndexationStateSetFetching
  payload: boolean
}

export const StatsWebsiteIndexationStateStore =
  "StatsWebsiteIndexationStateStore"
export interface StatsWebsiteIndexationStateStoreAction {
  type: typeof StatsWebsiteIndexationStateStore
  payload: StatsWebsiteIndexationThroughTimeEntity
}

export const StatsWebsiteIndexationStateSetFetching =
  "StatsWebsiteIndexationStateSetFetching"
export interface StatsWebsiteIndexationStateSetFetchingAction {
  type: typeof StatsWebsiteIndexationStateSetFetching
  payload: boolean
}

export type StatsActionTypes =
  /*********************************************************
   *
   * Indexation State
   *
   *********************************************************/
  | StatsIndexationStateStoreAction
  | StatsIndexationStateSetFetchingAction
  | StatsWebsiteIndexationStateSetFetchingAction
  | StatsWebsiteIndexationStateStoreAction
