import {
  ErrorEntity,
  UserEntity,
  UserToGoogleSearchConsoleWithEmailsEntity,
} from "@foudroyer/interfaces"
import { InternalErrorEntity } from "../entities/InternalErrorEntity"
import {
  AuthenticateWithGoogleResponse,
  AuthenticateWithYandexResponse,
  GetSourcesResponse,
  GetUserInfoResponse,
  GoogleSearchAccountDeleteResponse,
  GoogleSearchAccountGetParentsResponse,
  IAuthRepository,
} from "../interfaces/IAuthRepository"
import { ApiService } from "../services/ApiService"

export class ApiAuthRepository implements IAuthRepository {
  constructor(private apiService: ApiService) {}

  private getCallbackUrl(type: "google" | "bing" | "yandex"): string {
    return `${window.location.origin}/authentication/${type}/callback`
  }

  private openBrowserAndGetCode(
    url: string
  ): Promise<
    | { error: false; body: string }
    | { error: true; code: InternalErrorEntity; data?: { href: string } }
  > {
    return new Promise(async (resolve) => {
      const browser = window.open(url)

      const interval = setInterval(() => {
        if (!browser || !browser.window || browser.closed) {
          clearInterval(interval)

          return resolve({
            error: true,
            code: InternalErrorEntity.GOOGLE_BROWSER_CLOSED,
          })
        }

        try {
          const href = browser.window.location.href
          const url = new URL(href)
          const code = url.searchParams.get("code") as string

          if (href === "about:blank") {
          } else if (code) {
            clearInterval(interval)
            browser.close()
            return resolve({ error: false, body: code })
          } else {
            clearInterval(interval)
            browser.close()

            return resolve({
              error: true,
              code: InternalErrorEntity.GOOGLE_AUTH_NO_CODE,
              data: { href },
            })
          }
        } catch (error) {}
      }, 500)
    })
  }

  async getAuthenticationUrl(
    type: "google" | "yandex" | "bing"
  ): Promise<
    { error: true; code: ErrorEntity } | { error: false; body: string }
  > {
    const response = await this.apiService.get<{ url: string }>(
      `/auth/${type}/url?callback=${this.getCallbackUrl(type)}`
    )

    if (response.data.statusCode === 400) {
      return { error: true, code: response.data.message }
    }

    return { error: false, body: response.data.url }
  }

  async postAuthenticationCode(params: {
    code: string
    callbackUrl: string
    type: "google" | "yandex" | "bing"
    language?: string
  }): Promise<
    | {
        error: true
        code: ErrorEntity
      }
    | {
        error: false
        body: string
      }
  > {
    try {
      const response = await this.apiService.post<{ access_token: string }>(
        `/auth/${params.type}/callback`,
        {
          code: params.code || "bad-code",
          callbackUrl: params.callbackUrl,
          language: params.language,
        }
      )

      if (response.data.statusCode === 400) {
        return { error: true, code: response.data.message }
      }

      return { error: false, body: response.data.access_token }
    } catch (e) {
      // @ts-ignore
      return { error: true, code: e.message }
    }
  }

  async getUserInfo(): Promise<GetUserInfoResponse> {
    const response = await this.apiService.get<UserEntity>("/auth/profile")

    if (response.data.statusCode === 400)
      return {
        error: true,
        code: response.data.message,
      }

    return {
      error: false,
      body: {
        ...response.data,
        created_at: new Date(response.data.created_at),
      },
    }
  }

  async getSources(): Promise<GetSourcesResponse> {
    const response = await this.apiService.get<{
      bing: boolean
      google: boolean
      yandex: boolean
    }>("/auth/sources")

    if (response.data.statusCode === 400)
      return {
        error: true,
        code: response.data.message,
      }

    return { error: false, body: response.data }
  }

  /**
   *
   *
   *
   *
   *
   *
   *
   *
   * GOOGLE SEARCH ACCOUNT
   *
   *
   *
   *
   *
   *
   *
   *
   */

