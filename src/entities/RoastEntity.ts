import { IssueEntity } from "./IssueEntity"

export type RoastEntity = {
  id: string
  url: string
  google_search_console_domain: string
  favicon: string
}

export type RoastWithReportEntity = RoastEntity & {
  robots: IssueEntity[]
  server: IssueEntity[]
  sitemap: IssueEntity[]
  indexation: IssueEntity[]
}
