import { ErrorEntity, UserEntity } from "@my-search-console/interfaces"
import {
  AuthenticateWithGoogleResponse,
  GetUserInfoResponse,
  IAuthRepository,
} from "../interfaces/IAuthRepository"

export class InMemoryAuthRepository implements IAuthRepository {
  private users: UserEntity[] = []

  async getAuthenticationUrl(
    source: "google" | "yandex" | "bing"
  ): Promise<
    { error: true; code: ErrorEntity } | { error: false; body: string }
  > {
    return { error: false, body: "https://google.com" }
  }

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

  async store(users: typeof this.users) {
    this.users.push(...users)
  }

  async authenticateWithGoogle(): Promise<AuthenticateWithGoogleResponse> {
    const user = this.users[0]

    if (!user)
      return { error: true, code: ErrorEntity.GOOGLE_AUTH_SCOPE_NOT_FOUND }

    return { error: false, body: { token: "access-token" } }
  }

  private getSourcesResponse = { google: true, yandex: false, bing: false }

  async getUserInfo(): Promise<GetUserInfoResponse> {
    const user = this.users[0]

    if (!user) return { error: true, code: ErrorEntity.USER_NOT_FOUND }

    if (user.id === "user_info_error")
      return { error: true, code: ErrorEntity.USER_NOT_FOUND }

    return { error: false, body: user }
  }
}