  async GoogleSearchAccountGetParents(): Promise<GoogleSearchAccountGetParentsResponse> {
    const response = await this.apiService.get<
      UserToGoogleSearchConsoleWithEmailsEntity[]
    >("/auth/parents")

    if (response.data.statusCode === 400)
      return {
        error: true,
        code: response.data.message,
      }

    return { error: false, body: response.data }
  }

  async GoogleSearchAccountDelete(params: {
    id: UserToGoogleSearchConsoleWithEmailsEntity["id"]
  }): Promise<GoogleSearchAccountDeleteResponse> {
    const response = await this.apiService.delete<any>(
      "/auth/google-search-account",
      { id: params.id }
    )

    if (response.data.statusCode === 400)
      return {
        error: true,
        code: response.data.message,
      }

    return { error: false, body: response.data }
  }

  async addGoogleSearchAccount(params?: { language: string }): Promise<any> {
    const callbackUrl = this.getCallbackUrl("google")

    const code = await this.openBrowserAndGetCode(
      `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fwebmasters.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=749607665220-nm0esgq5d60qi92s8svuevekktvdf150.apps.googleusercontent.com&redirect_uri=${callbackUrl}`
    )

    if (code.error === true) {
      return { error: true, code: code.code }
    }

    try {
      const response = await this.apiService.post(
        `/auth/google/add-search-console/callback`,
        {
          code: code.body || "bad-code",
          callbackUrl: callbackUrl,
          language: params?.language || "en",
        }
      )

      if (response.data.statusCode === 400) {
        return { error: true, code: response.data.message }
      }

      return { error: false, body: true }
    } catch (e) {
      // @ts-ignore
      return { error: true, code: e.message }
    }
  }

  /**
   *
   *
   *
   *
   *
   *
   *
   *
   * =======
   *
   *
   *
   *
   *
   *
   *
   *
   */

  async authenticateWithGoogle(params?: {
    language: string
  }): Promise<AuthenticateWithGoogleResponse> {
    const callbackUrl = this.getCallbackUrl("google")

    const code = await this.openBrowserAndGetCode(
      `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fwebmasters.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=749607665220-nm0esgq5d60qi92s8svuevekktvdf150.apps.googleusercontent.com&redirect_uri=${callbackUrl}`
    )

    if (code.error === true) {
      return { error: true, code: code.code, data: code.data }
    }

    const accessToken = await this.postAuthenticationCode({
      code: code.body,
      callbackUrl,
      type: "google",
      language: params?.language || "en",
    })

    if (accessToken.error === true) {
      return { error: true, code: accessToken.code }
    }

    return { error: false, body: { token: accessToken.body } }
  }

  async authenticateWithYandex(): Promise<AuthenticateWithYandexResponse> {
    const callbackUrl = this.getCallbackUrl("yandex")
    const response = await this.getAuthenticationUrl("yandex")

    if (response.error === true) {
      return {
        error: true,
        code: response.code,
      }
    }

    const code = await this.openBrowserAndGetCode(response.body)

    if (code.error === true) {
      return { error: true, code: code.code }
    }

    const accessToken = await this.postAuthenticationCode({
      code: code.body,
      callbackUrl,
      type: "yandex",
    })

    if (accessToken.error === true) {
      return { error: true, code: accessToken.code }
    }

    return { error: false, body: { token: accessToken.body } }
  }

  async authenticateWithBing(): Promise<AuthenticateWithYandexResponse> {
    const callbackUrl = this.getCallbackUrl("bing")
    const response = await this.getAuthenticationUrl("bing")

    if (response.error === true) {
      return {
        error: true,
        code: response.code,
      }
    }

    const code = await this.openBrowserAndGetCode(response.body)

    if (code.error === true) {
      return { error: true, code: code.code }
    }

    const accessToken = await this.postAuthenticationCode({
      code: code.body,
      callbackUrl,
      type: "bing",
    })

    if (accessToken.error === true) {
      return { error: true, code: accessToken.code }
    }

    return { error: false, body: { token: accessToken.body } }
  }
}
