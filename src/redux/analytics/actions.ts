import { ThunkAction } from "redux-thunk"
import { localStorageKeys } from "../../constants/localStorageKeys"
import { getFiltersFromUrl } from "../../utils/getFiltersFromUrl"
import { getWebsiteIdFromUrl } from "../../utils/getWebsiteIdFromUrl"
import { moveDate } from "../../utils/moveDateFromUrl"
import { normalizeUrl } from "../../utils/normalizeUrl"
import { actions } from "../actions"
import { RootState } from "../store"
import * as types from "./types"

export const RankingSetToastAccepted = (
  payload: types.RankingSetAnalyticsToastDataLateAcceptedAction["payload"]
): types.RankingActionTypes => ({
  type: types.RankingSetAnalyticsToastDataLateAccepted,
  payload,
})

export const AnalyticsToggleDimension = (
  payload: types.AnalyticsToggleDimensionAction["payload"]
): types.RankingActionTypes => ({
  type: types.AnalyticsToggleDimension,
  payload,
})

export const AnalyticsStorePreviousUrl = (
  payload: types.AnalyticsStorePreviousUrlAction["payload"]
): types.RankingActionTypes => ({
  type: types.AnalyticsStorePreviousUrl,
  payload,
})

export const AnalyticsSetAnalyticsComingSoonModalIsOpen = (
  payload: types.AnalyticsSetAnalyticsComingSoonModalIsOpenAction["payload"]
): types.RankingActionTypes => ({
  type: types.AnalyticsSetAnalyticsComingSoonModalIsOpen,
  payload,
})

export const AnalyticsStoreIsFinishedStatus = (
  payload: types.AnalyticsStoreIsFinishedStatusAction["payload"]
): types.RankingActionTypes => ({
  type: types.AnalyticsStoreIsFinishedStatus,
  payload,
})

export const RankingSetFetching = (
  payload: types.RankingSetFetchingAction["payload"]
): types.RankingActionTypes => ({
  type: types.RankingSetFetching,
  payload,
})

export const RankingStoreFilterQuery = (
  payload: types.RankingStoreFilterQueryAction["payload"]
): types.RankingActionTypes => ({
  type: types.RankingStoreFilterQuery,
  payload,
})

export const RankingStoreOrderBy = (
  payload: types.RankingStoreOrderByAction["payload"]
): types.RankingActionTypes => ({
  type: types.RankingStoreOrderBy,
  payload,
})

export const RankingStoreStats = (
  payload: types.RankingStoreStatsAction["payload"]
): types.RankingActionTypes => ({
  type: types.RankingStoreStats,
  payload,
})

export const RankingStoreStatsHistogram = (
  payload: types.RankingStoreStatsHistogramAction["payload"]
): types.RankingActionTypes => ({
  type: types.RankingStoreStatsHistogram,
  payload,
})

export const RankingHistogramModalSetFetching = (
  payload: types.RankingHistogramModalSetFetchingAction["payload"]
): types.RankingActionTypes => ({
  type: types.RankingHistogramModalSetFetching,
  payload,
})

export const RankingHistogramModalSetToggle = (
  payload: types.RankingHistogramModalSetToggleAction["payload"]
): types.RankingActionTypes => ({
  type: types.RankingHistogramModalSetToggle,
  payload,
})

export const RankingSetHistogramView = (
  payload: types.RankingSetHistogramViewAction["payload"]
): types.RankingActionTypes => ({
  type: types.RankingSetHistogramView,
  payload,
})

export const RankingHistogramModalSetType = (
  payload: types.RankingHistogramModalSetTypeAction["payload"]
): types.RankingActionTypes => ({
  type: types.RankingHistogramModalSetType,
  payload,
})

export const $fetch =
  (props?: { force?: boolean }): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di, analytics } = getState()

    const pathname = di.LocationService.getPathname()
    const fullUrl = di.LocationService.getFullUrl()

    const { websiteId, feature } = getWebsiteIdFromUrl(pathname)

    if (!websiteId) return

    dispatch(RankingSetFetching({ value: true }))

    const { source, query, country, device, from, to, orderBy, page } =
      getFiltersFromUrl({
        url: fullUrl,
      })

    if (orderBy !== analytics.orderBy) {
      dispatch(RankingStoreOrderBy({ value: orderBy || "clicks" }))
    }

    const filterQuery = [
      source,
      query,
      country,
      device,
      from,
      to,
      orderBy,
      page,
      websiteId,
    ].toString()

    if (filterQuery === analytics.filter && !props?.force) {
      dispatch(RankingSetFetching({ value: false }))
      return false
    }

    const isPublic = feature === "shared"

    const response = await di.WebsitesRepository.fetchStats({
      website: websiteId,
      filter: {
        source,
        query,
        country,
        device,
        from,
        to,
        page,
      },
      isPublic,
      orderBy,
    })

    dispatch(
      RankingStoreFilterQuery({
        value: filterQuery,
      })
    )
    dispatch(RankingSetFetching({ value: false }))

    if (response.error) {
      return dispatch(
        actions.notifications.create({
          message: response.code,
          type: "error",
        })
      )
    }

    dispatch(RankingStoreStats(response.body))
  }

