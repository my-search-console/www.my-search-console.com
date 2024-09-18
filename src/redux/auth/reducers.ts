import {
  UserEntity,
  UserToGoogleSearchConsoleWithEmailsEntity,
} from "@foudroyer/interfaces"
import * as types from "./types"

interface AuthState {
  user: UserEntity | null
  authenticated: boolean
  isFetching: boolean
  accountConnectedTo: {
    google: boolean
    yandex: boolean
    bing: boolean
  }
  isPremium: boolean
  initialised: boolean

  googleSearchAccounts: UserToGoogleSearchConsoleWithEmailsEntity[]
}

const initialState: AuthState = {
  user: null,
  authenticated: false,
  isFetching: false,
  accountConnectedTo: {
    google: true,
    yandex: false,
    bing: false,
  },
  isPremium: false,
  initialised: false,

  googleSearchAccounts: [],
}

export function authReducer(
  state = initialState,
  action: types.AuthActionTypes
): AuthState {
  /**
   *
   *
   * GOOGLE SEARCH CONSOLE ACCOUNTS
   *
   *
   */

  if (action.type === types.AuthGoogleSearchConsoleAccountsStore) {
    return {
      ...state,
      googleSearchAccounts: action.payload.accounts,
    }
  }

  /**
   *
   *
   *
   *
   * ==================
   *
   *
   *
   *
   */
  if (action.type === types.storeUser) {
    return {
      ...state,
      user: action.payload,
      authenticated: true,
    }
  }

  if (action.type === types.AuthStoreSources) {
    return {
      ...state,
      accountConnectedTo: action.payload,
    }
  }

  if (action.type === types.setFetching) {
    return {
      ...state,
      isFetching: action.payload.value,
    }
  }

  if (action.type === types.AuthSetInitialized) {
    return {
      ...state,
      initialised: action.payload.value,
    }
  }

  if (action.type === types.AuthLogout) {
    return { ...initialState }
  }

  return state
}
