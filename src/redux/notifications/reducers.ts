import { NotificationEntity } from "../../entities/NotificationEntity"
import * as types from "./types"

interface NotificationsState {
  notifications: Array<NotificationEntity>
}

const initialState: NotificationsState = {
  notifications: [],
}

export function notificationsReducer(
  state = initialState,
  action: types.NotificationsActionTypes
): NotificationsState {
  if (action.type === types.store) {
    return {
      ...state,
      notifications: [...state.notifications, { ...action.payload }],
    }
  }

  if (action.type === types.remove) {
    const notifications = state.notifications.filter((notification) => {
      return notification.id !== action.payload.id
    })

    return { notifications }
  }

  return state
}
