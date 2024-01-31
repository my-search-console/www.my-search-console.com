import {
  IndexationQueueEntity,
  IndexationSourceType,
  PageEntity,
} from "@my-search-console/interfaces"
import { uniqWith } from "ramda"
import {
  FetchResponse,
  FilterParams,
  IPagesRepository,
  IndexationAutoFetchQueueResponse,
  IndexationAutoFetchResponse,
  IndexationAutoSaveResponse,
  IndexationReportFetchQueueResponse,
  SendAdvancedFilterPagesToQueueResponse,
  SubmitManuallyPagesResponse,
} from "../interfaces/IPagesRepository"

export class InMemoryPagesRepository implements IPagesRepository {
  async IndexationReportFetchQueue(params: {
    websiteId: string
    isIndexed?: boolean | null | undefined
  }): Promise<IndexationReportFetchQueueResponse> {
    const pages = this.pages.filter(
      (page) =>
        page.fk_website_id === params.websiteId &&
        (params.isIndexed === undefined ||
          (page.indexation_state === "indexed") === params.isIndexed)
    )

    const indexedPages = pages.filter(
      (page) => page.indexation_state === "indexed"
    )

    const notIndexedPages = pages.filter(
      (page) => page.indexation_state === "not-indexed"
    )

    const graph = indexedPages.reduce(
      (acc, page) => {
        const date = new Date(page.updated_at!)
        const dateIndex = acc.findIndex(
          (item) => item.date.getTime() === date.getTime()
        )

        if (dateIndex === -1) {
          acc.push({
            date,
            indexed: 1,
            notIndexed: 0,
          })
        } else {
          acc[dateIndex].indexed++
        }

        return acc
      },
      notIndexedPages.reduce((acc, page) => {
        const date = new Date(page.updated_at!)
        const dateIndex = acc.findIndex(
          (item) => item.date.getTime() === date.getTime()
        )

        if (dateIndex === -1) {
          acc.push({
            date,
            indexed: 0,
            notIndexed: 1,
          })
        } else {
          acc[dateIndex].notIndexed++
        }

        return acc
      }, [] as { date: Date; indexed: number; notIndexed: number }[])
    )

    return {
      error: false,
      body: {
        pages: [],
        stats: {
          total: pages.length,
          indexed: indexedPages.length,
          notIndexed: notIndexedPages.length,
        },
        graph,
      },
    }
  }

  async SendAdvancedFilterPagesToQueue(
    params: FilterParams & { sources: IndexationSourceType[] }
  ): Promise<SendAdvancedFilterPagesToQueueResponse> {
    return { error: false, body: null }
  }

  SubmitManuallyPages(params: {
    pages: string[]
    websiteId: string
  }): Promise<SubmitManuallyPagesResponse> {
    throw new Error("Method not implemented.")
  }

  private pages: PageEntity[] = []
  private autoIndexation: Map<
    string,
    {
      isActive: boolean
      searchEngines: {
        google: boolean
        yandex: boolean
        bing: boolean
        naver: boolean
      }
    }
  > = new Map()
  private queue: IndexationQueueEntity[] = []

  async _storeQueue(
    queue: IndexationQueueEntity[]
  ): Promise<{ success: boolean }> {
    this.queue = queue

    return { success: true }
  }

  async IndexationAutoFetchQueue(params: {
    websiteId: string
  }): Promise<IndexationAutoFetchQueueResponse> {
    return {
      error: false,
      body: {
        pages: [],
        stats: {
          done: 0,
          queue: 800,
          total: 0,
        },
        graph: [],
      },
    }
  }

  async _store(pagesToStore: PageEntity[]): Promise<{ success: boolean }> {
    this.pages = uniqWith<PageEntity, PageEntity>((a, b) => a.url === b.url)([
      ...this.pages,
      ...pagesToStore,
    ])

    return { success: true }
  }

  async fetch(params: FilterParams): Promise<FetchResponse> {
    const pages = this.pages
      .filter(({ indexation_state, updated_at, url }) => {
        if (params.filter.search && !url.includes(params.filter.search))
          return false

        if (
          params.filter.indexation &&
          params.filter.indexation !== indexation_state
        ) {
          return false
        }

        if (params.filter.from) {
          if (!updated_at) return false
          if (params.filter.from > updated_at) return false
        }

        if (params.filter.to) {
          if (!updated_at) return false
          if (params.filter.to < updated_at) return false
        }

        return true
      })
      .sort((a, b) => {
        if (params.filter.sort === "asc")
          return (a.updated_at?.valueOf() || 0) - (b.updated_at?.valueOf() || 0)

        return (b.updated_at?.valueOf() || 0) - (a.updated_at?.valueOf() || 0)
      })

    return {
      error: false,
      body: {
        pages: pages.slice(
          (params.filter.offset - 1) * params.filter.limit,
          params.filter.offset * params.filter.limit
        ),
        total: pages.length,
        stats: {
          "not-indexed": 108,
          indexed: 208,
          indexing: 1,
          total: 317,
        },
      },
    }
  }

  private IndexationAutoFetchResponses: Map<
    string,
    IndexationAutoFetchResponse
  > = new Map()

  __storeIndexationAuto(
    websiteId: string,
    response: {
      searchEngines: {
        google: boolean
        bing: boolean
        yandex: boolean
        naver: boolean
      }
      isActive: boolean
    }
  ) {
    this.autoIndexation.set(websiteId, response)
  }

  async IndexationAutoFetch(params: {
    websiteId: string
  }): Promise<IndexationAutoFetchResponse> {
    const response = this.autoIndexation.get(params.websiteId)

    if (response)
      return {
        error: false,
        body: response,
      }

    return {
      error: false,
      body: {
        isActive: false,
        searchEngines: {
          bing: false,
          google: false,
          yandex: false,
          naver: false,
        },
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
    this.__storeIndexationAuto(params.websiteId, params.body)

    return {
      error: false,
      body: {},
    }
  }
}
