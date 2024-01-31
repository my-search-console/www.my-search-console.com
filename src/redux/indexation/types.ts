import {
  IndexationGoogleCloudApiKeyEntity,
  IndexationQueueEntity,
  IndexationQueueStatus,
  IndexationType,
  PageEntity,
  WebsiteEntity,
} from "@my-search-console/interfaces"
import exp from "constants"
import { IndexationSearchEngines } from "../../entities/SearchEngineEntity"

export const Store = "PAGES_STORE"
export interface StoreAction {
  type: typeof Store
  payload: { pages: PageEntity[] }
}

export const IndexationReset = "IndexationReset"
export interface IndexationResetAction {
  type: typeof IndexationReset
}

export const StoreRecently = "PAGES_STORE_RECENTLY"
export interface StoreRecentlyAction {
  type: typeof StoreRecently
  payload: { pages: PageEntity[] }
}

export const IndexationSetOnboardingModalSeen =
  "IndexationSetOnboardingModalSeen"
export interface IndexationSetOnboardingModalSeenAction {
  type: typeof IndexationSetOnboardingModalSeen
  payload: { value: boolean }
}

export const IndexationSetOnboardingModalIsOpen =
  "IndexationSetOnboardingModalIsOpen"
export interface IndexationSetOnboardingModalIsOpenAction {
  type: typeof IndexationSetOnboardingModalIsOpen
  payload: { value: boolean }
}

/*********************************************************
 *
 * Auto Indexation
 *
 *********************************************************/

export const IndexationAutoIndexationModalSetIsOpen =
  "IndexationAutoIndexationModalSetIsOpen"
export interface IndexationAutoIndexationModalSetIsOpenAction {
  type: typeof IndexationAutoIndexationModalSetIsOpen
  payload: { value: boolean }
}

export const IndexationAutoSetFetching = "IndexationAutoSetFetching"
export interface IndexationAutoSetFetchingAction {
  type: typeof IndexationAutoSetFetching
  payload: { value: boolean }
}

export const IndexationSwitchView = "IndexationSwitchView"
export interface IndexationSwitchViewAction {
  type: typeof IndexationSwitchView
  payload: {
    view: "indexation" | "auto" | "report"
  }
}

export const IndexationToastIndexationStatsStoreAccepted =
  "IndexationToastIndexationStatsStoreAccepted"
export interface IndexationToastIndexationStatsStoreAcceptedAction {
  type: typeof IndexationToastIndexationStatsStoreAccepted
  payload: { value: boolean }
}

export const IndexationAutoIndexationModalToggleSource =
  "IndexationAutoIndexationModalToggleSource"
export interface IndexationAutoIndexationModalToggleSourceAction {
  type: typeof IndexationAutoIndexationModalToggleSource
  payload: {
    type: IndexationSearchEngines
    value?: boolean
    doNotResetIndexationActive?: boolean
  }
}

