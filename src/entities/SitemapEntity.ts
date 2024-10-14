import { CrawlResponse } from "../interfaces/ISitemapsService"

export type SitemapEntity = {
  id: number
  fk_website_id: string
  url: string
  synced_at: Date | null
  synced_error_message: string | null
  tree: CrawlResponse
}
