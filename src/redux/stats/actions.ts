import { ThunkAction } from "redux-thunk"
import { actions } from "../actions"
import { RootState } from "../store"
import * as types from "./types"

export const StatsIndexationStateSetFetching = (
  payload: types.StatsIndexationStateSetFetchingAction["payload"]
): types.StatsActionTypes => ({
  type: types.StatsIndexationStateSetFetching,
  payload,
})

export const StatsIndexationStateStore = (
  payload: types.StatsIndexationStateStoreAction["payload"]
): types.StatsActionTypes => ({
  type: types.StatsIndexationStateStore,
  payload,
})

export const StatsWebsiteIndexationStateSetFetching = (
  payload: types.StatsWebsiteIndexationStateSetFetchingAction["payload"]
): types.StatsActionTypes => ({
  type: types.StatsWebsiteIndexationStateSetFetching,
  payload,
})

export const StatsWebsiteIndexationStateStore = (
  payload: types.StatsWebsiteIndexationStateStoreAction["payload"]
): types.StatsActionTypes => ({
  type: types.StatsWebsiteIndexationStateStore,
  payload,
})

export const $StatsIndexationStateFetch =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di } = getState()

    dispatcher(actions.stats.StatsIndexationStateSetFetching(true))

    const response = await di.StatsRepository.IndexationStateFetch()

    dispatcher(actions.stats.StatsIndexationStateSetFetching(false))

    if (response.error) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatcher(actions.stats.StatsIndexationStateStore(response.body))
  }

export const $StatsWebsiteIndexationStateFetch =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, websites } = getState()

    dispatcher(actions.stats.StatsWebsiteIndexationStateSetFetching(true))

    const response = await di.StatsRepository.IndexationWebsiteStateFetch({
      websiteId: websites.activeWebsite as string,
    })

    dispatcher(actions.stats.StatsWebsiteIndexationStateSetFetching(false))

    if (response.error) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatcher(actions.stats.StatsWebsiteIndexationStateStore(response.body))
  }
