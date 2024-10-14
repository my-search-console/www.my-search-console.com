import {
  IndexationStateFetchResponse,
  IStatsRepository,
  StatsIndexationThroughTimeEntity,
  StatsWebsiteIndexationThroughTimeEntity,
  WebsiteIndexationStateFetchResponse,
} from "../interfaces/IStatsRepository"
import { ApiService } from "../services/ApiService"

export class ApiStatsRepository implements IStatsRepository {
  constructor(private apiService: ApiService) {}

  async IndexationStateFetch(): Promise<IndexationStateFetchResponse> {
    const response =
      await this.apiService.post<StatsIndexationThroughTimeEntity>(
        `/stats/indexation_through_time`,
        {}
      )

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }

    return { error: false, body: response.data }
  }

  async IndexationWebsiteStateFetch(params: {
    websiteId: string
  }): Promise<WebsiteIndexationStateFetchResponse> {
    const response =
      await this.apiService.post<StatsWebsiteIndexationThroughTimeEntity>(
        `/stats/websites_indexation_through_time`,
        { websiteId: params.websiteId }
      )

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }

    return { error: false, body: response.data }
  }

  // private async getAuthenticationUrl(
  //   type: "google" | "yandex" | "bing"
  // ): Promise<
  //   { error: true; code: ErrorEntity } | { error: false; body: string }
  // > {
  //   const response = await this.apiService.get<{ url: string }>(
  //     `/auth/${type}/url?callback=${this.getCallbackUrl(type)}`
  //   )

  //   if (response.data.statusCode === 400) {
  //     return { error: true, code: response.data.message }
  //   }

  //   return { error: false, body: response.data.url }
  // }
}
