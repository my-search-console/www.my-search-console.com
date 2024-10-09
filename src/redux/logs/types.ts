import { LogsEntity } from "@foudroyer/interfaces"

export const LogsStore = "LogsStore"
export interface LogsStoreAction {
  type: typeof LogsStore
  payload: LogsEntity[]
}

export const LogsStoreTags = "LogsStoreTags"
export interface LogsStoreTagsAction {
  type: typeof LogsStoreTags
  payload: string[]
}

export const LogsSetFetching = "LogsSetFetching"
export interface LogsSetFetchingAction {
  type: typeof LogsSetFetching
  payload: boolean
}

export const LogsFormSetFetching = "LogsFormSetFetching"
export interface LogsFormSetFetchingAction {
  type: typeof LogsFormSetFetching
  payload: boolean
}

export const LogsAddFetchingState = "LogsAddFetchingState"
export interface LogsAddFetchingStateAction {
  type: typeof LogsAddFetchingState
  payload: string
}

export const LogsRemoveFetchingState = "LogsRemoveFetchingState"
export interface LogsRemoveFetchingStateAction {
  type: typeof LogsRemoveFetchingState
  payload: string
}

export type LogsActionTypes =
  | LogsStoreAction
  | LogsStoreTagsAction
  | LogsSetFetchingAction
  | LogsFormSetFetchingAction
  | LogsAddFetchingStateAction
  | LogsRemoveFetchingStateAction
