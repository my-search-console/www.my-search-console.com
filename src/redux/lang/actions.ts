import * as types from "./types"

export const store = (
  payload: types.StoreAction["payload"]
): types.LangActionTypes => ({
  type: types.Store,
  payload,
})
