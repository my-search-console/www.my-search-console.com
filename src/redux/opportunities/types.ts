import { OpportunityEntity } from "@my-search-console/interfaces"

export const OpportunitiesSetIsFetching = "OpportunitiesSetIsFetching"
export interface OpportunitiesSetIsFetchingAction {
  type: typeof OpportunitiesSetIsFetching
  payload: {
    value: boolean
  }
}

export const OpportunitiesStoreOpportunities = "OpportunitiesStoreOpportunities"
export interface OpportunitiesStoreOpportunitiesAction {
  type: typeof OpportunitiesStoreOpportunities
  payload: {
    opportunities: OpportunityEntity[]
  }
}

export type OpportunitiesActionTypes =
  | OpportunitiesSetIsFetchingAction
  | OpportunitiesStoreOpportunitiesAction
