import { IRepositoryResponse } from "./IApiResponse"
import { RoastWithReportEntity } from "../entities/RoastEntity"

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
