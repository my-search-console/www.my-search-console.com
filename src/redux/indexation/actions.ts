import { IndexationSearchEngines } from "./../../entities/SearchEngineEntity"
import dayjs from "dayjs"
import * as types from "./types"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"
import { actions } from "../actions"
import {
  ErrorEntity,
  IndexationSourceType,
  IndexationType,
  PageEntity,
  WebsiteEntity,
} from "@foudroyer/interfaces"
import { NotificationMessageEntity } from "../../entities/NotificationEntity"
import delay from "delay"
import { getWebsiteIdFromUrl } from "../../utils/getWebsiteIdFromUrl"
import { InternalErrorEntity } from "../../entities/InternalErrorEntity"
import { localStorageKeys } from "../../constants/localStorageKeys"

export const store = (
  payload: types.StoreAction["payload"]
): types.IndexationActionTypes => ({
  type: types.Store,
  payload,
})

export const IndexationReset = (): types.IndexationActionTypes => ({
  type: types.IndexationReset,
})

export const IndexationStoreStats = (
  payload: types.IndexationStoreStatsAction["payload"]
): types.IndexationActionTypes => ({
  type: types.IndexationStoreStats,
  payload,
})

export const IndexationSetOnboardingModalSeen = (
  payload: types.IndexationSetOnboardingModalSeenAction["payload"]
): types.IndexationActionTypes => ({
  type: types.IndexationSetOnboardingModalSeen,
  payload,
})

export const $IndexationStoreOnboardingModalSeen =
  (): ThunkAction<any, RootState, any, any> => (dispatch, getState) => {
    const { di } = getState()
    di.LocalStorageService.store(
      localStorageKeys.INDEXATION_ONBOARDING_SEEN,
      "true"
    )
    dispatch(IndexationSetOnboardingModalSeen({ value: true }))
  }

export const $IndexationFetchOnboardingModalSeen =
  (): ThunkAction<any, RootState, any, any> => (dispatch, getState) => {
    const { di } = getState()
    const seen = Boolean(
      di.LocalStorageService.get(localStorageKeys.INDEXATION_ONBOARDING_SEEN)
    )
    dispatch(IndexationSetOnboardingModalSeen({ value: seen }))
  }

export const IndexationSetOnboardingModalIsOpen = (
  payload: types.IndexationSetOnboardingModalIsOpenAction["payload"]
): types.IndexationActionTypes => ({
  type: types.IndexationSetOnboardingModalIsOpen,
  payload,
})

export const IndexationSitemapToastToggle = (
  payload?: types.IndexationSitemapToastToggleAction["payload"]
): types.IndexationActionTypes => ({
  type: types.IndexationSitemapToastToggle,
  payload,
})

export const storeRecentlyUpdatedPages = (
  payload: types.StoreRecentlyAction["payload"]
): types.IndexationActionTypes => ({
  type: types.StoreRecently,
  payload,
})

export const ToggleFilterPanel = (): types.IndexationActionTypes => ({
  type: types.ToggleFilterPanel,
})

export const togglePageInfo = (
  payload: types.TogglePageInfoAction["payload"]
): types.IndexationActionTypes => ({
  type: types.TogglePageInfo,
  payload,
})

export const toggleAllPageInfo = (): types.IndexationActionTypes => ({
  type: types.ToggleAllPageInfo,
})

export const $toggleFilter =
  (payload: IndexationType | null): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { indexation } = getState()

    dispatcher(
      actions.indexation.filter.fields.update({
        type: "indexation_state",
        value:
          indexation.filter.panel.applied.indexation_state === payload
            ? null
            : payload,
      })
    )
    dispatcher(actions.indexation.filter.fields.$apply())
  }

export const ToggleFilterRequestIndexing = (): types.IndexationActionTypes => ({
  type: types.ToggleFilterRequestIndexing,
})

export const $ToggleFilterRequestIndexing =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { payments } = getState()

    if (payments.plans.size === 0) {
      return dispatcher(
        actions.payments.$PaymentsOpenModal({
          value: true,
          type: "indexation",
          source: "indexation/filter-indexing",
        })
      )
    }

    dispatcher(ToggleFilterRequestIndexing())
    dispatcher($fetch())
  }

export const add = (
  payload: types.AddAction["payload"]
): types.IndexationActionTypes => ({
  type: types.Add,
  payload,
})

