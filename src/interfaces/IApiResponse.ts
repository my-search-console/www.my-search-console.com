import { ErrorEntity } from "@my-search-console/interfaces"
import { InternalErrorEntity } from "../entities/InternalErrorEntity"

export type IApiResponse<T> =
  | ({ statusCode: 200 } & T)
  | { statusCode: 400; message: ErrorEntity }

export type IRepositoryResponse<T> =
  | ({ error: false } & { body: T })
  | { error: true; code: ErrorEntity | InternalErrorEntity; data?: any }
