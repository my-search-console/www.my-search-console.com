import {
  ErrorEntity,
  PaymentPlansEntity,
  UserToGoogleSearchConsoleWithEmailsEntity,
} from "@foudroyer/interfaces"
import delay from "delay"
import { ThunkAction } from "redux-thunk"
import {
  getCallbackUrl,
  GET_GOOGLE_AUTH_URL,
} from "../../constants/authentication"
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

        if (window.tolt_referral) {
          // window.tolt.signup(user.body.email)
        }
      }

      return user
    } catch (e) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          // @ts-ignore
          message: e.message,
        })
      )
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

    di.LocationService.navigate(GET_GOOGLE_AUTH_URL())
  }

// export const $authenticateWithGoogle =
//   (): ThunkAction<void, RootState, any, any> =>
//   async (dispatcher, getState) => {
//     const { di, lang } = getState()

//     try {
//       dispatcher(setFetching({ value: true }))

//       di.AnalyticsService.send({
//         category: "authentication",
//         action: "trying_to_connect",
//         data: {
//           state: "started",
//         },
//       })

//       const response = await di.AuthRepository.authenticateWithGoogle({
//         language: getLanguageFromNavigator(),
//       })

//       dispatcher(setFetching({ value: false }))

//       if (
//         response.error === true &&
//         response.code === ErrorEntity.GOOGLE_AUTH_SCOPE_NOT_FOUND
//       ) {
//         di.AnalyticsService.send({
//           category: "authentication",
//           action: "trying_to_connect",
//           data: {
//             state: "scope-not-found",
//           },
//         })
//         return dispatcher(actions.modal.$openScopeNotFoundModal())
//       }

//       if (
//         response.error === true &&
//         response.code === InternalErrorEntity.GOOGLE_AUTH_NO_CODE
//       ) {
//         di.AnalyticsService.send({
//           category: "authentication",
//           action: "trying_to_connect",
//           data: {
//             state: "auth-no-code-found-on-callback",
//           },
//         })

//         di.AnalyticsService.send({
//           category: "authentication",
//           action: "error",
//           data: {
//             href: response.data.href,
//           },
//         })
//       }

//       if (response.error === true) {
//         di.AnalyticsService.send({
//           category: "authentication",
//           action: "trying_to_connect",
//           data: {
//             state: "error",
//             error: response.code,
//           },
//         })

//         dispatcher(
//           actions.notifications.create({
//             type: "error",
//             message: response.code,
//             timeout: 10000,
//           })
//         )
//       } else {
//         di.AnalyticsService.send({
//           category: "authentication",
//           action: "trying_to_connect",
//           data: {
//             state: "success",
//           },
//         })

//         di.LocalStorageService.store(
//           localStorageKeys.TOKEN_KEY,
//           response.body.token
//         )

//         const user: GetUserInfoResponse = await dispatcher<any>(
//           $getUserInfoAndStoreIt()
//         )

//         if (user.error === true) {
//           dispatcher(
//             actions.notifications.create({
//               type: "error",
//               message: user.code,
//             })
//           )
//         } else {
//           di.AnalyticsService.send({
//             action: "login",
//             category: "authentication",
//           })

//           di.AnalyticsService.authenticate({
//             id: user.body.id,
//             created_at: user.body.created_at,
//           })

//           const isRedirectionInLocalStorage = di.LocalStorageService.get(
//             localStorageKeys.REDIRECT_URL_AFTER_LOGIN
//           )

//           if (isRedirectionInLocalStorage) {
//             di.LocalStorageService.remove(
//               localStorageKeys.REDIRECT_URL_AFTER_LOGIN
//             )

//             di.LocationService.navigate(
//               "redirect" + isRedirectionInLocalStorage
//             )
//           } else {
//             di.LocationService.navigate(
//               normalizeUrl({ url: "/dashboard/", locale: lang.lang })
//             )
//           }
//         }
//       }
//     } catch (e: any) {
//       di.AnalyticsService.send({
//         category: "authentication",
//         action: "trying_to_connect",
//         data: {
//           state: "error",
//           error: e.message,
//         },
//       })

//       return dispatcher(
//         actions.notifications.create({
//           type: "error",
//           message: e.message,
//         })
//       )
//     }
//   }

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

      di.LocationService.refresh(
        "/redirect/authentication/google/scope-not-found"
      )

      // return dispatcher(actions.modal.$openScopeNotFoundModal())
      return
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
      di.LocationService.refresh("/redirect/dashboard/")
    }
  }

/**
 *
 *
 *
 *
 *
 * GOOGLE SEARCH CONSOLE ACCOUNTS
 *
 *
 *
 *
 *
 *
 */

export const AuthGoogleSearchConsoleAccountsStore = (
  payload: types.AuthGoogleSearchConsoleAccountsStoreAction["payload"]
): types.AuthActionTypes => ({
  type: types.AuthGoogleSearchConsoleAccountsStore,
  payload,
})

export const $addGoogleSearchAccount =
  (params?: {
    disableRedirection?: boolean
  }): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, lang, payments } = getState()
    const actualPlan = payments.actualIndexationPlan?.plan

    if (
      actualPlan !== PaymentPlansEntity["enterprise"] &&
      actualPlan !== PaymentPlansEntity["indexation/teams"]
    ) {
      return dispatcher(
        actions.payments.$PaymentsOpenModal({
          value: true,
          type: "indexation",
          source: "multi-google-search",
        })
      )
    }

    const response = await di.AuthRepository.addGoogleSearchAccount({
      language: getLanguageFromNavigator(),
    })

    if (
      response.error === true &&
      response.code === ErrorEntity.GOOGLE_AUTH_SCOPE_NOT_FOUND
    ) {
      return dispatcher(actions.modal.$openScopeNotFoundModal())
    }

    if (response.error === true) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
          timeout: 10000,
        })
      )
    }

    dispatcher(actions.auth.$GoogleSearchAccountFetchParents())

    dispatcher(
      actions.notifications.create({
        type: "success",
      })
    )
  }

export const $GoogleSearchAccountFetchParents =
  (): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, auth } = getState()

    if (!auth.authenticated) return false

    const response = await di.AuthRepository.GoogleSearchAccountGetParents()

    if (response.error) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    return dispatcher(
      actions.auth.AuthGoogleSearchConsoleAccountsStore({
        accounts: response.body,
      })
    )
  }

export const $GoogleSearchAccountDelete =
  (params: {
    id: UserToGoogleSearchConsoleWithEmailsEntity["id"]
  }): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, auth } = getState()

    if (!auth.authenticated) return false

    const response = await di.AuthRepository.GoogleSearchAccountDelete(params)

    if (response.error) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatcher(
      actions.notifications.create({
        type: "success",
      })
    )
    dispatcher(actions.auth.$GoogleSearchAccountFetchParents())
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
