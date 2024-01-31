import { ErrorEntity } from "@my-search-console/interfaces"
import { InternalErrorEntity } from "./InternalErrorEntity"

export enum NotificationMessageEntity {
  WEBSITES_CREATE_SUCCESS = "websites/success/create",
  WEBSITES_ALREADY_REFRESHING = "websites/already-refreshing",
  FOUDROYER_PAYMENT_SUCCESS = "payment/success",
  BUILDER_PAYMENT_SUCCESS = "builder/payment/create",
  SYNC_SUCCESS = "websites/success/sync",
  WEBSITES_UPDATE_SUCCESS = "websites/success/update",
  WEBSITES_SITEMAP_UPDATE_SUCCESS = "websites/sitemap/update/empty",
  WEBSITES_NOT_SELECTED = "websites/not-selected",
  WEBSITES_SITEMAP_UPDATE_EMPTY = "websites/sitemap/update/empty",
  WEBSITES_CREDENTIALS_UPDATE_EMPTY = "websites/credentials/update/empty",
  INDEXATION_SUCCESS = "indexation/success",
  INDEXATION_NO_FILTER_SELECTED = "indexation/notifications/no-filter-selected",
  KEYWORDS_ADD_SUCCESS = "keywords/add/success",
  WEBSITES_DELETED = "notifications/website-removed",
}

export type NotificationEntity = {
  type: "info" | "success" | "error" | "warning"
  message: ErrorEntity | InternalErrorEntity | NotificationMessageEntity
  id: number
  timeout?: number
  onValidate?: Function
}