export const setIndexingState = (
  payload: types.PagesSetIndexingStateAction["payload"]
): types.IndexationActionTypes => ({
  type: types.PagesSetIndexingState,
  payload,
})

export const addIndexingCount = (
  payload: types.PagesAddIndexingCountAction["payload"]
): types.IndexationActionTypes => ({
  type: types.PagesAddIndexingCount,
  payload,
})

export const setFetching = (
  payload: types.SetFetchingAction["payload"]
): types.IndexationActionTypes => ({
  type: types.SetFetching,
  payload,
})

export const setFetchingRecently = (
  payload: types.SetFetchingRecentlyAction["payload"]
): types.IndexationActionTypes => ({
  type: types.SetFetchingRecently,
  payload,
})

export const addPagesSetFetching = (
  payload: types.SetAddPagesFetchingAction["payload"]
): types.IndexationActionTypes => ({
  type: types.SetAddPagesFetching,
  payload,
})

export const setAddPagesModalOpen = (
  payload: types.SetAddPagesModalOpenAction["payload"]
): types.IndexationActionTypes => ({
  type: types.SetAddPagesModalOpen,
  payload,
})

export const updateAddPagesModalValue = (
  payload: types.UpdateAddPagesModalValueAction["payload"]
): types.IndexationActionTypes => ({
  type: types.UpdateAddPagesModalValue,
  payload,
})

export const PagesIndexationUpdateIndexingState = (
  payload: types.PagesIndexationUpdateIndexingStateAction["payload"]
): types.IndexationActionTypes => ({
  type: types.PagesIndexationUpdateIndexingState,
  payload,
})

export const PagesIndexationRemoveIndexingState = (
  payload: types.PagesIndexationRemoveIndexingStateAction["payload"]
): types.IndexationActionTypes => ({
  type: types.PagesIndexationRemoveIndexingState,
  payload,
})

export const PagesIndexationAddOnePageOnQueueStats = (
  payload: types.PagesIndexationAddOnePageOnQueueStatsAction["payload"]
): types.IndexationActionTypes => ({
  type: types.PagesIndexationAddOnePageOnQueueStats,
  payload,
})

export const IndexationAutoSetFetching = (
  payload: types.IndexationAutoSetFetchingAction["payload"]
): types.IndexationActionTypes => ({
  type: types.IndexationAutoSetFetching,
  payload,
})

export const $fetchWithSearch =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, indexation } = getState()

    di.AnalyticsService.send({
      category: "pages",
      action: "search",
      data: {
        query: indexation.filterNameValue,
      },
    })

    if (indexation.fetching) return true

    dispatcher(pagination.reset())
    dispatcher($fetch())
  }

export const applyFilter = (): types.IndexationActionTypes => ({
  type: types.ApplyFilter,
})

export const FilterByName = (
  payload: types.FilterByNameAction["payload"]
): types.IndexationActionTypes => ({
  type: types.FilterByName,
  payload,
})

export const $filterByName =
  (
    payload: types.FilterByNameAction["payload"]
  ): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    dispatcher(FilterByName(payload))
    dispatcher($fetch())
  }

export const indexProcessingSetFetching = (
  payload: types.IndexProcessingSetFetchingAction["payload"]
): types.IndexationActionTypes => ({
  type: types.IndexProcessingSetFetching,
  payload,
})

export const indexProcessingSetError = (
  payload: types.IndexProcessingSetErrorAction["payload"]
): types.IndexationActionTypes => ({
  type: types.IndexProcessingSetError,
  payload,
})

export const indexProcessingIncrementNumberProcessed =
  (): types.IndexationActionTypes => ({
    type: types.IndexProcessingIncrementNumberProcessed,
  })

/*********************************************************
 *
 * Add Manually Pages
 *
 *********************************************************/

export const IndexationAddManuallyPagesIsFetching = (
  payload: types.IndexationAddManuallyPagesIsFetchingAction["payload"]
): types.IndexationActionTypes => ({
  type: types.IndexationAddManuallyPagesIsFetching,
  payload,
})

export const IndexationAddManuallyPagesStoreValue = (
  payload: types.IndexationAddManuallyPagesStoreValueAction["payload"]
): types.IndexationActionTypes => ({
  type: types.IndexationAddManuallyPagesStoreValue,
  payload,
})

