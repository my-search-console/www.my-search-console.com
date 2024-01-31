import { OpportunityEntity } from "@my-search-console/interfaces"
import { IRepositoryResponse } from "./IApiResponse"

export interface IOpportunitiesRepository {
  fetch(params: {
    website: string
  }): Promise<IRepositoryResponse<OpportunityEntity[]>>
}
