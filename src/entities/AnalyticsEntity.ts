type Base = {
  label?: string
  value?: string
  data?: { [x: string]: string | number | boolean }
}

type PagesEvents = {
  category: "pages"
  action: "search"
  data: {
    query: string
  }
}

export type AuthenticationAnalyticsEntity = Base &
  (
    | {
        category: "authentication"
        action: "logout" | "login"
      }
    | {
        category: "authentication"
        action: "trying_to_connect"
        data: {
          state: string
          error?: string
        }
      }
    | {
        category: "authentication"
        action: "error"
        data: {
          href: string
        }
      }
  )

export type AnalyticsPaymentEntityPaymentSources =
  | "query"
  | "country"
  | "device"
  | "source"
  | "date"
  | "indexation/filter"
  | "indexation/save"
  | "indexation/index-all"
  | "indexation/filter-indexing"
  | "indexation/quota"
  | "indexation/trial-expired"
  | "indexation/add-website"
  | "indexation/auto-index"
  | "landing"
  | "indexation/report"
  | "navbar"
  | "multi-google-search"

export type ModalAnalyticsEntity = Base &
  (
    | {
        category: "modal"
        action: "close"
      }
    | {
        category: "modal"
        action: "open"
        data: {
          type: "payment"
          source: AnalyticsPaymentEntityPaymentSources
        }
      }
  )

export type NewsAnalyticsEntity = Base &
  (
    | {
        category: "news"
        action: "close"
      }
    | {
        category: "news"
        action: "open"
      }
  )

export type ShowoffAnalyticsEntity = Base & {
  category: "show-off"
  action: "download" | "fetch"
}

export type RoastAnalyticsEntity = Base & {
  category: "roast"
  action: "refresh-all"
}

export type PaymentAnalyticsEntity = Base &
  (
    | {
        category: "payment"
        action: "open" | "success" | "close"
      }
    | {
        category: "payment"
        action: "unsubscribe" | "pause"
        data: {
          why: string
        }
      }
  )

export type WebsiteAnalyticsEntity = Base & {
  category: "websites"
  action: "create" | "delete"
}

export type ErrorAnalyticsEntity = Base & {
  category: "error"
  action: "login"
  message: string
}

export type SiteSwitcherAnalyticsEntity = Base & {
  category: "site_switcher"
  action: "switch_site"
}

export type IndexationAnalyticsEntity = Base & {
  category: "indexation"
  action: "index"
  data: {
    google: boolean
    yandex: boolean
    bing: boolean
    naver: boolean
  }
}

export type SitemapyAnalyticsEntity = Base &
  (
    | {
        category: "sitemapy"
        action: "fetch"
        data: {
          url: string
        }
      }
    | {
        category: "sitemapy"
        action: "error"
        data: {
          message: string
        }
      }
  )

export type AnalyticsEntity =
  | SitemapyAnalyticsEntity
  | PagesEvents
  | RoastAnalyticsEntity
  | NewsAnalyticsEntity
  | WebsiteAnalyticsEntity
  | AuthenticationAnalyticsEntity
  | PaymentAnalyticsEntity
  | ErrorAnalyticsEntity
  | IndexationAnalyticsEntity
  | ModalAnalyticsEntity
  | ShowoffAnalyticsEntity
