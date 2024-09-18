import {
  ErrorEntity,
  IndexationGoogleCloudApiKeyEntity,
} from "@foudroyer/interfaces"
import { IndexationSearchEngines } from "../entities/SearchEngineEntity"
import {
  AddGoogleApiKeyResponse,
  CheckIndexNowKeyResponse,
  DeleteGoogleApiKeyResponse,
  GetGoogleApiKeysResponse,
  IIndexationService,
  IndexResponseType,
} from "../interfaces/IIndexationService"
import { ApiService } from "./ApiService"

export class ApiIndexationService implements IIndexationService {
  constructor(private apiService: ApiService) {}

  async getGoogleApiKeys(params: {
    websiteId: string
  }): Promise<GetGoogleApiKeysResponse> {
    const response = await this.apiService.get<{
      google_cloud_api_keys: IndexationGoogleCloudApiKeyEntity[]
    }>(`/indexation/google_cloud_api_keys/${params.websiteId}`)

    if (response.data.statusCode === 400)
      return {
        error: true,
        code: response.data.message,
      }

    return {
      error: false,
      body: response.data,
    }
  }

  async refreshGoogleApiKey(params: {
    id: string
  }): Promise<AddGoogleApiKeyResponse> {
    const response = await this.apiService.put<{
      error: boolean
      body: { isActivated: boolean }
    }>(`/indexation/google_cloud_api_keys/check`, { keyId: params.id })

    if (response.data.statusCode === 400)
      return {
        error: true,
        code: response.data.message,
      }

    return {
      error: false,
      body: response.data,
    }
  }

  async addGoogleApiKey(params: {
    websiteId: string
    key: string
  }): Promise<AddGoogleApiKeyResponse> {
    const response = await this.apiService.post<void>(
      "/indexation/google_cloud_api_keys",
      {
        key: params.key,
        websiteId: params.websiteId,
      }
    )

    if (response.data.statusCode === 400)
      return { error: true, code: response.data.message }

    return { error: false, body: response.data }
  }

  async deleteGoogleApiKey(params: {
    keyId: string
    websiteId: string
  }): Promise<DeleteGoogleApiKeyResponse> {
    const response = await this.apiService.delete<void>(
      "/indexation/google_cloud_api_keys",
      {
        keyId: params.keyId,
        websiteId: params.websiteId,
      }
    )

    if (response.data.statusCode === 400)
      return { error: true, code: response.data.message }

    return { error: false, body: response.data }
  }

  async downloadGoogleApiKey(params: {
    google_cloud_api_key: string
  }): Promise<any> {
    const element = document.createElement("a")
    const { project_id } = JSON.parse(params.google_cloud_api_key)
    const blob = new Blob([params.google_cloud_api_key], {
      type: "application/json",
    })

    element.download = project_id + ".json"
    element.href = window.URL.createObjectURL(blob)
    element.click()
    element.remove()

    return {
      error: false,
    }
  }

  async index(params: {
    url: string
    websiteId: string
    types: IndexationSearchEngines[]
    mode: "queue" | "manual"
  }): Promise<IndexResponseType> {
    try {
      const response = await this.apiService.post<IndexResponseType>(
        `/indexation/bulk${params.mode === "manual" ? "" : "/queue"}`,
        params
      )

      if (response.data.statusCode === 400)
        return {
          error: true,
          code: response.data.message,
        }

      return {
        error: false,
        body: "",
      }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  async checkIndexNowKey(params: {
    websiteId: string
  }): Promise<CheckIndexNowKeyResponse> {
    try {
      const response = await this.apiService.post<IndexResponseType>(
        `/indexation/indexnow/check`,
        params
      )

      if (response.data.statusCode === 400)
        return {
          error: true,
          code: response.data.message,
        }

      return {
        error: false,
        body: { success: true },
      }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }

  async updateIndexationAutoSettings(params: {
    websiteId: string
    indexation_auto_activated: boolean
    indexation_auto_update_pages_activated: boolean
  }): Promise<any> {
    try {
      const response = await this.apiService.put<any>(
        `/indexation/settings`,
        params
      )

      if (response.data.statusCode === 400)
        return {
          error: true,
          code: response.data.message,
        }

      return {
        error: false,
        body: response.data,
      }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }
}
