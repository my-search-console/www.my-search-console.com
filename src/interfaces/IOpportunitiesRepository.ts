import { OpportunityEntity } from "@foudroyer/interfaces"
import { IRepositoryResponse } from "./IApiResponse"

export interface IOpportunitiesRepository {
  fetch(params: {
    website: string
  }): Promise<IRepositoryResponse<OpportunityEntity[]>>
}