export const $IndexationAddManuallySubmit =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const {
      di,
      indexation,
      websites: { website },
    } = getState()

    const pages = indexation.addManuallyPages.value?.split("\n").filter(Boolean)

    if (pages.length === 0) return
    if (!website) return

    dispatcher(
      actions.indexation.IndexationAddManuallyPagesIsFetching({ value: true })
    )

    const response = await di.PagesRepository.SubmitManuallyPages({
      pages,
      websiteId: website.id,
    })

    dispatcher(
      actions.indexation.IndexationAddManuallyPagesIsFetching({ value: false })
    )

    if (response.error === true) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatcher(
      actions.indexation.IndexationAddManuallyPagesStoreValue({ value: "" })
    )
    dispatcher(
      actions.notifications.create({
        message: NotificationMessageEntity.SYNC_SUCCESS,
        type: "success",
      })
    )
  }

// ********************************************************* /

export const $index =
  (
    page: PageEntity,
    skipDelay?: boolean
  ): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    const {
      di,
      websites: { website },
      payments,
      indexation: pages,
    } = getState()

    if (!website) return false

    const getSourcesToIndexOn =
      website.indexation_auto_activated_sources as IndexationSearchEngines[]

    if (getSourcesToIndexOn.length === 0) {
      return dispatcher(IndexationToggleSearchEngineModal({ value: true }))
    }

    getSourcesToIndexOn.forEach((type) => {
      dispatcher(
        PagesIndexationUpdateIndexingState({
          id: page.url,
          state: { [type]: "loading" },
        })
      )
    })

    const mode = payments.plans.size === 0 ? "manual" : "queue"

    const response = await di.IndexationService.index({
      url: page.url,
      websiteId: page.fk_website_id,
      types: getSourcesToIndexOn,
      mode: mode,
    })

    if (response.error === true) {
      dispatcher(PagesIndexationRemoveIndexingState({ id: page.url }))

      if (response.code === ErrorEntity.GOOGLE_INDEXATION_TRIAL_EXPIRED) {
        dispatcher(
          actions.payments.$PaymentsOpenModal({
            value: true,
            type: "indexation",
            source: "indexation/trial-expired",
          })
        )
      } else if (response.code === ErrorEntity.GOOGLE_INDEXATION_QUOTA_EXCEED) {
        dispatcher(
          actions.payments.$PaymentsOpenModal({
            value: true,
            type: "indexation",
            source: "indexation/quota",
          })
        )
      } else if (
        response.code === ErrorEntity.GOOGLE_CLOUD_API_KEY_PERMISSION_DENIED
      ) {
        dispatcher(
          actions.websites.setCredentialsIsOpen({ value: true, website })
        )
        return dispatcher(
          actions.notifications.create({
            type: "error",
            message: response.code,
          })
        )
      } else {
        dispatcher(
          actions.notifications.create({
            type: "error",
            message: response.code,
          })
        )
      }
    } else {
      di.AnalyticsService.send({
        category: "indexation",
        action: "index",
        data: {
          google: pages.filter.google,
          bing: pages.filter.bing,
          yandex: pages.filter.yandex,
          naver: pages.filter.naver,
        },
      })

      dispatcher(
        PagesIndexationAddOnePageOnQueueStats({
          oldState: page.indexation_state,
        })
      )

      dispatcher(
        setIndexingState({
          url: page.url,
          state:
            mode === "queue"
              ? IndexationType.INDEXING
              : IndexationType.SUBMITTED,
        })
      )

      if (!skipDelay) await delay(1000)

      dispatcher(
        PagesIndexationUpdateIndexingState({
          id: page.url,
          state: { finished: true },
        })
      )

      if (!skipDelay) await delay(2000)

      dispatcher(PagesIndexationRemoveIndexingState({ id: page.url }))
    }
  }

const updateAllIndexingState = (params: {
  pages: PageEntity[]
  sources: IndexationSearchEngines[]
  state: "loading" | "finished"
  dispatcher: any
}) => {
  const { pages, sources, state, dispatcher } = params

  pages.forEach((page) => {
    sources.forEach((source) => {
      dispatcher(
        PagesIndexationUpdateIndexingState({
          id: page.url,
          state: { [source]: state },
        })
      )
    })
  })
}

