import { ErrorEntity, UserEntity } from "@foudroyer/interfaces"
import {
  IAuthRepository,
  AuthenticateWithGoogleResponse,
  GetUserInfoResponse,
  GetSourcesResponse,
  AuthenticateWithYandexResponse,
} from "../interfaces/IAuthRepository"

export class InMemoryAuthRepository implements IAuthRepository {
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
