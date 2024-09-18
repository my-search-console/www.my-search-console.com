import { ErrorEntity, UserEntity } from "@foudroyer/interfaces"
import {
  AuthenticateWithGoogleResponse,
  AuthenticateWithYandexResponse,
  GetSourcesResponse,
  GetUserInfoResponse,
  GoogleSearchAccountGetParentsResponse,
  IAuthRepository,
} from "../interfaces/IAuthRepository"

export class InMemoryAuthRepository implements IAuthRepository {
  postAuthenticationCode(params: {
    code: string
    callbackUrl: string
    type: "yandex" | "bing" | "google"
    language?: string | undefined
  }): Promise<
    { error: true; code: ErrorEntity } | { error: false; body: string }
  > {
    throw new Error("Method not implemented.")
  }
  addGoogleSearchAccount(
    params?: { language: string } | undefined
  ): Promise<AuthenticateWithGoogleResponse> {
    throw new Error("Method not implemented.")
  }
  GoogleSearchAccountGetParents(): Promise<GoogleSearchAccountGetParentsResponse> {
    throw new Error("Method not implemented.")
  }
  GoogleSearchAccountDelete(params: {
    id: number
  }): Promise<GoogleSearchAccountGetParentsResponse> {
    throw new Error("Method not implemented.")
  }
  private users: UserEntity[] = []

  async store(users: typeof this.users) {
    this.users.push(...users)
  }

  async authenticateWithGoogle(): Promise<AuthenticateWithGoogleResponse> {
    const user = this.users[0]

    if (!user)
      return { error: true, code: ErrorEntity.GOOGLE_AUTH_SCOPE_NOT_FOUND }

    return { error: false, body: { token: "access-token" } }
  }

  async authenticateWithYandex(): Promise<AuthenticateWithYandexResponse> {
    const user = this.users[0]

    if (!user)
      return { error: true, code: ErrorEntity.GOOGLE_AUTH_SCOPE_NOT_FOUND }

    return { error: false, body: "" }
  }

  async authenticateWithBing(): Promise<AuthenticateWithYandexResponse> {
    const user = this.users[0]

    if (!user)
      return { error: true, code: ErrorEntity.GOOGLE_AUTH_SCOPE_NOT_FOUND }

    return { error: false, body: "" }
  }

  private getSourcesResponse = { google: true, yandex: false, bing: false }

  __storeSources(sources: typeof this.getSourcesResponse) {
    this.getSourcesResponse = sources
  }

  async getSources(): Promise<GetSourcesResponse> {
    return {
      error: false,
      body: this.getSourcesResponse,
    }
  }

  async getUserInfo(): Promise<GetUserInfoResponse> {
    const user = this.users[0]

    if (!user) return { error: true, code: ErrorEntity.USER_NOT_FOUND }

    if (user.id === "user_info_error")
      return { error: true, code: ErrorEntity.USER_NOT_FOUND }

    return { error: false, body: user }
  }
}
