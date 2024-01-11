import { UserEntity } from "@foudroyer/interfaces"
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

export interface IAuthRepository {
  authenticateWithGoogle(params?: {
    language: string
  }): Promise<AuthenticateWithGoogleResponse>
  authenticateWithYandex(): Promise<AuthenticateWithYandexResponse>
  authenticateWithBing(): Promise<AuthenticateWithYandexResponse>
  getUserInfo(): Promise<GetUserInfoResponse>
  getSources(): Promise<GetSourcesResponse>
}
