import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"
import * as types from "./types"

export const AssistantSetOpenState = (
  payload: types.AssistantSetOpenStateAction["payload"]
): types.AssistantActionTypes => ({
  type: types.AssistantSetOpenState,
  payload,
})

export const $AssistantSetOpenState =
  (): ThunkAction<any, RootState, any, any> => (dispatch, getState) => {
    const { di, websites, payments } = getState()
  }
