import { orderBy } from "lodash"

import { LogsEntity } from "@foudroyer/interfaces"
import {
  ILogsRepository,
  LogsCreateOrUpdateResponse,
  LogsDeleteResponse,
  LogsFetchResponse,
  LogsSyncResponse,
} from "../interfaces/ILogsRepository"

export class InMemoryLogsRepository implements ILogsRepository {
  private logs: Map<LogsEntity["id"], LogsEntity> = new Map()

  async fetch(params: { websiteId: string }): Promise<LogsFetchResponse> {
    const logs = Array.from(this.logs.values()).filter(
      ({ fk_website_id }) => fk_website_id === params.websiteId
    )

    return {
      error: false,
      body: orderBy(logs, ["log_date"], "asc"),
    }
  }

  async sync(id: string): Promise<LogsSyncResponse> {
    return {
      error: false,
      body: null,
    }
  }

  async createOrUpdate(log: LogsEntity): Promise<LogsCreateOrUpdateResponse> {
    this.logs.set(log.id, log)

    return {
      error: false,
      body: this.logs.get(log.id)!,
    }
  }

  async delete(id: LogsEntity["id"]): Promise<LogsDeleteResponse> {
    this.logs.delete(id)

    return {
      error: false,
      body: null,
    }
  }
}
