import { ErrorEntity, OpportunityEntity } from "@foudroyer/interfaces"
import { IRepositoryResponse } from "../interfaces/IApiResponse"
import { IOpportunitiesRepository } from "../interfaces/IOpportunitiesRepository"
import { ApiService } from "../services/ApiService"

export class ApiOpportunitiesRepository implements IOpportunitiesRepository {
  constructor(private apiService: ApiService) {}
  async fetch(params: {
    website: string
  }): Promise<IRepositoryResponse<OpportunityEntity[]>> {
    try {
      const response = await this.apiService.post<OpportunityEntity[]>(
        `/opportunities`,
        {
          websiteId: params.website,
        }
      )

      if (response.data.statusCode === 400) {
        return { error: true, code: response.data.message }
      }
      return {
        error: false,
        body: response.data,
      }
    } catch (err) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }
}
