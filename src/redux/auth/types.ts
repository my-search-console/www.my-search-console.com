import { UserEntity } from "@my-search-console/interfaces"

export const storeUser = "AUTH_STORE_USER"
export interface storeUserAction {
  type: typeof storeUser
  payload: UserEntity
}

export const AuthLogout = "AuthLogout"
export interface AuthLogoutAction {
  type: typeof AuthLogout
}

export const setFetching = "AUTH_SET_FETCHING"
export interface setFetchingAction {
  type: typeof setFetching
  payload: { value: boolean }
}

export const AuthSetInitialized = "AuthSetInitialized"
export interface AuthSetInitializedAction {
  type: typeof AuthSetInitialized
  payload: { value: boolean }
}

export const AuthStoreSources = "AuthStoreSources"
export interface AuthStoreSourcesAction {
  type: typeof AuthStoreSources
  payload: { google: boolean; yandex: boolean; bing: boolean }
}

export type AuthActionTypes =
  | storeUserAction
  | setFetchingAction
  | AuthLogoutAction
  | AuthSetInitializedAction
  | AuthStoreSourcesAction
