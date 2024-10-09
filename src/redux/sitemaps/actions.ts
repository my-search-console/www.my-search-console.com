import { ThunkAction } from "redux-thunk"
import { actions } from "../actions"
import { RootState } from "../store"
import * as types from "./types"

export const setLoading = (
  payload: types.SitemapsSetLoadingAction["payload"]
): types.SitemapsActionTypes => ({
  type: types.SitemapsSetLoading,
  payload,
})

export const SitemapsStoreSitemaps = (
  payload: types.SitemapsStoreSitemapsAction["payload"]
): types.SitemapsActionTypes => ({
  type: types.SitemapsStoreSitemaps,
  payload,
})

export const $fetch = (params: {
  url: string
}): ThunkAction<void, RootState, any, any> => {
  return async (dispatch, getState) => {
    const { di, sitemaps } = getState()

    if (sitemaps.isLoading) {
      return
    }

    di.AnalyticsService.send({
      category: "sitemapy",
      action: "fetch",
      data: {
        url: params.url,
      },
    })

    dispatch(setLoading({ value: true }))

    const response = await di.SitemapsService.fetch(params)

    dispatch(setLoading({ value: false }))

    if (response.error) {
      di.AnalyticsService.send({
        category: "sitemapy",
        action: "error",
        data: {
          message: response.code,
        },
      })

      return dispatch(
        actions.notifications.create({
          message: response.code,
          type: "error",
        })
      )
    }

    dispatch(SitemapsStoreSitemaps({ sitemap: response.body }))
  }
}
