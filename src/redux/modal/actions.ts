import * as types from "./types"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"

export const close = (): types.ModalActionTypes => ({
  type: types.close,
})

export const storeOpen = (): types.ModalActionTypes => ({
  type: types.open,
})

export const openCta = (
  payload: types.openCtaAction["payload"]
): types.ModalActionTypes => ({
  type: types.openCta,
  payload,
})

export const closeCta = (): types.ModalActionTypes => ({
  type: types.closeCta,
})

export const onOpenComingSoon = (
  payload: types.onOpenComingSoonAction["payload"]
): types.ModalActionTypes => ({
  type: types.onOpenComingSoon,
  payload,
})

export const onCloseComingSoon = (): types.ModalActionTypes => ({
  type: types.onCloseComingSoon,
})

export const ctaFetching = () => ({
  type: types.ctaFetching,
})

export const ctaFetchEnd = () => ({
  type: types.ctaFetchEnd,
})

export const fetchSubmit =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { modal } = getState()

    if (modal.cta.onSubmit) modal.cta.onSubmit()

    dispatch(closeCta())
  }

export const $openSupportUsModal =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { di } = getState()
  }

export const $closeSupportUsModal =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { di } = getState()

    const url = di.LocationService.getFullUrl()

    di.LocationService.navigate(url.replace("#support-us-modal", ""))
  }

export const $openNewsModal =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { di } = getState()

    const url = di.LocationService.getFullUrl()

    di.LocationService.navigate(url + "#news-modal")
    di.AnalyticsService.send({
      category: "news",
      action: "open",
    })
  }

export const $closeNewsModal =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { di } = getState()

    const url = di.LocationService.getFullUrl()

    di.LocationService.navigate(url.replace("#news-modal", ""))
    di.AnalyticsService.send({
      category: "news",
      action: "close",
    })
  }

export const $closeScopeNotFoundModal =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { di } = getState()

    const url = di.LocationService.getFullUrl()

    di.LocationService.navigate(url.replace("#scope-not-found", ""))
  }

export const $openScopeNotFoundModal =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { di } = getState()

    const url = di.LocationService.getFullUrl()

    if (url.includes("#scope-not-found")) return

    di.LocationService.navigate(url.concat("#scope-not-found"))
  }

export const $openIndexAllSuccess =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { di } = getState()

    const url = di.LocationService.getFullUrl()

    if (url.includes("#index-all-success")) return

    di.LocationService.navigate(url.concat("#index-all-success"))
  }

export const $closeIndexAllSuccess =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { di } = getState()

    const url = di.LocationService.getFullUrl()

    di.LocationService.navigate(url.replace("#index-all-success", ""))
  }