export const $indexAll =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const {
      indexation: pages,
      payments,
      websites: { website },
      di,
    } = getState()

    if (!website) return false

    const sources =
      website.indexation_auto_activated_sources as IndexationSearchEngines[]

    try {
      if (sources.length === 0) {
        return dispatcher(
          actions.notifications.create({
            type: "warning",
            message: NotificationMessageEntity.INDEXATION_NO_FILTER_SELECTED,
          })
        )
      }

      if (payments.plans.size === 0) {
        return dispatcher(
          actions.payments.$PaymentsOpenModal({
            value: true,
            type: "indexation",
            source: "indexation/index-all",
          })
        )
      }

      dispatcher(actions.indexation.setFetching({ fetching: true }))

      await di.PagesRepository.SendAdvancedFilterPagesToQueue({
        filter: {
          website: website.id,
          indexation: pages.filter.panel.applied.indexation_state,
          from: pages.filter.panel.applied.from,
          to: pages.filter.panel.applied.to,
          limit: 100000000000,
          offset: pages.pagination.page,
          sort: "desc",
          search: pages.filter.panel.applied.search_value,
          searchRule: pages.filter.panel.applied.search_rule,
          hideRequestIndexingState:
            !pages.filter.panel.applied.show_indexed_pages,
        },
        sources,
      })

      await delay(3000)

      dispatcher(actions.indexation.setFetching({ fetching: false }))

      updateAllIndexingState({
        pages: pages.pages,
        sources,
        state: "finished",
        dispatcher,
      })

      pages.pages.forEach(({ url }) => {
        dispatcher(dispatcher(PagesIndexationRemoveIndexingState({ id: url })))
      })

      dispatcher(actions.modal.$openIndexAllSuccess())

      dispatcher(actions.indexation.filter.fields.$reset())
    } catch (error) {}
  }

/*********************************************************
 *
 * Pagination
 *
 *********************************************************/

export const pagination = {
  reset: (): types.IndexationActionTypes => ({
    type: types.resetPagination,
  }),
  total: {
    update: (
      payload: types.storeTotalAction["payload"]
    ): types.IndexationActionTypes => ({
      type: types.storeTotal,
      payload,
    }),
  },
  limit: {
    update: (
      payload: types.paginationLimitUpdateAction["payload"]
    ): types.IndexationActionTypes => ({
      type: types.paginationLimitUpdate,
      payload,
    }),
  },
  $next:
    (): ThunkAction<any, RootState, any, any> =>
    async (dispatcher, getState) => {
      const { indexation: pages } = getState()
      const total = pages.pagination.total
      const limit = pages.pagination.limit
      const nextPage = pages.pagination.page + 1

      if (Math.ceil(total / limit) < nextPage) return false

      dispatcher(pagination.page.update({ value: nextPage }))
      dispatcher($fetch())
      try {
        const anchor = document.querySelector("#pagination-anchor-scroll")
        if (anchor) {
          anchor.scrollIntoView()
        }
      } catch (e) {}
    },
  $previous:
    (): ThunkAction<any, RootState, any, any> =>
    async (dispatcher, getState) => {
      const { indexation: pages } = getState()
      const previousPage = pages.pagination.page - 1

      if (previousPage <= 0) return false

      dispatcher(pagination.page.update({ value: previousPage }))
      dispatcher($fetch())

      try {
        const anchor = document.querySelector("#pagination-anchor-scroll")
        if (anchor) {
          anchor.scrollIntoView()
        }
      } catch (e) {}
    },
  $select:
    (page: number): ThunkAction<any, RootState, any, any> =>
    async (dispatcher, getState) => {
      dispatcher(pagination.page.update({ value: page }))
      dispatcher($fetch())
      try {
        const anchor = document.querySelector("#pagination-anchor-scroll")

        if (anchor) {
          anchor.scrollIntoView()
        }
      } catch (e) {}
    },
  page: {
    update: (
      payload: types.paginationUpdateAction["payload"]
    ): types.IndexationActionTypes => ({
      type: types.paginationUpdate,
      payload,
    }),
  },
}

export const filter = {
  fields: {
    update: (
      payload: types.FilterFieldsUpdateAction["payload"]
    ): types.IndexationActionTypes => ({
      type: types.FilterFieldsUpdate,
      payload,
    }),
    reset: (): types.IndexationActionTypes => ({
      type: types.FilterFieldsReset,
    }),
    apply: (): types.IndexationActionTypes => ({
      type: types.FilterFieldsApply,
    }),
    $apply:
      (): ThunkAction<any, RootState, any, any> =>
      async (dispatcher, getState) => {
        dispatcher(filter.fields.apply())
        dispatcher($fetch())
      },
    $reset:
      (): ThunkAction<any, RootState, any, any> =>
      async (dispatcher, getState) => {
        dispatcher(filter.fields.reset())
        dispatcher(filter.fields.$apply())
      },
  },
}

