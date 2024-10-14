import {
  ErrorEntity,
  IndexationGoogleCloudApiKeyEntity,
} from "@foudroyer/interfaces"
import {
  AddGoogleApiKeyResponse,
  CheckIndexNowKeyResponse,
  DeleteGoogleApiKeyResponse,
  GetGoogleApiKeysResponse,
  IIndexationService,
  IndexResponseType,
} from "../interfaces/IIndexationService"

export class InMemoryIndexationService implements IIndexationService {
  refreshGoogleApiKey(params: {
    id: string
  }): Promise<AddGoogleApiKeyResponse> {
    throw new Error("Method not implemented.")
  }
  private requests: number = 0
  private keys: Array<IndexationGoogleCloudApiKeyEntity> = []

  private __checkIndexNowKeyResponse: {
    [key: string]: CheckIndexNowKeyResponse
  } = {
    __default: {
      error: true,
      code: ErrorEntity.WEBSITE_NOT_FOUND,
    },
  }

  async deleteGoogleApiKey(params: {
    keyId: string
    websiteId: string
  }): Promise<DeleteGoogleApiKeyResponse> {
    this.keys = this.keys.filter(({ id }) => {
      return id !== params.keyId
    })

    return {
      error: false,
      body: "",
    }
  }

  downloadGoogleApiKey(params: { google_cloud_api_key: string }): Promise<any> {
    throw new Error("Method not implemented.")
  }

  async addGoogleApiKey(params: {
    websiteId: string
    key: string
  }): Promise<AddGoogleApiKeyResponse> {
    this.keys.push({
      checked_at: new Date(),
      has_error: false,
      is_downloadable_by_user: false,
      id: Date.now().toString(),
      fk_website_id: params.websiteId,
      google_cloud_api_key: JSON.stringify({
        type: "service_account",
        project_id: "munbeob-370621",
        private_key_id: "7df2b083fb19be044141273c478d14a2ab12d0ba",
        private_key:
          "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDBWR0wClzWKFqw\nDDYc0R111p4hIMsOC+piCT0YDtrCoj4LmeUEPRg+pp3Sj28msz4nlHU4uklho6I1\nnuSUQ96nVMiFZlJ97VaH0pRjvDtqVvuvLrhIH+qPRdvFmyvmOxtGEJlwb97cIusk\nI4Y1KQp/8fARs4GpMHCQnznoVyuhXb6I4xYc6HFjiszDmCm/XtbM2zWcPg1yxPwh\nOcXMvhLmfYHaqV4YZAFJkAZ9O+XC135wss0myYYnC5kBk6T0+BLiKS1QjMhRwK4e\nXgSSdowGqs6XnHfenglifocAvwZL0y+gXesiN6m0vdBFtOHNJD6WEeEyPdhvlIta\nGg+8OuObAgMBAAECggEAE0FlIlp5C5/FOFcrytiAm8wd8qRDbkiwtPn0KnTNEI+V\ndXsdtbuOS8VoKyCILBoZv8AnOtkPY2v0EaCbZX14EfR9nw6lR7YSGHPxin7XVyw5\nsItxZHo/ox+MvZp9V4mqmhW5Hw6x6sm6q6sZO8SBYso2sGybv+/IP7IiOdaRZjNP\nHeftKEpwwzIpC6YonsYpTsrzusB2FsUUdB44nn7vctXQFrayJZS/bFEqii9lGDQW\nRuA+SOhwHciL4tFCVxuGqzT6pc4Zaz88KtYgJeQK7x5QGUHaz4KpdjzRI6hs2Edf\nORn0OVtpyib+gKOEY+Pw2u7Y2G8Zu4ySSMndSt8M0QKBgQDi3Q0oVG7wBDeQoI3U\nDWFU/zKFZWmbN6r7wCP2aMSmHBkth7eRslGJWIivuPA+nrhAE24nZ2wxNojBonxL\nHHxvnYKT8f4M5Y43umceq/Er/8dSY2fylAvb31o44LwdCDvYXPOLBmZMkHfh2Si2\nTROQam9+n8L6vPyKKPtR4s7ttwKBgQDaLh/klKtK9f++UTqllEqZsSA4IBK3Astd\n0u4+mTmgjuFqCGfrc8/oN+upORqW+zicHcj8rtzUK331kRA2zCAJnHYL/rbtQuiz\nBrpcrrUJrODJNR3w+aa9ULCzVTb2uqXPZHEt+jnTCAiHmJIPYIxgNUd1mZbZU4Vv\naunBkfW5PQKBgQDY0WFg2QlJ1Q3x6LCEKOGMJXZ4bUr4MMT2ZFU6jDjddN9PV3VH\nBwDMXlQMdZkOkA0SGD/f4wVRJ4ieX5ehBbGbzxLcKJygYMiCVGF3u+b8ITGzeRQA\nkCOhWR7WW1sN+C+SAow0o8IjjLM2o6A4UwPOsxqqDzB/CR3nQXGoejdAkwKBgQCZ\n85oFjPIhftvqyx5639yT/mwhrmAGSy59Ee2StkP3i1p7m1rYxWubDHp5ehXNG4+i\neVHtGuYvwFCtCqNKR1cD8SdK53zkhiX0zXaLF6wfG6Gx2I08EK0bQOiuYh7aknGV\nmeZS7xIGWtDJ/VpzB0mGSZIW5T2QNGMfb21qbTfacQKBgQCs+Xe3QKy2X0swmJlt\njA1UkpvRXzql//KBFgWn4klrl2BC0b+3QE3zKtn2mU1fh4QIPZ75VUvIaczrUhO6\npRYQhnUtz/0YiRad8A8BL3Iy9T2CG6jhk+x050T2gpbv5RttZD9/LRPOYUrQKHS+\n4hpUuu8Kd4pHAVoENnmcKv/tbA==\n-----END PRIVATE KEY-----\n",
        client_email: "foudroyer@munbeob-370621.iam.gserviceaccount.com",
        client_id: "109208040025244742122",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url:
          "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url:
          "https://www.googleapis.com/robot/v1/metadata/x509/foudroyer%40munbeob-370621.iam.gserviceaccount.com",
        universe_domain: "googleapis.com",
      }),
      created_at: new Date(),
      updated_at: new Date(),
    })

    return {
      error: false,
      body: true,
    }
  }

