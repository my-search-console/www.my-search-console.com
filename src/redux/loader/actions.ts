import * as types from "./types";

export const setLoading = (
  payload: types.setLoadingAction["payload"]
): types.DarkModeActionTypes => ({
  type: types.setLoading,
  payload,
});