export const $fetch =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, indexation: pages, payments, auth } = getState()

    const pathname = di.LocationService.getPathname()

    const { websiteId } = getWebsiteIdFromUrl(pathname)

    if (!websiteId) return false

    dispatcher(setFetching({ fetching: true }))

    const response = await di.PagesRepository.fetch({
      filter: {
        website: websiteId,
        indexation: pages.filter.panel.applied.indexation_state,
        from: pages.filter.panel.applied.from,
        to: pages.filter.panel.applied.to,
        limit: pages.pagination.limit,
        offset: pages.pagination.page,
        sort: "desc",
        search: pages.filter.panel.applied.search_value,
        searchRule: pages.filter.panel.applied.search_rule,
        hideRequestIndexingState:
          !pages.filter.panel.applied.show_indexed_pages,
      },
    })

    if (response.error === true) {
      dispatcher(setFetching({ fetching: false }))
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatcher(store({ pages: [...response.body.pages] }))
    dispatcher(pagination.total.update({ value: response.body.total }))
    dispatcher(actions.indexation.IndexationStoreStats(response.body.stats))
    dispatcher(setFetching({ fetching: false }))
  }

/*********************************************************
 *
 * Auto Indexation
 *
 *********************************************************/

export const IndexationAutoIndexationModalSetIsOpen = (
  payload: types.IndexationAutoIndexationModalSetIsOpenAction["payload"]
): types.IndexationActionTypes => ({
  type: types.IndexationAutoIndexationModalSetIsOpen,
  payload,
})

export const IndexationSwitchView = (
  payload: types.IndexationSwitchViewAction["payload"]
): types.IndexationActionTypes => ({
  type: types.IndexationSwitchView,
  payload,
})

export const $IndexationSwitchView =
  (
    view: "indexation" | "auto" | "report"
  ): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    dispatcher(actions.indexation.IndexationSwitchView({ view }))

    const { indexation } = getState()

    if (indexation.view === "auto") {
      return dispatcher(actions.indexation.$IndexationAutoQueueFetch())
    } else if (indexation.view === "report") {
      return dispatcher(actions.indexation.$IndexationReportQueueFetch())
    }
  }

export const IndexationAutoIndexationModalToggleSource = (
  payload: types.IndexationAutoIndexationModalToggleSourceAction["payload"]
): types.IndexationActionTypes => ({
  type: types.IndexationAutoIndexationModalToggleSource,
  payload,
})

export const $IndexationAutoIndexationModalToggleSource =
  (
    payload: types.IndexationAutoIndexationModalToggleSourceAction["payload"]
  ): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { websites } = getState()

    const website = websites.map.get(websites.activeWebsite || "")

    if (!website) return false

    if (payload.type === "google") {
      if (!websites.areCredentialsGood) {
        return dispatcher(
          actions.websites.setCredentialsIsOpen({ value: true, website })
        )
      }
    } else {
      if (!website.index_now_installed) {
        return dispatcher(
          actions.websites.WebsiteIndexNowModalSetOpen({ value: true, website })
        )
      }
    }

    return dispatcher(
      actions.indexation.IndexationAutoIndexationModalToggleSource(payload)
    )
  }

export const IndexationAutoIndexationModalToggleActivate = (
  payload: types.IndexationAutoIndexationModalToggleActivateAction["payload"]
): types.IndexationActionTypes => ({
  type: types.IndexationAutoIndexationModalToggleActivate,
  payload,
})

