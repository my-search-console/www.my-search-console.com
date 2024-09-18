import { IndexationGoogleCloudApiKeyEntity } from "@foudroyer/interfaces"
import { IndexationSearchEngines } from "../entities/SearchEngineEntity"
import { IApiResponse, IRepositoryResponse } from "./IApiResponse"

export type IndexResponseType = IRepositoryResponse<any>
export type CheckIndexNowKeyResponse = IRepositoryResponse<{
  success: true
}>

export type GetGoogleApiKeysResponse = IRepositoryResponse<{
  google_cloud_api_keys: IndexationGoogleCloudApiKeyEntity[]
}>

export type AddGoogleApiKeyResponse = IRepositoryResponse<any>
export type DeleteGoogleApiKeyResponse = IRepositoryResponse<any>

export interface IIndexationService {
  checkIndexNowKey(params: {
    websiteId: string
  }): Promise<CheckIndexNowKeyResponse>
  index(params: {
    url: string
    websiteId: string
    types: IndexationSearchEngines[]
    mode: "queue" | "manual"
  }): Promise<IndexResponseType>

  deleteGoogleApiKey(params: {
    keyId: string
    websiteId: string
  }): Promise<DeleteGoogleApiKeyResponse>

  downloadGoogleApiKey(params: {
    google_cloud_api_key: string
  }): Promise<IApiResponse<any>>

  getGoogleApiKeys(params: {
    websiteId: string
  }): Promise<GetGoogleApiKeysResponse>

  refreshGoogleApiKey(params: { id: string }): Promise<AddGoogleApiKeyResponse>

  addGoogleApiKey(params: {
    websiteId: string
    key: string
  }): Promise<AddGoogleApiKeyResponse>

  updateIndexationAutoSettings(params: {
    websiteId: string
    indexation_auto_activated: boolean
    indexation_auto_update_pages_activated: boolean
    sources: string[]
  }): Promise<IApiResponse<any>>
}
