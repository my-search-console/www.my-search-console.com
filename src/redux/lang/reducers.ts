import * as types from "./types"

interface LangState {
  lang: string
}

const initialState: LangState = {
  lang: "en",
}

export function langReducer(
  state = initialState,
  action: types.LangActionTypes
): LangState {
  if (action.type === types.Store) {
    return {
      ...state,
      ...action.payload,
    }
  }

  return state
}
