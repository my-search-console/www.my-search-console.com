import {
  ErrorEntity,
  UserEntity,
  UserToGoogleSearchConsoleWithEmailsEntity,
} from "@foudroyer/interfaces"
import { IRepositoryResponse } from "./IApiResponse"

export type GetUserInfoResponse = IRepositoryResponse<UserEntity>
export type GetSourcesResponse = IRepositoryResponse<{
  bing: boolean
  google: boolean
  yandex: boolean
}>

export type AuthenticateWithGoogleResponse = IRepositoryResponse<{
  token: string
}>
export type AuthenticateWithYandexResponse = IRepositoryResponse<any>
export type GoogleSearchAccountGetParentsResponse = IRepositoryResponse<
  UserToGoogleSearchConsoleWithEmailsEntity[]
>
export type GoogleSearchAccountDeleteResponse = IRepositoryResponse<any>

export interface IAuthRepository {
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

  /**
   *
   * Google Search Console
   *
   */
  addGoogleSearchAccount(params?: {
    language: string
  }): Promise<AuthenticateWithGoogleResponse>

  GoogleSearchAccountGetParents(): Promise<GoogleSearchAccountGetParentsResponse>
  GoogleSearchAccountDelete(params: {
    id: UserToGoogleSearchConsoleWithEmailsEntity["id"]
  }): Promise<GoogleSearchAccountGetParentsResponse>

  /**
   *
   *
   *
   * ----------
   *
   *
   *
   *
   */

  authenticateWithYandex(): Promise<AuthenticateWithYandexResponse>
  authenticateWithBing(): Promise<AuthenticateWithYandexResponse>
  getUserInfo(): Promise<GetUserInfoResponse>
  getSources(): Promise<GetSourcesResponse>
}
