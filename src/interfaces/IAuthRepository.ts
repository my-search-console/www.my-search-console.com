import { ErrorEntity, UserEntity } from "@my-search-console/interfaces"
import { IRepositoryResponse } from "./IApiResponse"

export type GetUserInfoResponse = IRepositoryResponse<UserEntity>
export type AuthenticateWithGoogleResponse = IRepositoryResponse<{
  token: string
}>

export interface IAuthRepository {
  getAuthenticationUrl(
    source: "google" | "yandex" | "bing"
  ): Promise<
    { error: true; code: ErrorEntity } | { error: false; body: string }
  >
  authenticateWithGoogle(params?: {
    language: string
  }): Promise<AuthenticateWithGoogleResponse>

  postAuthenticationCode(params: {
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
  >

  getUserInfo(): Promise<GetUserInfoResponse>
}
