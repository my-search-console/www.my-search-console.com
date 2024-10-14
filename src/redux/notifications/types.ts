import { NotificationEntity } from "../../entities/NotificationEntity"

export const store = "REDUX_NOTIFICATIONS_STORE"
export const remove = "REDUX_NOTIFICATIONS_REMOVE"

export interface storeAction {
  type: typeof store
  payload: NotificationEntity
}

export interface removeAction {
  type: typeof remove
  payload: { id: NotificationEntity["id"] }
}

export type NotificationsActionTypes = storeAction | removeAction
