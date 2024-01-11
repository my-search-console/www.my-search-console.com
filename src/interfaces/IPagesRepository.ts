import {
  IndexationQueueEntity,
  IndexationQueueStatus,
  IndexationSourceType,
  IndexationType,
  PageEntity,
} from "@foudroyer/interfaces"
import { IRepositoryResponse } from "./IApiResponse"

export type FilterParams = {
  filter: {
    website: string
    indexation: PageEntity["indexation_state"] | null
    from: Date | null
    to: Date | null
    sort: "asc" | "desc"
    offset: number
    limit: number
    search?: string | null
    searchRule?: "contains" | "not-contains" | "starts_with" | "ends_with"
    hideRequestIndexingState: boolean
  }
}

export type FetchResponse = IRepositoryResponse<{
  pages: PageEntity[]
  total: number
  stats: {
    total: number
    [IndexationType.INDEXED]: number
    [IndexationType.NOT_INDEXED]: number
    [IndexationType.INDEXING]: number
  }
}>

export type SendAdvancedFilterPagesToQueueResponse = IRepositoryResponse<null>
export type SubmitManuallyPagesResponse = IRepositoryResponse<null>

export type IndexationAutoFetchResponse = IRepositoryResponse<{
  searchEngines: {
    google: boolean
    yandex: boolean
    naver: boolean
    bing: boolean
  }
  isActive: boolean
}>

export type IndexationAutoSaveResponse = IRepositoryResponse<any>
export type IndexationAutoFetchQueueResponse = IRepositoryResponse<{
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
}>

export type IndexationReportFetchQueueResponse = IRepositoryResponse<{
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
}>

export interface IPagesRepository {
  fetch(params: FilterParams): Promise<FetchResponse>

  /**
   *
   * Indexation Auto
   *
   */

  IndexationAutoFetch(params: {
    websiteId: string
  }): Promise<IndexationAutoFetchResponse>

  IndexationAutoFetchQueue(params: {
    websiteId: string
    status?: IndexationQueueStatus | null
  }): Promise<IndexationAutoFetchQueueResponse>

  IndexationReportFetchQueue(params: {
    websiteId: string
    isIndexed?: boolean | null
  }): Promise<IndexationReportFetchQueueResponse>

  IndexationAutoSave(params: {
    websiteId: string
    body: {
      isActive: boolean
      searchEngines: {
        google: boolean
        yandex: boolean
        naver: boolean
        bing: boolean
      }
    }
  }): Promise<IndexationAutoSaveResponse>

  SendAdvancedFilterPagesToQueue(
    params: FilterParams & { sources: IndexationSourceType[] }
  ): Promise<SendAdvancedFilterPagesToQueueResponse>

  SubmitManuallyPages(params: {
    pages: string[]
    websiteId: string
  }): Promise<SubmitManuallyPagesResponse>
}
