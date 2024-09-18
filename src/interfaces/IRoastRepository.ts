import { RoastWithReportEntity } from "../entities/RoastEntity"
import { IRepositoryResponse } from "./IApiResponse"

export type FetchRoastResponse = IRepositoryResponse<{
  websites: RoastWithReportEntity[]
}>

export type RoastRoastResponse = IRepositoryResponse<{
  websites: RoastWithReportEntity[]
}>

export type RoastRefreshResponse = IRepositoryResponse<{
  website: RoastWithReportEntity
}>

export interface IRoastRepository {
  fetchWebsites(): Promise<FetchRoastResponse>
  roast(): Promise<RoastRoastResponse>
  refresh(params: { websiteId: string }): Promise<RoastRefreshResponse>
}