  async getGoogleApiKeys(params: {
    websiteId: string
  }): Promise<GetGoogleApiKeysResponse> {
    return {
      error: false,
      body: { google_cloud_api_keys: this.keys },
    }
  }

  async __deleteGoogleApiKey(params: { project_id: string }) {
    this.keys = this.keys.filter(
      ({ google_cloud_api_key }) => google_cloud_api_key !== params.project_id
    )

    return {
      error: false,
      body: null,
    }
  }

  async __storeGoogleApiKeys(params: {
    keys: Array<{ project_id: string; email: string }>
  }) {
    this.keys = params.keys.map((key) => ({
      checked_at: new Date(),
      created_at: new Date(),
      fk_website_id: "",
      google_cloud_api_key: "",
      has_error: false,
      id: key.project_id,
      is_downloadable_by_user: false,
      updated_at: new Date(),
    }))

    return {
      error: false,
      body: {
        keys: this.keys,
      },
    }
  }

  getAllRequestsNumber() {
    return this.requests
  }

  async index(params: {
    url: string
    websiteId: string
  }): Promise<IndexResponseType> {
    this.requests = this.requests + 1

    if (params.url.includes("quota-exceed"))
      return {
        error: true,
        code: ErrorEntity.GOOGLE_INDEXATION_QUOTA_EXCEED,
      }

    if (params.url.includes("credentials-error"))
      return {
        error: true,
        code: ErrorEntity.GOOGLE_AUTH_CREDENTIALS_EXPIRED,
      }

    return { error: false, body: "" }
  }

  __storeCheckIndexNowKeyResponse(params: {
    websiteId: string
    response: CheckIndexNowKeyResponse
  }) {
    this.__checkIndexNowKeyResponse[params.websiteId] = params.response
  }

  async checkIndexNowKey(params: {
    websiteId: string
  }): Promise<CheckIndexNowKeyResponse> {
    return (
      this.__checkIndexNowKeyResponse[params.websiteId] ||
      this.__checkIndexNowKeyResponse["__default"]
    )
  }
}
