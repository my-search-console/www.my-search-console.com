import * as types from "./types"

interface PlayState {
  dark: boolean
}

const initialState: PlayState = {
  dark: false,
}

export function darkModeReducer(
  state = initialState,
  action: types.DarkModeActionTypes
): PlayState {
  if (action.type === types.ToggleDarkMode) {
    return {
      ...state,
      dark: !state.dark,
    }
  }

  if (action.type === types.Set) {
    return {
      ...state,
      dark: action.payload,
    }
  }

  return state
}
