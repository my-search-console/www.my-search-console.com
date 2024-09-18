import {
  StatsIndexationThroughTimeEntity,
  StatsWebsiteIndexationThroughTimeEntity,
} from "../../interfaces/IStatsRepository"
import * as types from "./types"

interface IndexationState {
  indexationReport: {
    data: StatsIndexationThroughTimeEntity
    isFetching: boolean
  }
  indexationWebsiteReport: {
    data: StatsWebsiteIndexationThroughTimeEntity
    isFetching: boolean
  }
}

const initialState: IndexationState = {
  indexationReport: {
    data: {
      created_at: new Date(),
      data: [],
      pfk_user_id: "",
      updated_at: new Date(),
    },
    isFetching: false,
  },
  indexationWebsiteReport: {
    data: {
      created_at: new Date(),
      data: [],
      pfk_website_id: "",
      updated_at: new Date(),
    },
    isFetching: false,
  },
}

export function statsReducer(
  state = initialState,
  action: types.StatsActionTypes
): IndexationState {
  if (action.type === types.StatsIndexationStateStore) {
    return {
      ...state,
      indexationReport: {
        ...state.indexationReport,
        data: action.payload,
      },
    }
  }

  if (action.type === types.StatsIndexationStateSetFetching) {
    return {
      ...state,
      indexationReport: {
        ...state.indexationReport,
        isFetching: action.payload,
      },
    }
  }

  if (action.type === types.StatsWebsiteIndexationStateSetFetching) {
    return {
      ...state,
      indexationWebsiteReport: {
        ...state.indexationWebsiteReport,
        isFetching: action.payload,
      },
    }
  }

  if (action.type === types.StatsWebsiteIndexationStateStore) {
    return {
      ...state,
      indexationWebsiteReport: {
        ...state.indexationWebsiteReport,
        data: action.payload,
      },
    }
  }

  return state
}
