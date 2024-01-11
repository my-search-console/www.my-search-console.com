import * as types from "./types"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"
import { actions } from "../actions"
import dayjs from "dayjs"
import weekOfYear from "dayjs/plugin/weekOfYear"
import { domToJpeg } from "modern-screenshot"

dayjs.extend(weekOfYear)

export const SpreadSetFetching = (
  payload: types.SpreadSetFetchingAction["payload"]
): types.SpreadActionTypes => ({
  type: types.SpreadSetFetching,
  payload,
})

export const SpreadStoreStats = (
  payload: types.SpreadStoreStatsAction["payload"]
): types.SpreadActionTypes => ({
  type: types.SpreadStoreStats,
  payload,
})

export const $fetchRealData =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { di, spread, payments, auth } = getState()

    if (spread.isFetching) return false

    if (auth.user) {
      di.AnalyticsService.send({
        category: "show-off",
        action: "fetch",
      })

      dispatch(actions.spread.SpreadSetFetching({ value: true }))

      const response = await di.SpreadRepository.fetch()

      dispatch(actions.spread.SpreadSetFetching({ value: false }))

      if (response.error) return true

      dispatch(actions.spread.SpreadStoreStats(response.body))
    } else {
      await dispatch(
        actions.auth.$authenticateWithGoogle({ disableRedirection: true })
      )

      if (getState().auth.user) return dispatch($fetchRealData())
    }
  }

export const $download =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { di } = getState()

    const element = document.querySelector("#render-chart")
    if (!element) return false

    domToJpeg(element, {
      quality: 100,
      scale: 2,
    }).then((dataUrl) => {
      const link = document.createElement("a")
      link.download = "screenshot.jpeg"
      link.href = dataUrl
      link.click()

      di.AnalyticsService.send({
        category: "show-off",
        action: "download",
      })

      window.umami?.track("show-off--download")
    })
  }
