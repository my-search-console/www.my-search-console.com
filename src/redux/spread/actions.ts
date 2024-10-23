import dayjs from "dayjs"
import weekOfYear from "dayjs/plugin/weekOfYear"
import { domToJpeg } from "modern-screenshot"
import { ThunkAction } from "redux-thunk"
import { getFiltersFromUrl } from "../../utils/getFiltersFromUrl"
import { actions } from "../actions"
import { RootState } from "../store"
import * as types from "./types"

dayjs.extend(weekOfYear)

export const SpreadSetFetching = (
  payload: types.SpreadSetFetchingAction["payload"]
): types.SpreadActionTypes => ({
  type: types.SpreadSetFetching,
  payload,
})

export const SpreadStoreWebsites = (
  payload: types.SpreadStoreWebsitesAction["payload"]
): types.SpreadActionTypes => ({
  type: types.SpreadStoreWebsites,
  payload,
})

export const SpreadStoreSources = (
  payload: types.SpreadStoreSourcesAction["payload"]
): types.SpreadActionTypes => ({
  type: types.SpreadStoreSources,
  payload,
})

export const SpreadStoreStats = (
  payload: types.SpreadStoreStatsAction["payload"]
): types.SpreadActionTypes => ({
  type: types.SpreadStoreStats,
  payload,
})

export const SpreadStoreLadder = (
  payload: types.SpreadStoreLadderAction["payload"]
): types.SpreadActionTypes => ({
  type: types.SpreadStoreLadder,
  payload,
})

export const $SubmitCalendar =
  (props: {
    from: string
    to: string
  }): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di } = getState()

    const url = new URL(di.LocationService.getFullUrl())

    url.searchParams.set("from", props.from)
    url.searchParams.set("to", props.to)
    url.searchParams.delete("period")

    di.LocationService.navigate(url.toString(), {
      disableScroll: true,
    })

    dispatch(actions.spread.$fetch())
  }

export const $fetch =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { di, spread, auth, ranking } = getState()

    if (spread.isFetching) return false

    dispatch(actions.spread.SpreadSetFetching({ value: true }))

    await dispatch(actions.auth.$isAuthenticated())

    const fullUrl = di.LocationService.getFullUrl()

    const { from, to } = getFiltersFromUrl({
      url: fullUrl,
    })

    const response = await di.SpreadRepository.fetch({
      from,
      to,
    })

    dispatch(actions.spread.SpreadSetFetching({ value: false }))

    if (response.error) {
      return dispatch(
        actions.notifications.create({
          message: response.code,
          type: "error",
        })
      )
    }

    dispatch(actions.spread.SpreadStoreStats(response.body.stats))
    dispatch(actions.spread.SpreadStoreWebsites(response.body.websites))
    dispatch(actions.spread.SpreadStoreSources(response.body.sources))
  }

export const $authenticate =
  (source: "bing" | "yandex"): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di } = getState()

    await dispatch(actions.spread.$fetch())
  }

export const $fetchOrConnect =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { auth } = getState()

    if (auth.user) {
      dispatch(actions.spread.$fetch())
    } else {
      await dispatch(actions.auth.$goToAuthentication({ redirection: "/" }))

      if (getState().auth.user) return dispatch(actions.spread.$fetch())
    }
  }

export const $RankingStoreOrderBy =
  (
    orderBy: "clicks" | "impressions" | "position" | "click_through_rate"
  ): ThunkAction<any, RootState, any, any> =>
  (dispatch, getState) => {
    const { di } = getState()

    const url = new URL(di.LocationService.getFullUrl())

    url.searchParams.set("orderBy", orderBy)

    di.LocationService.navigate(url.toString(), {
      disableScroll: true,
    })
  }

export const $SpreadGoAnalytics =
  (id: string): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di } = getState()

    dispatch(actions.websites.setActiveWebsite({ id }))

    di.LocationService.navigate(`/analytics/${id}`, {
      disableScroll: false,
    })
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