export const $IndexationToggle =
  (params: {
    website: WebsiteEntity
    type: "source" | "auto-indexing"
    source?: IndexationSourceType
  }): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, payments } = getState()

    const updateSources = (value: IndexationSourceType) => {
      const sources = params.website.indexation_auto_activated_sources

      if (sources.includes(value)) {
        return sources.filter((source) => source !== value)
      } else {
        return [...sources, value]
      }
    }

    const mustAddGoogleCloudApiKey =
      params.type === "source" &&
      params.source === "google" &&
      params.website.google_api_keys.length === 0
    const mustAddIndexNowKey =
      params.type === "source" &&
      (params.source === "bing" ||
        params.source === "yandex" ||
        params.source === "naver") &&
      !params.website.index_now_installed

    if (mustAddGoogleCloudApiKey) {
      return dispatcher(
        actions.websites.setCredentialsIsOpen({
          value: true,
          website: params.website,
        })
      )
    }
    if (mustAddIndexNowKey) {
      return dispatcher(
        actions.websites.WebsiteIndexNowModalSetOpen({
          value: true,
          website: params.website,
        })
      )
    }

    const autoIndexingValue =
      params.type === "auto-indexing"
        ? !Boolean(params.website.indexation_auto_activated)
        : Boolean(params.website.indexation_auto_activated)
    const sourcesValue =
      params.type === "source" && params.source
        ? updateSources(params.source)
        : params.website.indexation_auto_activated_sources

    if (!params.website) return

    const keys = params.website.indexation_auto_activated_sources

    if (params.type === "auto-indexing") {
      if (!keys.length) {
        return dispatcher(
          actions.indexation.IndexationToggleSearchEngineModal({ value: true })
        )
      }
      if (payments.plans.size === 0) {
        return dispatcher(
          actions.payments.$PaymentsOpenModal({
            value: true,
            type: "indexation",
            source: "indexation/auto-index",
          })
        )
      }
    }

    dispatcher(actions.indexation.IndexationAutoSetFetching({ value: true }))

    const searchEngines = {
      google: sourcesValue.includes("google"),
      yandex: sourcesValue.includes("yandex"),
      bing: sourcesValue.includes("bing"),
      naver: sourcesValue.includes("naver"),
    }

    const isActive = !sourcesValue.length ? false : autoIndexingValue

    const response = await di.PagesRepository.IndexationAutoSave({
      websiteId: params.website.id,
      body: {
        isActive: isActive,
        searchEngines,
      },
    })

    dispatcher(
      actions.websites.updateWebsite({
        website: {
          ...params.website,
          indexation_auto_activated_sources: sourcesValue,
          indexation_auto_activated: isActive,
        },
      })
    )

    dispatcher(actions.indexation.IndexationAutoSetFetching({ value: false }))

    if (response.error) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatcher(
      actions.notifications.create({
        type: "success",
        message: NotificationMessageEntity.SYNC_SUCCESS,
        timeout: 2000,
      })
    )
  }

/**
 *
 * Indexation Queue
 *
 */

export const IndexationAutoQueueStore = (
  payload: types.IndexationAutoQueueStoreAction["payload"]
): types.IndexationActionTypes => ({
  type: types.IndexationAutoQueueStore,
  payload,
})

export const $IndexationAutoQueueFetch =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, websites, indexation } = getState()

    const website = websites.map.get(websites.activeWebsite || "")

    if (!website) return

    dispatcher(actions.indexation.setFetching({ fetching: true }))

    const response = await di.PagesRepository.IndexationAutoFetchQueue({
      websiteId: website.id,
      status: indexation.indexationAuto.filter.status,
    })

    dispatcher(actions.indexation.setFetching({ fetching: false }))

    if (response.error) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatcher(actions.indexation.IndexationAutoQueueStore(response.body))
  }

/**
 *
 * Indexation Report
 *
 */

export const IndexationReportQueueStore = (
  payload: types.IndexationReportQueueStoreAction["payload"]
): types.IndexationActionTypes => ({
  type: types.IndexationReportQueueStore,
  payload,
})

export const $IndexationReportQueueFetch =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const {
      di,
      websites: { website },
      indexation,
    } = getState()

    if (!website) return

    dispatcher(actions.indexation.setFetching({ fetching: true }))

    const response = await di.PagesRepository.IndexationReportFetchQueue({
      websiteId: website.id,
      isIndexed: indexation.indexationReport.filter.isIndexed,
    })

    if (response.error) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    const indexingReport = {
      ...response.body,
      graph:
        response.body.stats.total > 0
          ? response.body.graph
          : Array(30)
              .fill(0)
              .map((item, index) => ({
                ...item,
                date: dayjs()
                  .subtract(30 - index, "day")
                  .format("YYYY-MM-DD"),
                indexed: Math.round((indexation.stats.total / 30) * index),
                notIndexed: Math.round(
                  indexation.stats.total - (indexation.stats.total / 30) * index
                ),
              })),
    }

    dispatcher(actions.indexation.setFetching({ fetching: false }))
    dispatcher(actions.indexation.IndexationReportQueueStore(indexingReport))
  }

