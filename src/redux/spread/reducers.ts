import { RankingStatsForFrontend } from "../../entities/RankingWebsiteEntity"
import { createFakeDataForSpread } from "../../utils/spread/create-fake-data"
import * as types from "./types"

export interface SpreadState {
  isFetching: boolean
  stats: RankingStatsForFrontend
  isRealUserData: boolean
}

const initialState: SpreadState = {
  isFetching: false,
  stats: createFakeDataForSpread(),
  isRealUserData: false,
}

export function spreadReducer(
  state = initialState,
  action: types.SpreadActionTypes
): SpreadState {
  if (action.type === types.SpreadSetFetching) {
    return {
      ...state,
      isFetching: action.payload.value,
    }
  }

  if (action.type === types.SpreadStoreStats) {
    return {
      ...state,
      stats: action.payload,
      isRealUserData: true,
    }
  }

  return state
}
