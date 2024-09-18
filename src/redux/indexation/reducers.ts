import {
  IndexationGoogleCloudApiKeyEntity,
  IndexationQueueEntity,
  IndexationQueueStatus,
  IndexationType,
  PageEntity,
} from "@foudroyer/interfaces"
import { uniqWith } from "ramda"
import * as types from "./types"

interface IndexationState {
  pages: PageEntity[]
  fetching: boolean
  view: "indexation" | "auto" | "report"
  filterNameValue: string
  showSitemapToast: boolean
  toastStatsAccepted: boolean
  isSettingsOpen: boolean
  pagesInIndexingState: Map<
    string,
    {
      google?: "loading" | "finished"
      yandex?: "loading" | "finished"
      bing?: "loading" | "finished"
      naver?: "loading" | "finished"
      finished?: boolean
    }
  >
  pagination: {
    total: number
    page: number
    limit: number
  }
  stats: {
    total: number
    [IndexationType.INDEXED]: number
    [IndexationType.NOT_INDEXED]: number
    [IndexationType.INDEXING]: number
  }
  filter: {
    google: boolean
    yandex: boolean
    naver: boolean
    bing: boolean
    hideRequestIndexingState: boolean
    panel: {
      isOpen: boolean
      fields: {
        from: Date | null
        to: Date | null
        search_rule: "contains" | "not-contains" | "starts_with" | "ends_with"
        search_value: string | null
        indexation_state: IndexationType | null
        show_indexed_pages: boolean
      }
      applied: IndexationState["filter"]["panel"]["fields"]
    }
  }
  indexationAuto: {
    queue: IndexationQueueEntity[]
    filter: {
      status: IndexationQueueStatus | null
    }
    stats: {
      total: number
      [IndexationQueueStatus.done]: number
      [IndexationQueueStatus.queue]: number
    }
    graph: Array<{
      date: Date
      done: number
      queue: number
    }>
  }
  indexationReport: {
    queue: IndexationQueueEntity[]
    filter: {
      isIndexed: boolean | null
    }
    stats: {
      total: number
      indexed: number
      notIndexed: number
    }
    graph: Array<{
      date: Date
      indexed: number
      notIndexed: number
    }>
  }
  indexation_auto_settings_modal: {
    is_open: boolean
    website_id: string | null
    indexation_auto_activated: boolean
    indexation_auto_update_pages_activated: boolean
    submitting: boolean
  }
  autoIndexationModal: {
    isFetching: boolean
    isOpen: boolean
    isActive: boolean
    searchEngines: {
      google: boolean
      yandex: boolean
      naver: boolean
      bing: boolean
    }
  }
  onboardingModal: {
    seen: boolean
    isOpen: boolean
  }
  addManuallyPages: {
    value: string
    isFetching: boolean
  }
  googleKeys: Array<IndexationGoogleCloudApiKeyEntity>
  searchEngineModal: {
    isOpen: boolean
  }
}

const initialState: IndexationState = {
  pages: [],
  view: "indexation",
  toastStatsAccepted: false,
  pagesInIndexingState: new Map(),
  filterNameValue: "",
  fetching: false,
  isSettingsOpen: false,
  pagination: {
    total: 0,
    page: 1,
    limit: 50,
  },
  indexation_auto_settings_modal: {
    is_open: false,
    website_id: null,
    indexation_auto_activated: false,
    indexation_auto_update_pages_activated: false,
    submitting: false,
  },
  stats: {
    total: 0,
    [IndexationType.INDEXED]: 0,
    [IndexationType.NOT_INDEXED]: 0,
    [IndexationType.INDEXING]: 0,
  },
  showSitemapToast: false,
  filter: {
    google: false,
    yandex: false,
    naver: false,
    bing: false,
    hideRequestIndexingState: false,
    panel: {
      isOpen: false,
      fields: {
        from: null,
        to: null,
        search_rule: "contains",
        search_value: null,
        indexation_state: null,
        show_indexed_pages: true,
      },
      applied: {
        from: null,
        to: null,
        search_value: null,
        search_rule: "contains",
        indexation_state: null,
        show_indexed_pages: true,
      },
    },
  },
  indexationAuto: {
    filter: {
      status: null,
    },
    queue: [],
    stats: {
      total: 0,
      [IndexationQueueStatus.done]: 0,
      [IndexationQueueStatus.queue]: 0,
    },
    graph: [],
  },
  indexationReport: {
    filter: {
      isIndexed: null,
    },
    queue: [],
    stats: {
      total: 0,
      indexed: 0,
      notIndexed: 0,
    },
    graph: [],
  },
  addManuallyPages: {
    isFetching: false,
    value: "",
  },
  autoIndexationModal: {
    isFetching: false,
    isOpen: false,
    isActive: false,
    searchEngines: {
      google: false,
      yandex: false,
      naver: false,
      bing: false,
    },
  },
  onboardingModal: {
    seen: true,
    isOpen: false,
  },
  googleKeys: [],
  searchEngineModal: {
    isOpen: false,
  },
}