export const $openAndfetchByHistogram =
  (props: {
    type: "device" | "query" | "country" | "source" | "page"
  }): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di, lang } = getState()

    const pathname = di.LocationService.getPathname()
    const fullUrl = di.LocationService.getFullUrl()

    const [websiteId, rootPath] = pathname.split("/").filter(Boolean).reverse()

    dispatch(RankingHistogramModalSetType({ value: props.type }))
    dispatch(RankingHistogramModalSetFetching({ value: true }))
    dispatch(RankingHistogramModalSetToggle({ value: true }))

    const { source, query, country, device, from, to, orderBy, page } =
      getFiltersFromUrl({
        url: fullUrl,
      })

    const response = await di.WebsitesRepository.fetchStatsHistogram({
      website: websiteId,
      filter: {
        source,
        query,
        country,
        device,
        from,
        to,
        page,
      },
      orderBy,
      page: 0,
      type: props.type,
    })

    dispatch(RankingHistogramModalSetFetching({ value: false }))

    if (response.error) {
      return dispatch(
        actions.notifications.create({
          message: response.code,
          type: "error",
        })
      )
    }

    dispatch(RankingStoreStatsHistogram(response.body))
  }

export const $RankingStoreFilter =
  (props: {
    type: "query" | "country" | "device" | "source" | "date" | "page"
    value: string
  }): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di, websites, lang } = getState()

    if (!websites.activeWebsite) return

    const url = new URL(di.LocationService.getFullUrl())
    const feature = getWebsiteIdFromUrl(url.pathname).feature

    if (feature === "keywords") {
      url.pathname = normalizeUrl({
        url: `/analytics/${websites.activeWebsite}`,
        locale: lang.lang,
      })
      url.searchParams.set("orderBy", "position")
    }

    if (feature === "opportunities") {
      url.pathname = normalizeUrl({
        url: `/analytics/${websites.activeWebsite}`,
        locale: lang.lang,
      })
      url.searchParams.set("orderBy", "impressions")
    }

    if (
      url.searchParams.has(props.type) &&
      url.searchParams.get(props.type) === props.value
    ) {
      url.searchParams.delete(props.type)
    } else if (url.searchParams.has(props.type)) {
      url.searchParams.delete(props.type)
    } else {
      url.searchParams.append(props.type, props.value)
    }

    di.LocationService.navigate(url.toString(), {
      disableScroll: feature === "analytics",
    })

    dispatch(actions.analytics.$fetch())
  }

export const $RankingSetDate =
  (props: {
    period: string | null
    date: string | null
  }): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di, websites } = getState()

    const { feature } = getWebsiteIdFromUrl(di.LocationService.getFullUrl())

    if (feature === "analytics" && !websites.activeWebsite) return

    const url = new URL(di.LocationService.getFullUrl())

    if (props.period === null) {
      url.searchParams.delete("period")
    } else {
      url.searchParams.set("period", props.period)
      url.searchParams.delete("from")
      url.searchParams.delete("to")
    }

    if (props.date === null) {
      url.searchParams.delete("from")
    } else {
      url.searchParams.set("from", props.date)
      url.searchParams.set("to", props.date)
    }

    di.LocationService.navigate(url.toString(), {
      disableScroll: true,
    })

    if (feature === "analytics") return dispatch(actions.analytics.$fetch())
    if (feature === "show-off") return dispatch(actions.spread.$fetch())
    if (!feature) return dispatch(actions.spread.$fetch())
  }

export const $AnalyticsSubmitCalendar =
  (props: {
    from: string
    to: string
  }): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di, websites } = getState()

    if (!websites.activeWebsite) return

    const url = new URL(di.LocationService.getFullUrl())

    url.searchParams.set("from", props.from)
    url.searchParams.set("to", props.to)
    url.searchParams.delete("period")

    di.LocationService.navigate(url.toString(), {
      disableScroll: true,
    })

    dispatch(actions.analytics.$fetch())

    dispatch(actions.analytics.$AnalyticsCloseCalendar())
  }

export const $AnalyticsOpenCalendar =
  (): ThunkAction<any, RootState, any, any> => (dispatch, getState) => {
    const { di } = getState()
    const url = new URL(di.LocationService.getFullUrl())

    url.searchParams.set("calendar", "true")

    di.LocationService.navigate(url.toString(), {
      disableScroll: true,
    })
  }

export const $AnalyticsCloseCalendar =
  (): ThunkAction<any, RootState, any, any> => (dispatch, getState) => {
    const { di } = getState()

    const url = new URL(di.LocationService.getFullUrl())

    url.searchParams.delete("calendar")

    di.LocationService.navigate(url.toString(), {
      disableScroll: true,
    })
  }

