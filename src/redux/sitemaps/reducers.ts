import { CrawlResponse } from "../../interfaces/ISitemapsService"
import * as types from "./types"

interface SitemapsState {
  sitemaps: CrawlResponse | null
  isLoading: boolean
}

const initialState: SitemapsState = {
  sitemaps: null,
  isLoading: false,
}

export function sitemapsReducer(
  state = initialState,
  action: types.SitemapsActionTypes
): SitemapsState {
  if (action.type === types.SitemapsSetLoading) {
    return {
      ...state,
      isLoading: action.payload.value,
    }
  }

  if (action.type === types.SitemapsStoreSitemaps) {
    return {
      ...state,
      sitemaps: action.payload.sitemap,
    }
  }

  return state
}
