import { OpportunityEntity } from "@my-search-console/interfaces"
import { IRepositoryResponse } from "../interfaces/IApiResponse"
import { IOpportunitiesRepository } from "../interfaces/IOpportunitiesRepository"

export class InMemoryOpportunitiesRepository
  implements IOpportunitiesRepository
{
  private opportunities: Array<OpportunityEntity> = []

  __storeOpportunities(params: { opportunities: OpportunityEntity[] }) {
    for (let opportunity of params.opportunities) {
      this.opportunities.push(opportunity)
    }
  }

  fetch(): Promise<IRepositoryResponse<OpportunityEntity[]>> {
    return Promise.resolve({
      error: false,
      body: this.opportunities,
    })
  }
}
