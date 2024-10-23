import { IAnalyticsService } from "./IAnalyticsService"
import { IAuthRepository } from "./IAuthRepository"
import { ILocalStorageService } from "./ILocalStorageService"
import { ILocationService } from "./ILocationService"
import { ISpreadRepository } from "./ISpreadRepository"
import { IWebsitesRepository } from "./IWebsitesRepository"

export type Modules = {
  LocationService: ILocationService
  WebsitesRepository: IWebsitesRepository
  AnalyticsService: IAnalyticsService
  AuthRepository: IAuthRepository
  LocalStorageService: ILocalStorageService
  SpreadRepository: ISpreadRepository
}

export interface IModule {
  build(): Modules
}
