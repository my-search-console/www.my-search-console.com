import { WebsiteEntity } from "@my-search-console/interfaces"

export const WebsitePremium: WebsiteEntity = {
  id: "www.sudoku.academy",
  search_console_domain: "sudoku.academy",
}

export const WebsiteForDemo: WebsiteEntity = {
  id: "www.japon-et-decouvertes.fr",
  search_console_domain: "www.japon-et-decouvertes.fr",
}

export const WebsiteNotActivated: WebsiteEntity = {
  id: "already_activated:false",
  search_console_domain: "sc-domain:already_activated:false",
}

export const WebsiteActivated: WebsiteEntity = {
  search_console_domain: "sc-domain:already_activated:true",
  id: "already_activated:true",
}

export const WebsiteNoSitemap: WebsiteEntity = {
  search_console_domain: "sc-domain:sitemap:false",
  id: "sitemap:false",
}

export const WebsiteNotActivatedAndNotPremium: WebsiteEntity = {
  search_console_domain: "sc-domain:WebsiteNotActivatedAndNotPremium",
  id: "WebsiteNotActivatedAndNotPremium",
}

export const WebsiteNoCredentials: WebsiteEntity = {
  search_console_domain: "sc-domain:www.no-credentials.fr",
  id: "www.no-credentials.fr",
}

export const WebsiteNotAnalyticsActivated: WebsiteEntity = {
  search_console_domain: "sc-domain:www.no-analytics_activated.fr",
  id: "www.no-analytics.fr",
}

export const WebsitesBasic: WebsiteEntity[] = [WebsitePremium]

export const AllWebsiteSeeds: WebsiteEntity[] = [
  ...WebsitesBasic,
  WebsiteForDemo,
  WebsiteNoSitemap,
  WebsiteNotAnalyticsActivated,
]
