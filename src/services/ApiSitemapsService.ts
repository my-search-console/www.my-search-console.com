import { IRepositoryResponse } from "../interfaces/IApiResponse"
import { CrawlResponse, ISitemapsService } from "../interfaces/ISitemapsService"
import { ApiService } from "./ApiService"

export class ApiSitemapsService implements ISitemapsService {
  constructor(private apiService: ApiService) {}

  async fetch(params: {
    url: string
  }): Promise<IRepositoryResponse<CrawlResponse>> {
    const response = await this.apiService.post<CrawlResponse>(
      `/sitemap/free-tool/run`,
      params
    )

    if (response.data.statusCode !== 200)
      return {
        error: true,
        code: response.data.message,
      }

    return { error: false, body: response.data }
  }
}
