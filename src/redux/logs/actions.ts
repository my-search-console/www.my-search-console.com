import { ErrorEntity, LogsEntity } from "@foudroyer/interfaces"
import dayjs from "dayjs"
import { ThunkAction } from "redux-thunk"
import { ModalKeys } from "../../entities/ModalEntity"
import { actions } from "../actions"
import { RootState } from "../store"
import * as types from "./types"

export const LogsAddFetchingState = (
  payload: types.LogsAddFetchingStateAction["payload"]
): types.LogsActionTypes => ({
  type: types.LogsAddFetchingState,
  payload,
})

export const LogsRemoveFetchingState = (
  payload: types.LogsRemoveFetchingStateAction["payload"]
): types.LogsActionTypes => ({
  type: types.LogsRemoveFetchingState,
  payload,
})

export const LogsSetFetching = (
  payload: types.LogsSetFetchingAction["payload"]
): types.LogsActionTypes => ({
  type: types.LogsSetFetching,
  payload,
})

export const LogsFormSetFetching = (
  payload: types.LogsFormSetFetchingAction["payload"]
): types.LogsActionTypes => ({
  type: types.LogsFormSetFetching,
  payload,
})

export const LogsStore = (
  payload: types.LogsStoreAction["payload"]
): types.LogsActionTypes => ({
  type: types.LogsStore,
  payload,
})

export const $fetch =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { di, websites, payments, auth } = getState()

    if (!websites.website?.id) {
      return console.error("No website selected")
    }

    dispatch(actions.logs.LogsSetFetching(true))

    const logs = await di.LogsRepository.fetch({
      websiteId: websites.website.id,
    })

    dispatch(actions.logs.LogsSetFetching(false))

    if (logs.error) {
      return dispatch(
        actions.notifications.create({
          type: "error",
          message: logs.code,
        })
      )
    }

    dispatch(actions.logs.LogsStore(logs.body))
  }

export const $open =
  (log?: LogsEntity): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di } = getState()

    const url = new URL(di.LocationService.getFullUrl())

    url.searchParams.append(ModalKeys["logs-create-modal"], "open")

    if (log) {
      url.searchParams.append("id", log.id)
      url.searchParams.append("type", log.type)
      url.searchParams.append("query", log.query || "")
      url.searchParams.append("page", log.page || "")
      url.searchParams.append("title", log.title)
      url.searchParams.append("description", log.description)
      url.searchParams.append("date", dayjs(log.log_date).format("YYYY-MM-DD"))
    }

    di.LocationService.navigate(url.href, { disableScroll: true })
  }

export const $close =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { di, websites, payments, auth } = getState()

    di.LocationService.navigate(di.LocationService.getPathname(), {
      disableScroll: true,
    })
  }

export const $create =
  (log: LogsEntity): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di, websites } = getState()

    if (!websites.website) {
      return dispatch(
        actions.notifications.create({
          type: "error",
          message: ErrorEntity.WEBSITE_NOT_FOUND,
        })
      )
    }

    if (log.title.trim().length === 0) {
      return dispatch(
        actions.notifications.create({
          type: "error",
          // @ts-ignore
          message: "Vous devez aujouter un titre à votre log",
        })
      )
    }

    dispatch(actions.logs.LogsFormSetFetching(true))

    const response = await di.LogsRepository.createOrUpdate({
      ...log,
      fk_website_id: websites.website.id,
    })

    dispatch(actions.logs.LogsFormSetFetching(false))

    if (response.error) {
      return dispatch(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    } else {
      dispatch(
        actions.notifications.create({
          type: "success",
        })
      )
    }

    dispatch(actions.logs.$close())
    dispatch(actions.logs.$fetch())
  }

export const $update =
  (log: LogsEntity): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di, websites, payments, auth } = getState()

    await dispatch(actions.logs.$create(log))
  }

export const $delete =
  (id: LogsEntity["id"]): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di } = getState()

    dispatch(actions.logs.LogsFormSetFetching(true))

    const response = await di.LogsRepository.delete(id)

    dispatch(actions.logs.LogsFormSetFetching(false))

    if (response.error) {
      return dispatch(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatch(actions.logs.$fetch())
  }

export const $sync =
  (id: LogsEntity["id"]): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di } = getState()

    dispatch(actions.logs.LogsAddFetchingState(id))

    const response = await di.LogsRepository.sync(id)

    dispatch(actions.logs.LogsRemoveFetchingState(id))

    if (response.error) {
      return dispatch(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatch(actions.logs.$fetch())
  }