export function indexationReducer(
  state = initialState,
  action: types.IndexationActionTypes
): IndexationState {
  if (action.type === types.Store) {
    const pages = action.payload.pages

    return {
      ...state,
      pages: pages,
    }
  }

  if (action.type === types.IndexationSetOnboardingModalSeen) {
    return {
      ...state,
      onboardingModal: {
        ...state.onboardingModal,
        seen: action.payload.value,
      },
    }
  }

  if (action.type === types.IndexationAutoSettingsModalSubmitting) {
    return {
      ...state,
      indexation_auto_settings_modal: {
        ...state.indexation_auto_settings_modal,
        submitting: action.payload.value,
      },
    }
  }

  if (action.type === types.IndexationAutoSettingsModalSetIsOpen) {
    return {
      ...state,
      indexation_auto_settings_modal: {
        ...state.indexation_auto_settings_modal,
        is_open: action.payload.is_open,
        website_id: action.payload.website_id,
        indexation_auto_activated: action.payload.indexation_auto_activated,
        indexation_auto_update_pages_activated:
          action.payload.indexation_auto_update_pages_activated,
      },
    }
  }

  if (action.type === types.IndexationAutoSettingsModalClose) {
    return {
      ...state,
      indexation_auto_settings_modal: {
        ...initialState.indexation_auto_settings_modal,
      },
    }
  }

  if (action.type === types.IndexationSettingsToggle) {
    const value = action.payload.hasOwnProperty("value")
      ? action.payload.value
      : !state.isSettingsOpen

    return {
      ...state,
      isSettingsOpen: Boolean(value),
    }
  }

  if (action.type === types.IndexationSetOnboardingModalIsOpen) {
    return {
      ...state,
      onboardingModal: {
        ...state.onboardingModal,
        isOpen: action.payload.value,
      },
    }
  }

  if (action.type === types.IndexationReset) {
    return {
      ...initialState,
    }
  }

  if (action.type === types.IndexationToastIndexationStatsStoreAccepted) {
    return {
      ...state,
      toastStatsAccepted: action.payload.value,
    }
  }

  if (action.type === types.PagesIndexationUpdateIndexingState) {
    const map = new Map(state.pagesInIndexingState.entries())
    const element = map.get(action.payload.id)
    const entity = {
      ...element,
      ...action.payload.state,
    }

    map.set(action.payload.id, {
      ...entity,
    })

    map.get(action.payload.id)

    return {
      ...state,
      pagesInIndexingState: map,
    }
  }

  if (action.type === types.PagesIndexationRemoveIndexingState) {
    const map = new Map(state.pagesInIndexingState.entries())
    map.delete(action.payload.id)

    return {
      ...state,
      pagesInIndexingState: map,
    }
  }

  if (action.type === types.Add) {
    return {
      ...state,
      pages: uniqWith<PageEntity, PageEntity>((a, b) => a.url === b.url)([
        ...action.payload.pages,
        ...state.pages,
      ]),
    }
  }

  if (action.type === types.PagesSetIndexingState) {
    return {
      ...state,
      pages: state.pages.map((page) => ({
        ...page,
        request_indexing_at:
          page.url === action.payload.url
            ? new Date()
            : page.request_indexing_at,
      })),
    }
  }

  if (action.type === types.PagesAddIndexingCount) {
    return {
      ...state,
      stats: {
        ...state.stats,
        [IndexationType.INDEXING]:
          state.stats[IndexationType.INDEXING] + action.payload.count,
      },
    }
  }

  if (action.type === types.SetFetching) {
    return {
      ...state,
      fetching: action.payload.fetching,
    }
  }

  if (action.type === types.FilterByName) {
    return {
      ...state,
      filterNameValue: action.payload.name,
    }
  }

  /*********************************************************
   *
   * Add Manually Pages
   *
   *********************************************************/

  if (action.type === types.IndexationAddManuallyPagesStoreValue) {
    return {
      ...state,
      addManuallyPages: {
        ...state.addManuallyPages,
        value: action.payload.value,
      },
    }
  }

  if (action.type === types.IndexationAddManuallyPagesIsFetching) {
    return {
      ...state,
      addManuallyPages: {
        ...state.addManuallyPages,
        isFetching: action.payload.value,
      },
    }
  }

  /*********************************************************
   *
   * Pagination
   *
   *********************************************************/

  if (action.type === types.paginationLimitUpdate) {
    return {
      ...state,
      pagination: {
        ...state.pagination,
        limit: action.payload.value,
      },
    }
  }

  if (action.type === types.resetPagination) {
    return {
      ...state,
      pagination: {
        ...initialState.pagination,
      },
    }
  }

  if (action.type === types.paginationUpdate) {
    return {
      ...state,
      pagination: {
        ...state.pagination,
        page: action.payload.value,
      },
    }
  }

  if (action.type === types.storeTotal) {
    return {
      ...state,
      pagination: {
        ...state.pagination,
        total: action.payload.value,
      },
    }
  }

  if (action.type === types.IndexationStoreStats) {
    return {
      ...state,
      stats: action.payload,
    }
  }

  if (action.type === types.IndexationSitemapToastToggle) {
    return {
      ...state,
      showSitemapToast: action.payload
        ? action.payload.isOpen
        : !state.showSitemapToast,
    }
  }

  if (action.type === types.IndexationAutoFilter) {
    return {
      ...state,
      indexationAuto: {
        ...state.indexationAuto,
        filter: {
          ...state.indexationAuto.filter,
          status: action.payload.status,
        },
      },
    }
  }

  if (action.type === types.IndexationReportFilter) {
    return {
      ...state,
      indexationReport: {
        ...state.indexationReport,
        filter: {
          ...state.indexationReport.filter,
          isIndexed: action.payload.status,
        },
      },
    }
  }

  if (action.type === types.ToggleFilterRequestIndexing) {
    return {
      ...state,
      pagination: {
        ...initialState.pagination,
      },
      filter: {
        ...state.filter,
        hideRequestIndexingState: !state.filter.hideRequestIndexingState,
      },
    }
  }

  if (action.type === types.FilterFieldsReset) {
    return {
      ...state,

      filter: {
        ...state.filter,
        panel: {
          ...state.filter.panel,
          applied: {
            ...initialState.filter.panel.applied,
          },
          fields: {
            ...initialState.filter.panel.fields,
          },
        },
      },
    }
  }

  /*********************************************************
   *
   * Auto Indexation
   *
   *********************************************************/

  if (action.type === types.IndexationAutoIndexationModalSetIsOpen) {
    return {
      ...state,
      autoIndexationModal: {
        ...state.autoIndexationModal,
        isOpen: action.payload.value,
      },
    }
  }

  if (action.type === types.ToggleFilterPanel) {
    return {
      ...state,
      filter: {
        ...state.filter,
        panel: {
          ...state.filter.panel,
          isOpen: !state.filter.panel.isOpen,
        },
      },
    }
  }

  if (action.type === types.PagesIndexationAddOnePageOnQueueStats) {
    return {
      ...state,
      stats: {
        ...state.stats,
        [action.payload.oldState]: state.stats[action.payload.oldState] - 1,
        indexing: state.stats[IndexationType.INDEXING] + 1,
      },
    }
  }

  if (action.type === types.FilterFieldsUpdate) {
    return {
      ...state,
      filter: {
        ...state.filter,
        panel: {
          ...state.filter.panel,
          fields: {
            ...state.filter.panel.fields,
            [action.payload.type]: action.payload.value,
          },
        },
      },
    }
  }

  if (action.type === types.FilterFieldsApply) {
    return {
      ...state,
      filter: {
        ...state.filter,
        panel: {
          ...state.filter.panel,
          applied: {
            ...state.filter.panel.fields,
          },
        },
      },
    }
  }

  if (action.type === types.IndexationAutoSetFetching) {
    return {
      ...state,
      autoIndexationModal: {
        ...state.autoIndexationModal,
        isFetching: action.payload.value,
      },
    }
  }

  if (action.type === types.IndexationAutoIndexationModalToggleActivate) {
    return {
      ...state,
      autoIndexationModal: {
        ...state.autoIndexationModal,
        isActive: action.payload.value ?? !state.autoIndexationModal.isActive,
      },
    }
  }

  if (action.type === types.IndexationAutoQueueStore) {
    return {
      ...state,
      indexationAuto: {
        ...state.indexationAuto,
        queue: action.payload.pages,
        stats: action.payload.stats,
        graph: action.payload.graph,
      },
    }
  }

  if (action.type === types.IndexationReportQueueStore) {
    return {
      ...state,
      indexationReport: {
        ...state.indexationReport,
        queue: action.payload.pages,
        stats: action.payload.stats,
        graph: action.payload.graph,
      },
    }
  }

  if (action.type === types.IndexationSwitchView) {
    return {
      ...state,
      view: action.payload.view,
    }
  }

  if (action.type === types.IndexationToggleSearchEngineModal) {
    return {
      ...state,
      searchEngineModal: {
        ...state.searchEngineModal,
        isOpen: action.payload.value,
      },
    }
  }

  if (action.type === types.IndexationAutoSettingsModalChange) {
    if (action.payload.key === "indexation_auto_activated") {
      return {
        ...state,
        indexation_auto_settings_modal: {
          ...state.indexation_auto_settings_modal,
          indexation_auto_activated: action.payload.value,
          indexation_auto_update_pages_activated:
            action.payload.value === false
              ? false
              : state.indexation_auto_settings_modal
                  .indexation_auto_update_pages_activated,
        },
      }
    }

    if (action.payload.key === "indexation_auto_update_pages_activated") {
      return {
        ...state,
        indexation_auto_settings_modal: {
          ...state.indexation_auto_settings_modal,
          [action.payload.key]: action.payload.value,
          indexation_auto_activated:
            action.payload.value === true
              ? true
              : state.indexation_auto_settings_modal.indexation_auto_activated,
        },
      }
    }
  }

  return state
}
