import {
  IndexationQueueEntity,
  IndexationQueueStatus,
  IndexationSettingsEntity,
  IndexationSourceType,
  IndexationType,
  PageEntity,
} from "@foudroyer/interfaces"
import {
  FetchResponse,
  FilterParams,
  IndexationAutoFetchQueueResponse,
  IndexationAutoFetchResponse,
  IndexationAutoSaveResponse,
  IndexationReportFetchQueueResponse,
  IPagesRepository,
  SendAdvancedFilterPagesToQueueResponse,
  SubmitManuallyPagesResponse,
} from "../interfaces/IPagesRepository"
import { ApiService } from "../services/ApiService"

export class ApiPagesRepository implements IPagesRepository {
  constructor(private apiService: ApiService) {}

  async IndexationAutoFetchQueue(params: {
    websiteId: string
    status?: IndexationQueueStatus | null
  }): Promise<IndexationAutoFetchQueueResponse> {
    const response = await this.apiService.post<{
      total: number
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
    }>("/indexation/queue", {
      websiteId: params.websiteId,
      limit: 50,
      status: params.status,
    })

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }

    return {
      error: false,
      body: {
        pages: response.data.pages,
        stats: response.data.stats,
        graph: response.data.graph,
      },
    }
  }

  async IndexationReportFetchQueue(params: {
    websiteId: string
    isIndexed: boolean | null
  }): Promise<IndexationReportFetchQueueResponse> {
    const response = await this.apiService.post<{
      total: number
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
    }>("/indexation/report", {
      websiteId: params.websiteId,
      limit: 50,
      isIndexed: params.isIndexed,
    })

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }

    return {
      error: false,
      body: {
        pages: response.data.pages,
        stats: response.data.stats,
        graph: response.data.graph,
      },
    }
  }

  async fetch(params: FilterParams): Promise<FetchResponse> {
    const url = `/pages?website=${params.filter.website}&limit=${
      params.filter.limit || 50
    }${
      params.filter.indexation ? `&indexation=${params.filter.indexation}` : ""
    }${
      params.filter.searchRule ? `&searchRule=${params.filter.searchRule}` : ""
    }${params.filter.from ? `&from=${params.filter.from.toISOString()}` : ""}${
      params.filter.to ? `&to=${params.filter.to.toISOString()}` : ""
    }${
      params.filter.hideRequestIndexingState
        ? `&hideRequestIndexingState=true`
        : ""
    }${
      params.filter.search
        ? `&search=${encodeURIComponent(params.filter.search)}`
        : ""
    }${params.filter.offset ? `&offset=${params.filter.offset}` : ""}`

    const response = await this.apiService.get<{
      pages: PageEntity[]
      total: number
      stats: {
        total: number
        [IndexationType.INDEXED]: number
        [IndexationType.NOT_INDEXED]: number
        [IndexationType.INDEXING]: number
      }
    }>(url)

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }

    return {
      error: false,
      body: { ...response.data, total: Number(response.data.total) },
    }
  }

  async SubmitManuallyPages(params: {
    pages: string[]
    websiteId: string
  }): Promise<SubmitManuallyPagesResponse> {
    const url = `/pages/add-pages-manually`

    const response = await this.apiService.post<void>(url, {
      pages: params.pages,
      websiteId: params.websiteId,
    })

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }

    return {
      error: false,
      body: null,
    }
  }

  async SendAdvancedFilterPagesToQueue(
    params: FilterParams & { sources: IndexationSourceType[] }
  ): Promise<SendAdvancedFilterPagesToQueueResponse> {
    const url = `/indexation/filters-to-queue`

    const response = await this.apiService.post<void>(url, {
      ...params.filter,
      sources: params.sources,
    })

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }

    return {
      error: false,
      body: null,
    }
  }

  async SendAdvancedFilterPagesToCheck(
    params: FilterParams & { sources: IndexationSourceType[] }
  ): Promise<SendAdvancedFilterPagesToQueueResponse> {
    const url = `/indexation/filters-to-check`

    const response = await this.apiService.post<void>(url, {
      ...params.filter,
      sources: params.sources,
    })

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }

    return {
      error: false,
      body: null,
    }
  }

  async IndexationAutoFetch(params: {
    websiteId: string
  }): Promise<IndexationAutoFetchResponse> {
    const url = `/indexation/settings`

    const response = await this.apiService.post<IndexationSettingsEntity>(url, {
      websiteId: params.websiteId,
    })

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }

    return {
      error: false,
      body: {
        isActive: response.data.indexation_auto_activated,
        searchEngines: response.data.sources.reduce(
          (acc, value) => {
            // @ts-ignore
            acc[value] = true
            return acc
          },
          {
            google: false,
            yandex: false,
            naver: false,
            bing: false,
          }
        ),
      },
    }
  }

  async IndexationAutoSave(params: {
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
  }): Promise<IndexationAutoSaveResponse> {
    const url = `/indexation/settings`

    const sources = Object.keys(params.body.searchEngines).filter(
      (engine) => params.body.searchEngines[engine]
    )

    const response = await this.apiService.put<IndexationSettingsEntity>(url, {
      websiteId: params.websiteId,
      sources,
      indexation_auto_activated: params.body.isActive,
    })

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }

    return {
      error: false,
      body: response.data,
    }
  }

  async IndexationSourceToggle(params: {
    websiteId: string
    source: IndexationSourceType
  }): Promise<IndexationAutoSaveResponse> {
    const url = `/indexation/settings/toggle-source`

    const response = await this.apiService.put<IndexationSettingsEntity>(url, {
      websiteId: params.websiteId,
      source: params.source,
    })

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }

    return {
      error: false,
      body: response.data,
    }
  }
}
