import {
  RankingOrderByType,
  RankingStatEntity,
  RankingStatsForFrontend,
} from "../../entities/RankingWebsiteEntity"
import * as types from "./types"

export interface RankingState {
  isFetching: boolean
  filter: string | null
  stats: RankingStatsForFrontend
  orderBy: RankingOrderByType
  histogramModal: {
    type: "device" | "query" | "country" | "source" | "page"
    isOpen: boolean
    isFetching: boolean
    stats: RankingStatEntity[]
  }
  analyticsDiscoverModal: {
    isOpen: boolean
    isFetching: boolean
  }
  isFinished: boolean
  histogramView: RankingOrderByType
  analyticsToastDataLateAccepted: boolean
  analyticsComingSoonModal: {
    isOpen: boolean
  }
  previousFilterUrl: string | null
}

const initialState: RankingState = {
  isFetching: false,
  filter: null,
  isFinished: true,
  orderBy: "clicks",
  histogramModal: {
    type: "device",
    isOpen: false,
    isFetching: false,
    stats: [],
  },
  analyticsDiscoverModal: {
    isOpen: false,
    isFetching: false,
  },
  histogramView: "clicks",
  stats: {
    global: {
      click_through_rate: 0,
      clicks: 0,
      impressions: 0,
      position: 0,
      previous_clicks: 0,
      previous_click_through_rate: 0,
      previous_impressions: 0,
      previous_position: 0,
    },
    query: [],
    sources: [],
    devices: [],
    date: [],
    countries: [],
    pages: [],
    sources_trending_down: [],
    devices_trending_down: [],
    pages_trending_down: [],
    query_trending_down: [],
    countries_trending_down: [],
    google: [],
    yandex: [],
    bing: [],
  },
  analyticsToastDataLateAccepted: true,
  analyticsComingSoonModal: {
    isOpen: false,
  },
  previousFilterUrl: null,
}

export function rankingReducer(
  state = initialState,
  action: types.RankingActionTypes
): RankingState {
  if (action.type === types.RankingSetAnalyticsToastDataLateAccepted) {
    return {
      ...state,
      analyticsToastDataLateAccepted: action.payload.value,
    }
  }

  if (action.type === types.AnalyticsStorePreviousUrl) {
    return {
      ...state,
      previousFilterUrl: action.payload.value,
    }
  }

  if (action.type === types.RankingSetFetching) {
    return {
      ...state,
      isFetching: action.payload.value,
    }
  }

  if (action.type === types.AnalyticsSetAnalyticsComingSoonModalIsOpen) {
    return {
      ...state,
      analyticsComingSoonModal: {
        ...state.analyticsComingSoonModal,
        isOpen: action.payload.value,
      },
    }
  }

  /**
   *
   *
   * ACTIVATE MODAL
   *
   *
   */

  if (action.type === types.AnalyticsSetAnalyticsDiscoverModalIsOpen) {
    return {
      ...state,
      analyticsDiscoverModal: {
        ...state.analyticsDiscoverModal,
        isOpen: action.payload.value,
      },
    }
  }

  if (action.type === types.AnalyticsSetAnalyticsDiscoverModalIsFetching) {
    return {
      ...state,
      analyticsDiscoverModal: {
        ...state.analyticsDiscoverModal,
        isFetching: action.payload.value,
      },
    }
  }

  if (action.type === types.RankingSetHistogramView) {
    return {
      ...state,
      histogramView: action.payload.value,
    }
  }

  if (action.type === types.RankingStoreFilterQuery) {
    return {
      ...state,
      filter: action.payload.value,
    }
  }

  if (action.type === types.RankingStoreOrderBy) {
    return {
      ...state,
      orderBy: action.payload.value,
      histogramView: action.payload.value,
    }
  }

  if (action.type === types.RankingStoreStats) {
    return {
      ...state,
      stats: action.payload,
    }
  }

  if (action.type === types.AnalyticsStoreIsFinishedStatus) {
    return {
      ...state,
      isFinished: action.payload.value,
    }
  }

  if (action.type === types.RankingHistogramModalSetType) {
    return {
      ...state,
      histogramModal: {
        ...state.histogramModal,
        type: action.payload.value,
      },
    }
  }

  if (action.type === types.RankingHistogramModalSetFetching) {
    return {
      ...state,
      histogramModal: {
        ...state.histogramModal,
        isFetching: action.payload.value,
      },
    }
  }

  if (action.type === types.RankingHistogramModalSetToggle) {
    return {
      ...state,
      histogramModal: {
        ...state.histogramModal,
        isOpen: action.payload.value,
      },
    }
  }

  if (action.type === types.RankingStoreStatsHistogram) {
    return {
      ...state,
      histogramModal: {
        ...state.histogramModal,
        stats: action.payload,
      },
    }
  }

  return state
}
