import * as types from "./types"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"

export const toggleDarkMode = (): types.DarkModeActionTypes => ({
  type: types.ToggleDarkMode,
})

export const $toggleDarkMode =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    dispatcher(toggleDarkMode())

    const { darkMode } = getState()

    try {
      window.localStorage.setItem("dark", String(darkMode.dark))
    } catch (e) {}
  }

export const set = (
  payload: types.SetAction["payload"]
): types.DarkModeActionTypes => ({
  type: types.Set,
  payload,
})

export const $init =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    try {
      const dark = window.localStorage.getItem("dark")
      if (dark && dark === "true") dispatcher(set(true))
    } catch (e) {}
  }