export const IndexationToastIndexationStatsStoreAccepted = (
  payload: types.IndexationToastIndexationStatsStoreAcceptedAction["payload"]
): types.IndexationActionTypes => ({
  type: types.IndexationToastIndexationStatsStoreAccepted,
  payload,
})

export const $IndexationToastIndexationStatsFetchAccepted =
  (): ThunkAction<any, RootState, any, any> => (dispatch, getState) => {
    const { di } = getState()
    const accepted = Boolean(
      di.LocalStorageService.get(
        localStorageKeys.INDEXATION_TOAST_STATS_ACCEPTED
      )
    )
    dispatch(
      actions.indexation.IndexationToastIndexationStatsStoreAccepted({
        value: accepted,
      })
    )
  }

export const $IndexationToastIndexationStatsStoreAccepted =
  (): ThunkAction<any, RootState, any, any> => (dispatch, getState) => {
    const { di } = getState()

    di.LocalStorageService.store(
      localStorageKeys.INDEXATION_TOAST_STATS_ACCEPTED,
      "true"
    )

    dispatch(
      actions.indexation.IndexationToastIndexationStatsStoreAccepted({
        value: true,
      })
    )
  }

export const IndexationAutoFilter = (
  payload: types.IndexationAutoFilterAction["payload"]
): types.IndexationActionTypes => ({
  type: types.IndexationAutoFilter,
  payload,
})

export const IndexationReportFilter = (
  payload: types.IndexationReportFilterAction["payload"]
): types.IndexationActionTypes => ({
  type: types.IndexationReportFilter,
  payload,
})

export const $IndexationAutoFilter =
  (
    payload: types.IndexationAutoFilterAction["payload"]
  ): ThunkAction<any, RootState, any, any> =>
  (dispatch, getState) => {
    dispatch(actions.indexation.IndexationAutoFilter(payload))
    dispatch(actions.indexation.$IndexationAutoQueueFetch())
  }

export const $IndexationReportFilter =
  (
    payload: types.IndexationReportFilterAction["payload"]
  ): ThunkAction<any, RootState, any, any> =>
  (dispatch, getState) => {
    dispatch(actions.indexation.IndexationReportFilter(payload))
    dispatch(actions.indexation.$IndexationReportQueueFetch())
  }

/**
 *
 * Manage Google API keys
 *
 */

export const IndexationRemoveGoogleApiKey = (
  payload: types.IndexationRemoveGoogleApiKeyAction["payload"]
): types.IndexationActionTypes => ({
  type: types.IndexationRemoveGoogleApiKey,
  payload,
})

export const $IndexationRemoveGoogleApiKey =
  (
    payload: types.IndexationRemoveGoogleApiKeyAction["payload"]
  ): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const {
      di,
      websites: { website },
    } = getState()

    if (!payload.website) return false

    const response = await di.IndexationService.deleteGoogleApiKey({
      keyId: payload.keyId,
      websiteId: payload.website.id,
    })

    if (response.error) {
      return dispatch(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatch(actions.indexation.IndexationRemoveGoogleApiKey(payload))

    dispatch(
      actions.notifications.create({
        type: "success",
        message: ErrorEntity.WEBSITE_NOT_FOUND,
      })
    )
  }

export const IndexationOpenModalIfTrialExpired = () => {
  return async (dispatch, getState) => {
    const { auth, payments } = getState()

    if (!auth.user) return false

    const isMoreThanThreeDays =
      new Date().getTime() - auth.user.created_at.getTime() > 259200000

    if (payments.plans.size === 0 && isMoreThanThreeDays) {
      return dispatch(
        actions.payments.$PaymentsOpenModal({
          value: true,
          type: "indexation",
          source: "indexation/trial-expired",
        })
      )
    }
  }
}

export const $IndexationDownloadGoogleApiKey =
  (
    payload: types.IndexationDownloadGoogleApiKeyAction["payload"]
  ): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di } = getState()

    const response = await di.IndexationService.downloadGoogleApiKey(payload)

    if (response.error) {
      return dispatch(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }
  }

/*********************************************************
 *
 * Search Engine Modal
 *
 *********************************************************/

export const IndexationToggleSearchEngineModal = (
  payload: types.IndexationToggleSearchEngineModalAction["payload"]
): types.IndexationActionTypes => ({
  type: types.IndexationToggleSearchEngineModal,
  payload,
})
