import { IRepositoryResponse } from "./IApiResponse"

export interface StatsIndexationThroughTimeStatEntity {
  date: Date
  pages_indexed: number
  pages_not_indexed: number
}

export interface StatsIndexationThroughTimeEntity {
  pfk_user_id: string
  data: StatsIndexationThroughTimeStatEntity[]
  created_at: Date
  updated_at: Date
}

export interface StatsWebsiteIndexationThroughTimeEntity {
  pfk_website_id: string
  data: StatsIndexationThroughTimeStatEntity[]
  created_at: Date
  updated_at: Date
}

export type IndexationStateFetchResponse =
  IRepositoryResponse<StatsIndexationThroughTimeEntity>

export type WebsiteIndexationStateFetchResponse =
  IRepositoryResponse<StatsWebsiteIndexationThroughTimeEntity>

export interface IStatsRepository {
  IndexationStateFetch(): Promise<IndexationStateFetchResponse>
  IndexationWebsiteStateFetch(params: {
    websiteId: string
  }): Promise<WebsiteIndexationStateFetchResponse>
}
