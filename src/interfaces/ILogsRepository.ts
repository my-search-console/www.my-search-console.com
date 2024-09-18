import { LogsEntity } from "@foudroyer/interfaces"
import { IRepositoryResponse } from "./IApiResponse"

export type LogsFetchResponse = IRepositoryResponse<LogsEntity[]>
export type LogsCreateOrUpdateResponse = IRepositoryResponse<LogsEntity>
export type LogsDeleteResponse = IRepositoryResponse<any>
export type LogsSyncResponse = IRepositoryResponse<any>

export interface ILogsRepository {
  fetch(params: { websiteId: string }): Promise<LogsFetchResponse>
  createOrUpdate(log: LogsEntity): Promise<LogsCreateOrUpdateResponse>
  delete(id: LogsEntity["id"]): Promise<LogsDeleteResponse>
  sync(id: LogsEntity["id"]): Promise<LogsSyncResponse>
}
