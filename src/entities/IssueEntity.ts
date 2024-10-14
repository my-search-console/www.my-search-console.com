export enum IssueTypes {
  robots = "robots",
  server = "server",
  sitemap = "sitemap",
}

export enum IssueNames {
  "robots/crawl-allowed" = "robots/crawl-allowed",
  "robots/empty" = "robots/empty",
  "robots/javascript" = "robots/javascript",

  "server/error" = "server/error",
  "server/not-https" = "server/not-https",
  "server/not-sc-domain/not-same-url" = "server/not-sc-domain/not-same-url",
  "server/not-sc-domain" = "server/not-sc-domain",
  "server/no-index" = "server/no-index",

  "sitemap/no-sitemap" = "sitemap/no-sitemap",
  "sitemap/server-error" = "sitemap/server-error",
  "sitemap/bad-formed" = "sitemap/bad-formed",
  /**
   * Quand il y a une entrée hreflang mais sans la correspondance
   */
  "sitemap/hreflang-without-loc" = "sitemap/hreflang-without-loc",
  "sitemap/contains-external-url" = "sitemap/contains-external-url",
  "sitemap/no-same-website" = "sitemap/no-same-website",
}

export type IssueEntity = {
  id: string
  fk_website_id: string
  type: IssueTypes
  name: IssueNames
  status: "pass" | "dont-pass" | "warning"
  context: any
  created_at: Date
  updated_at: Date
}
