import { LogsEntity } from "@foudroyer/interfaces"
import {
  ILogsRepository,
  LogsCreateOrUpdateResponse,
  LogsDeleteResponse,
  LogsFetchResponse,
  LogsSyncResponse,
} from "../interfaces/ILogsRepository"
import { ApiService } from "../services/ApiService"

export class ApiLogsRepository implements ILogsRepository {
  constructor(private apiService: ApiService) {}

  async fetch(params: { websiteId: string }): Promise<LogsFetchResponse> {
    const response = await this.apiService.get<LogsEntity[]>(
      `/logs/${params.websiteId}`
    )

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }

    return {
      error: false,
      body: response.data,
    }
  }

  async createOrUpdate(log: LogsEntity): Promise<LogsCreateOrUpdateResponse> {
    if (log.id.length > 0) return this.update(log)
    return this.create(log)
  }

  async create(log: LogsEntity): Promise<LogsCreateOrUpdateResponse> {
    const response = await this.apiService.post<LogsEntity>(`/logs`, log)

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }

    return {
      error: false,
      body: response.data,
    }
  }

  async update(log: LogsEntity): Promise<LogsCreateOrUpdateResponse> {
    const response = await this.apiService.put<LogsEntity>(`/logs`, log)

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }

    return {
      error: false,
      body: response.data,
    }
  }

  async delete(id: LogsEntity["id"]): Promise<LogsDeleteResponse> {
    const response = await this.apiService.delete<any>(`/logs/${id}`, {})

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }

    return {
      error: false,
      body: null,
    }
  }

  async sync(id: LogsEntity["id"]): Promise<LogsSyncResponse> {
    const response = await this.apiService.put<any>(`/logs/${id}/sync`, {
      logId: id,
    })

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }

    return {
      error: false,
      body: null,
    }
  }
}
