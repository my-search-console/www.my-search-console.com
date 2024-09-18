import { IRepositoryResponse } from "./IApiResponse"

export type Line = {
  loc: string
  lastmod: Date | null
  priority: number | null
  sitemap_url: string
}

export type CrawlResponse = {
  url: string
  statusCode: number
  pages: Array<Line>
  type: string
  sitemaps: Array<CrawlResponse>
  numberTotalOfPages: number
}

export interface ISitemapsService {
  fetch(params: { url: string }): Promise<IRepositoryResponse<CrawlResponse>>
}
