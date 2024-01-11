import { OpportunityEntity } from "@foudroyer/interfaces"
import * as types from "./types"

export interface OpportunitiesState {
  opportunities: OpportunityEntity[]
  isFetching: boolean
}

const initialState: OpportunitiesState = {
  opportunities: [],
  isFetching: false,
}

export function opportunitiesReducer(
  state = initialState,
  action: types.OpportunitiesActionTypes
): OpportunitiesState {
  if (action.type === types.OpportunitiesStoreOpportunities) {
    return {
      ...state,
      opportunities: action.payload.opportunities,
    }
  }

  if (action.type === types.OpportunitiesSetIsFetching) {
    return {
      ...state,
      isFetching: action.payload.value,
    }
  }

  return state
}
