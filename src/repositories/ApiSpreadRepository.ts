import { ErrorEntity } from "@my-search-console/interfaces"
import {
  ISpreadRepository,
  StatsResponse,
  StatsResponseBody,
} from "../interfaces/ISpreadRepository"

import { ApiService } from "../services/ApiService"

export class ApiSpreadRepository implements ISpreadRepository {
  constructor(private apiService: ApiService) {}

  async fetch(props: { from: string; to: string }): Promise<StatsResponse> {
    try {
      const response = await this.apiService.post<StatsResponseBody>(
        `/spread`,
        {
          from: props.from,
          to: props.to,
        }
      )

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }
}