export const $RankingSetOneDayDate =
  (props: { date: string }): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di, websites, analytics } = getState()

    if (!websites.activeWebsite) return

    const url = new URL(di.LocationService.getFullUrl())
    const from = url.searchParams.get("from")
    const to = url.searchParams.get("to")
    const period = url.searchParams.get("period")

    if (props.date === from && props.date === to) {
      di.LocationService.navigate(analytics.previousFilterUrl || url.pathname, {
        disableScroll: true,
      })

      dispatch(actions.analytics.AnalyticsStorePreviousUrl({ value: null }))

      return dispatch(actions.analytics.$fetch())
    }

    dispatch(
      actions.analytics.AnalyticsStorePreviousUrl({ value: url.toString() })
    )

    if (period) url.searchParams.delete("period")
    if (from) url.searchParams.delete("from")
    if (to) url.searchParams.delete("to")

    url.searchParams.set("from", props.date)
    url.searchParams.set("to", props.date)

    di.LocationService.navigate(url.toString(), {
      disableScroll: true,
    })

    dispatch(actions.analytics.$fetch())
  }

export const $RankingStoreOrderBy =
  (
    orderBy: "clicks" | "impressions" | "position" | "click_through_rate"
  ): ThunkAction<any, RootState, any, any> =>
  (dispatch, getState) => {
    const { di } = getState()

    const url = new URL(di.LocationService.getFullUrl())

    url.searchParams.set("orderBy", orderBy)

    dispatch(RankingStoreOrderBy({ value: orderBy }))

    di.LocationService.navigate(url.toString(), {
      disableScroll: true,
    })

    dispatch(actions.analytics.$fetch())
  }

export const $RankingStoreAnalyticsToastDataLateAccepted =
  (): ThunkAction<any, RootState, any, any> => (dispatch, getState) => {
    const { di } = getState()
    di.LocalStorageService.store(localStorageKeys.TOASTER_ACCEPTED, "true")
    dispatch(RankingSetToastAccepted({ value: true }))
  }

export const $RankingFetchAnalyticsToastDataLateAccepted =
  (): ThunkAction<any, RootState, any, any> => (dispatch, getState) => {
    const { di } = getState()
    const accepted = Boolean(
      di.LocalStorageService.get(localStorageKeys.TOASTER_ACCEPTED)
    )
    dispatch(RankingSetToastAccepted({ value: accepted }))
  }

export const $onPreviousPeriod =
  (): ThunkAction<any, RootState, any, any> => (dispatch, getState) => {
    const { di, websites } = getState()

    const { feature } = getWebsiteIdFromUrl(di.LocationService.getFullUrl())

    if (feature === "analytics" && !websites.activeWebsite) return

    const period =
      new URL(di.LocationService.getFullUrl()).searchParams.get("period") || ""

    const { from, to } = moveDate({
      url: di.LocationService.getFullUrl(),
      direction: "past",
      period,
    })

    const url = new URL(di.LocationService.getFullUrl())

    url.searchParams.set("from", from)
    url.searchParams.set("to", to)

    di.LocationService.navigate(url.toString(), {
      disableScroll: true,
    })

    if (feature === "analytics") return dispatch(actions.analytics.$fetch())
    if (feature === "show-off") return dispatch(actions.spread.$fetch())
    if (!feature) return dispatch(actions.spread.$fetch())
  }

export const $onNextPeriod =
  (): ThunkAction<any, RootState, any, any> => (dispatch, getState) => {
    const { di, websites } = getState()

    const { feature } = getWebsiteIdFromUrl(di.LocationService.getFullUrl())

    if (feature === "analytics" && !websites.activeWebsite) return

    const period =
      new URL(di.LocationService.getFullUrl()).searchParams.get("period") || ""

    const { from, to } = moveDate({
      url: di.LocationService.getFullUrl(),
      direction: "future",
      period: period,
    })

    const url = new URL(di.LocationService.getFullUrl())

    url.searchParams.set("from", from)
    url.searchParams.set("to", to)

    di.LocationService.navigate(url.toString(), {
      disableScroll: true,
    })

    if (feature === "analytics") return dispatch(actions.analytics.$fetch())
    if (feature === "show-off") return dispatch(actions.spread.$fetch())
    if (!feature) return dispatch(actions.spread.$fetch())
  }

/**
 *
 *
 *
 *
 *
 * ACTIVATE
 *
 *
 *
 *
 *
 */

export const AnalyticsSetAnalyticsDiscoverModalIsFetching = (
  payload: types.AnalyticsSetAnalyticsDiscoverModalIsFetchingAction["payload"]
): types.RankingActionTypes => ({
  type: types.AnalyticsSetAnalyticsDiscoverModalIsFetching,
  payload,
})

export const AnalyticsSetAnalyticsDiscoverModalIsOpen =
  (
    payload: types.AnalyticsSetAnalyticsDiscoverModalIsOpenAction["payload"]
  ): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di, websites, lang } = getState()
    const url = di.LocationService.getFullUrl()
    const id = "#analytics-activate-modal=true"

    if (payload.value === true) {
      di.LocationService.navigate(url.concat(id))
    } else {
      di.LocationService.navigate(di.LocationService.getPathname())
    }
  }
