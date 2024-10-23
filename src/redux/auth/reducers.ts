import { UserEntity } from "@my-search-console/interfaces"
import * as types from "./types"

interface AuthState {
  user: UserEntity | null
  authenticated: boolean
  isFetching: boolean
  initialised: boolean
}

const initialState: AuthState = {
  user: null,
  authenticated: false,
  isFetching: false,
  initialised: false,
}

export function authReducer(
  state = initialState,
  action: types.AuthActionTypes
): AuthState {
  if (action.type === types.storeUser) {
    return {
      ...state,
      user: action.payload,
      authenticated: true,
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