export const IndexationAutoQueueStore = "IndexationAutoQueueStore"
export interface IndexationAutoQueueStoreAction {
  type: typeof IndexationAutoQueueStore
  payload: {
    pages: IndexationQueueEntity[]
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
}

export const IndexationReportQueueStore = "IndexationReportQueueStore"
export interface IndexationReportQueueStoreAction {
  type: typeof IndexationReportQueueStore
  payload: {
    pages: IndexationQueueEntity[]
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
}

export const IndexationAutoIndexationModalToggleActivate =
  "IndexationAutoIndexationModalToggleActivate"
export interface IndexationAutoIndexationModalToggleActivateAction {
  type: typeof IndexationAutoIndexationModalToggleActivate
  payload: {
    value?: boolean
  }
}

/*********************************************************
 *
 * Pagination
 *
 *********************************************************/

export const paginationLimitUpdate = "pages/paginationLimitUpdate"
export interface paginationLimitUpdateAction {
  type: typeof paginationLimitUpdate
  payload: { value: number }
}

export const paginationUpdate = "pages/paginationUpdate"
export interface paginationUpdateAction {
  type: typeof paginationUpdate
  payload: { value: number }
}

export const storeTotal = "pages/storeTotal"
export interface storeTotalAction {
  type: typeof storeTotal
  payload: { value: number }
}

export const IndexationStoreStats = "IndexationStoreStats"
export interface IndexationStoreStatsAction {
  type: typeof IndexationStoreStats
  payload: {
    total: number
    [IndexationType.INDEXED]: number
    [IndexationType.NOT_INDEXED]: number
    [IndexationType.INDEXING]: number
  }
}

export const resetPagination = "pages/resetPagination"
export interface resetPaginationAction {
  type: typeof resetPagination
}

export const ToggleFilterRequestIndexing = "ToggleFilterRequestIndexing"
export interface ToggleFilterRequestIndexingAction {
  type: typeof ToggleFilterRequestIndexing
}

export const FilterFieldsUpdate = "PAGES_FILTER_FIELDS_UPDATE"
export interface FilterFieldsUpdateAction {
  type: typeof FilterFieldsUpdate
  payload:
    | { type: "from" | "to"; value: Date | null }
    | { type: "sort"; value: "asc" | "desc" }
    | {
        type: "search_rule"
        value: "contains" | "not-contains" | "starts_with" | "ends_with"
      }
    | {
        type: "search_value"
        value: string
      }
    | {
        type: "indexation_state"
        value: IndexationType | null
      }
    | {
        type: "show_indexed_pages"
        value: boolean
      }
}

export const FilterFieldsReset = "PAGES_FILTER_FIELDS_RESET"
export interface FilterFieldsResetAction {
  type: typeof FilterFieldsReset
}

export const FilterFieldsApply = "PAGES_FILTER_FIELDS_APPLY"
export interface FilterFieldsApplyAction {
  type: typeof FilterFieldsApply
}

export const TogglePageInfo = "PAGES_TOGGLE_PAGE_INFO"
export interface TogglePageInfoAction {
  type: typeof TogglePageInfo
  payload: { url: PageEntity["url"] }
}

export const ToggleAllPageInfo = "PAGES_TOGGLE_ALL_PAGE_INFO"
export interface ToggleAllPageInfoAction {
  type: typeof ToggleAllPageInfo
}

export const ToggleFilterPanel = "PAGES_TOGGLE_FILTER_PANEL"
export interface ToggleFilterPanelAction {
  type: typeof ToggleFilterPanel
}

export const Add = "PAGES_ADD"
export interface AddAction {
  type: typeof Add
  payload: { pages: PageEntity[] }
}

export const ApplyFilter = "PAGES_APPLY_FILTER"
export interface ApplyFilterAction {
  type: typeof ApplyFilter
}

export const PagesSetIndexingState = "PAGES_SET_INDEXING_STATE"
export interface PagesSetIndexingStateAction {
  type: typeof PagesSetIndexingState
  payload: { url: string; state: IndexationType }
}

export const PagesAddIndexingCount = "PAGES_ADD_INDEXING_COUNT"
export interface PagesAddIndexingCountAction {
  type: typeof PagesAddIndexingCount
  payload: { count: number }
}

export const SetFetching = "PAGES_SET_FETCHING"
export interface SetFetchingAction {
  type: typeof SetFetching
  payload: { fetching: boolean }
}

export const SetFetchingRecently = "PAGES_SET_FETCHING_RECENTLY"
export interface SetFetchingRecentlyAction {
  type: typeof SetFetchingRecently
  payload: { fetching: boolean }
}

export const SetAddPagesModalOpen = "PAGES_SET_ADD_MODAL_IS_OPEN"
export interface SetAddPagesModalOpenAction {
  type: typeof SetAddPagesModalOpen
  payload: { isOpen: boolean }
}

export const SetAddPagesFetching = "PAGES_ADD_MODAL_FETCHING"
export interface SetAddPagesFetchingAction {
  type: typeof SetAddPagesFetching
  payload: { fetching: boolean }
}

export const UpdateAddPagesModalValue = "PAGES_UPDATE_ADD_PAGES_MODAL_VALUE"
export interface UpdateAddPagesModalValueAction {
  type: typeof UpdateAddPagesModalValue
  payload: { value: string }
}

export const FilterByName = "PAGES_FILTER_BY_NAME"
export interface FilterByNameAction {
  type: typeof FilterByName
  payload: { name: string }
}

/*********************************************************
 *
 * Add Manually Pages
 *
 *********************************************************/

export const IndexationAddManuallyPagesStoreValue =
  "IndexationAddManuallyPagesStoreValue"
export interface IndexationAddManuallyPagesStoreValueAction {
  type: typeof IndexationAddManuallyPagesStoreValue
  payload: { value: string }
}

export const IndexationAddManuallyPagesIsFetching =
  "IndexationAddManuallyPagesIsFetching"
export interface IndexationAddManuallyPagesIsFetchingAction {
  type: typeof IndexationAddManuallyPagesIsFetching
  payload: { value: boolean }
}

/*********************************************************/

export const Remove = "PAGES_REMOVE"
export interface RemoveAction {
  type: typeof Remove
  payload: { id: string }
}

export const IndexProcessingSetFetching = "PAGES_IndexProcessingSetFetching"
export interface IndexProcessingSetFetchingAction {
  type: typeof IndexProcessingSetFetching
  payload: { fetching: boolean }
}

export const IndexProcessingSetError = "PAGES_IndexProcessingSetError"
export interface IndexProcessingSetErrorAction {
  type: typeof IndexProcessingSetError
  payload: { error: string }
}

export const IndexProcessingIncrementNumberProcessed =
  "PAGES_IndexProcessingIncrementNumberProcessed"
export interface IndexProcessingIncrementNumberProcessedAction {
  type: typeof IndexProcessingIncrementNumberProcessed
}

export const PagesIndexationUpdateIndexingState =
  "PagesIndexationUpdateIndexingState"
export interface PagesIndexationUpdateIndexingStateAction {
  type: typeof PagesIndexationUpdateIndexingState
  payload: {
    id: string
    state: {
      google?: "finished" | "loading"
      yandex?: "finished" | "loading"
      bing?: "finished" | "loading"
      finished?: boolean
    }
  }
}

export const PagesIndexationRemoveIndexingState =
  "PagesIndexationRemoveIndexingState"
export interface PagesIndexationRemoveIndexingStateAction {
  type: typeof PagesIndexationRemoveIndexingState
  payload: {
    id: string
  }
}

export const PagesIndexationAddOnePageOnQueueStats =
  "PagesIndexationAddOnePageOnQueueStats"
export interface PagesIndexationAddOnePageOnQueueStatsAction {
  type: typeof PagesIndexationAddOnePageOnQueueStats
  payload: {
    oldState: IndexationType
  }
}

/*********************************************************
 *
 * Source
 *
 *********************************************************/

export const IndexationAutoFilter = "IndexationAutoFilter"
export interface IndexationAutoFilterAction {
  type: typeof IndexationAutoFilter
  payload: {
    status: IndexationQueueStatus | null
  }
}

export const IndexationReportFilter = "IndexationReportFilter"
export interface IndexationReportFilterAction {
  type: typeof IndexationReportFilter
  payload: {
    status: boolean | null
  }
}

export const IndexationSitemapToastToggle = "IndexationSitemapToastToggle"
export interface IndexationSitemapToastToggleAction {
  type: typeof IndexationSitemapToastToggle
  payload?: {
    isOpen: boolean
  }
}

/**
 *
 * Manage Google API keys
 *
 */

export const IndexationRemoveGoogleApiKey = "IndexationRemoveGoogleApiKey"
export interface IndexationRemoveGoogleApiKeyAction {
  type: typeof IndexationRemoveGoogleApiKey
  payload: {
    keyId: string
    website: WebsiteEntity | null
  }
}

export const IndexationDownloadGoogleApiKey = "IndexationDownloadGoogleApiKey"
export interface IndexationDownloadGoogleApiKeyAction {
  type: typeof IndexationDownloadGoogleApiKey
  payload: {
    google_cloud_api_key: string
  }
}

export const IndexationStoreGoogleApiKeys = "IndexationStoreGoogleApiKeys"
export interface IndexationStoreGoogleApiKeysAction {
  type: typeof IndexationStoreGoogleApiKeys
  payload: {
    keys: Array<IndexationGoogleCloudApiKeyEntity>
  }
}

export const IndexationToggleSearchEngineModal =
  "IndexationToogleSearchEngineModal"
export interface IndexationToggleSearchEngineModalAction {
  type: typeof IndexationToggleSearchEngineModal
  payload: {
    value: boolean
  }
}

export type IndexationActionTypes =
  | StoreAction
  | IndexationSitemapToastToggleAction
  | IndexationResetAction
  | AddAction
  | IndexationSetOnboardingModalIsOpenAction
  | IndexationSetOnboardingModalSeenAction
  | PagesIndexationUpdateIndexingStateAction
  | PagesIndexationRemoveIndexingStateAction
  | PagesSetIndexingStateAction
  | PagesAddIndexingCountAction
  | RemoveAction
  | IndexProcessingSetFetchingAction
  | IndexProcessingSetErrorAction
  | IndexProcessingIncrementNumberProcessedAction
  | ApplyFilterAction
  | SetAddPagesFetchingAction
  | SetFetchingAction
  | SetAddPagesModalOpenAction
  | UpdateAddPagesModalValueAction
  | ToggleFilterPanelAction
  | TogglePageInfoAction
  | ToggleAllPageInfoAction
  | FilterFieldsUpdateAction
  | FilterFieldsApplyAction
  | SetFetchingRecentlyAction
  | FilterFieldsResetAction
  | FilterByNameAction
  | StoreRecentlyAction
  | IndexationStoreStatsAction
  | PagesIndexationAddOnePageOnQueueStatsAction
  /*********************************************************
   *
   * Pagination
   *
   *********************************************************/
  | paginationUpdateAction
  | storeTotalAction
  | resetPaginationAction
  | paginationLimitUpdateAction
  /*********************************************************
   *
   * Source
   *
   *********************************************************/
  | ToggleFilterRequestIndexingAction
  /*********************************************************
   *
   * Add Manually Pages
   *
   *********************************************************/
  | IndexationAddManuallyPagesStoreValueAction
  | IndexationAddManuallyPagesIsFetchingAction
  /*********************************************************
   *
   * Indexation Report
   *
   *********************************************************/
  | IndexationReportQueueStoreAction
  | IndexationReportFilterAction
  /*********************************************************
   *
   * AutoIndexation
   *
   *********************************************************/
  | IndexationAutoIndexationModalSetIsOpenAction
  | IndexationAutoIndexationModalToggleSourceAction
  | IndexationAutoIndexationModalToggleActivateAction
  | IndexationToastIndexationStatsStoreAcceptedAction
  | IndexationAutoQueueStoreAction
  | IndexationSwitchViewAction
  | IndexationAutoSetFetchingAction
  | IndexationAutoFilterAction
  /*********************************************************
   *
   * Manage Google API keys
   *
   *********************************************************/
  | IndexationRemoveGoogleApiKeyAction
  | IndexationDownloadGoogleApiKeyAction
  | IndexationStoreGoogleApiKeysAction
  /*********************************************************
   *
   * Search Engine Modal
   *
   *********************************************************/
  | IndexationToggleSearchEngineModalAction
