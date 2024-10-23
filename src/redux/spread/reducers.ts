import {
  RankingOrderByType,
  RankingStatsForFrontend,
} from "../../entities/RankingWebsiteEntity"
import { createFakeDataForSpread } from "../../utils/spread/create-fake-data"
import * as types from "./types"

export interface SpreadState {
  isFetching: boolean
  stats: RankingStatsForFrontend
  type: RankingOrderByType
  isRealUserData: boolean
  ladder: any[]
  sources: {
    google: {
      clicks: number
      impressions: number
      activated: boolean
    }
    bing: {
      clicks: number
      impressions: number
      activated: boolean
    }
    yandex: {
      clicks: number
      impressions: number
      activated: boolean
    }
  }
  websites: Array<{
    id: string
    clicks: number
    impressions: number
    timeline: RankingStatsForFrontend["date"]
  }>
}

const initialState: SpreadState = {
  isFetching: false,
  stats: {
    global: createFakeDataForSpread().global,
    date: createFakeDataForSpread().date,
    sources: createFakeDataForSpread().sources,
    sources_trending_down: [],
    devices: createFakeDataForSpread().devices,
    devices_trending_down: [],
    pages: createFakeDataForSpread().pages,
    pages_trending_down: [],
    query: createFakeDataForSpread().query,
    query_trending_down: [],
    countries: createFakeDataForSpread().countries,
    countries_trending_down: [],
    google: createFakeDataForSpread().google,
    yandex: createFakeDataForSpread().yandex,
    bing: createFakeDataForSpread().bing,
  },
  isRealUserData: false,
  type: "clicks",
  ladder: [],
  websites: [],
  sources: {
    google: {
      clicks: 0,
      impressions: 0,
      activated: false,
    },
    bing: {
      clicks: 0,
      impressions: 0,
      activated: false,
    },
    yandex: {
      clicks: 0,
      impressions: 0,
      activated: false,
    },
  },
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

  if (action.type === types.SpreadStoreLadder) {
    return {
      ...state,
      ladder: action.payload,
    }
  }

  if (action.type === types.SpreadStoreWebsites) {
    return {
      ...state,
      websites: action.payload,
    }
  }

  if (action.type === types.SpreadStoreSources) {
    return {
      ...state,
      sources: action.payload,
    }
  }

  return state
}
