import { ThunkAction } from "redux-thunk"
import { actions } from "../actions"
import { RootState } from "../store"
import * as types from "./types"
import { localStorageKeys } from "../../constants/localStorageKeys"
import { normalizeUrl } from "../../utils/normalizeUrl"
import { startHotjar } from "../../utils/hotjar"
import { GetUserInfoResponse } from "../../interfaces/IAuthRepository"
import { ErrorEntity } from "@foudroyer/interfaces"

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

    const [user, sources] = await Promise.all([
      di.AuthRepository.getUserInfo(),
      di.AuthRepository.getSources(),
    ])

    if (user.error === false) {
      dispatcher(storeUser(user.body))
      if (!sources.error) {
        dispatcher(AuthStoreSources(sources.body))
      }
      dispatcher(actions.payments.$fetchPaymentsInfo())

      try {
        if (window.tolt_referral) {
          // window.tolt.signup(user.body.email)
        }
      } catch (e) {}
    }

    return user
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
  return navigator.language.split("-")[0] || "en"
}

export const $authenticateWithGoogle =
  (params?: {
    disableRedirection?: boolean
  }): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, lang } = getState()

    dispatcher(setFetching({ value: true }))

    const response = await di.AuthRepository.authenticateWithGoogle({
      language: getLanguageFromNavigator(),
    })

    if (
      response.error === true &&
      response.code === ErrorEntity.GOOGLE_AUTH_SCOPE_NOT_FOUND
    ) {
      return dispatcher(actions.modal.$openScopeNotFoundModal())
    }

    if (response.error === true) {
      dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
          timeout: 10000,
        })
      )
    } else {
      di.LocalStorageService.store(
        localStorageKeys.TOKEN_KEY,
        response.body.token
      )

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

        if (!params?.disableRedirection)
          di.LocationService.navigate(
            normalizeUrl({ url: "/administration/", locale: lang.lang })
          )
      }
    }

    dispatcher(setFetching({ value: false }))
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
      startHotjar()
    } catch (e) {}
  }
