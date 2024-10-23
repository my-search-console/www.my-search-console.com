import { ErrorEntity } from "@my-search-console/interfaces"
import delay from "delay"
import { ThunkAction } from "redux-thunk"

import { getCallbackUrl } from "../../constants/authentication"
import { localStorageKeys } from "../../constants/localStorageKeys"
import { GetUserInfoResponse } from "../../interfaces/IAuthRepository"
import { normalizeUrl } from "../../utils/normalizeUrl"
import { actions } from "../actions"
import { RootState } from "../store"
import * as types from "./types"

export const storeUser = (
  payload: types.storeUserAction["payload"]
): types.AuthActionTypes => ({
  type: types.storeUser,
  payload,
})

export const setFetching = (
  payload: types.setFetchingAction["payload"]
): types.AuthActionTypes => ({
  type: types.setFetching,
  payload,
})

export const AuthSetInitialized = (
  payload: types.AuthSetInitializedAction["payload"]
): types.AuthActionTypes => ({
  type: types.AuthSetInitialized,
  payload,
})

export const AuthLogout = (): types.AuthActionTypes => ({
  type: types.AuthLogout,
})

export const AuthStoreSources = (
  payload: types.AuthStoreSourcesAction["payload"]
): types.AuthActionTypes => ({
  type: types.AuthStoreSources,
  payload,
})

const $getUserInfoAndStoreIt =
  (): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di } = getState()

    try {
      const user = await di.AuthRepository.getUserInfo()

      if (user.error === false) {
        dispatcher(storeUser(user.body))
      }

      return user
    } catch (e) {
      // return dispatcher(
      //   actions.notifications.create({
      //     type: "error",
      //     // @ts-ignore
      //     message: e.message,
      //   })
      // )
    }
  }

export const $logout =
  (): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, lang } = getState()

    di.AnalyticsService.send({
      action: "logout",
      category: "authentication",
    })
    dispatcher(actions.auth.AuthLogout())
    di.AnalyticsService.logout()
    di.LocalStorageService.remove(localStorageKeys.TOKEN_KEY)
    di.LocationService.navigate(normalizeUrl({ url: "/", locale: lang.lang }))
  }

const getLanguageFromNavigator = () => {
  if (!navigator) return "en"
  if (!navigator.language) return "en"
  return navigator.language?.split("-")[0] || "en"
}

export const $goToAuthentication =
  (params?: { redirection?: string }): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, lang } = getState()

    if (params?.redirection) {
      di.LocalStorageService.store(
        localStorageKeys.REDIRECT_URL_AFTER_LOGIN,
        params.redirection
      )
    }

    di.AnalyticsService.send({
      category: "authentication",
      action: "trying_to_connect",
      data: {
        state: "go_to_authentication",
      },
    })

    await delay(500)

    const getGoogleAuthUrl = await di.AuthRepository.getAuthenticationUrl(
      "google"
    )

    if (getGoogleAuthUrl.error) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: getGoogleAuthUrl.code,
        })
      )
    }

    di.LocationService.navigate(getGoogleAuthUrl.body)
  }

export const $authenticateWithGoogleCode =
  (params: {
    code: string
    redirect?: string
  }): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, lang } = getState()

    const response = await di.AuthRepository.postAuthenticationCode({
      language: getLanguageFromNavigator(),
      callbackUrl: getCallbackUrl("google"),
      code: params.code,
      type: "google",
    })

    if (
      response.error === true &&
      response.code === ErrorEntity.GOOGLE_AUTH_SCOPE_NOT_FOUND
    ) {
      di.AnalyticsService.send({
        category: "authentication",
        action: "trying_to_connect",
        data: {
          state: "scope-not-found",
        },
      })

      return di.LocationService.refresh(
        "/redirect/authentication/google/scope-not-found"
      )
    }

    if (response.error === true) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    di.LocalStorageService.store(localStorageKeys.TOKEN_KEY, response.body)

    const user: GetUserInfoResponse = await dispatcher<any>(
      $getUserInfoAndStoreIt()
    )

    if (user.error === true) {
      dispatcher(
        actions.notifications.create({
          type: "error",
          message: user.code,
        })
      )
    } else {
      di.AnalyticsService.send({
        action: "login",
        category: "authentication",
      })

      di.AnalyticsService.authenticate({
        id: user.body.id,
        created_at: user.body.created_at,
      })
    }

    if (di.LocalStorageService.get(localStorageKeys.REDIRECT_URL_AFTER_LOGIN)) {
      di.LocationService.navigate(
        `/redirect${di.LocalStorageService.get(
          localStorageKeys.REDIRECT_URL_AFTER_LOGIN
        )}`
      )

      di.LocalStorageService.remove(localStorageKeys.REDIRECT_URL_AFTER_LOGIN)
    } else {
      di.LocationService.refresh("/redirect/")
    }
  }

export const $isAuthenticated =
  (): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    dispatcher(setFetching({ value: true }))

    await dispatcher<any>($getUserInfoAndStoreIt())

    dispatcher(actions.auth.AuthSetInitialized({ value: true }))
    dispatcher(setFetching({ value: false }))
  }

export const $isAuthenticatedOrRedirect =
  (): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    await dispatcher(actions.auth.$isAuthenticated())

    const { auth, di, lang } = getState()

    if (auth.authenticated) return

    di.LocationService.navigate(normalizeUrl({ url: "/", locale: lang.lang }))

    try {
      // startHotjar()
    } catch (e) {}
  }
