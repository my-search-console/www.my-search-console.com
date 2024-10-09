import { ApiAuthRepository } from "../repositories/ApiAuthRepository"
import { IAnalyticsService } from "./IAnalyticsService"
import { IKeywordsRepository } from "./IKeywordsRepository"
import { ILocalStorageService } from "./ILocalStorageService"
import { ILocationService } from "./ILocationService"
import { IPaymentService } from "./IPaymentService"
import { IPaymentsRepository } from "./IPaymentsRepository"
import { ISpreadRepository } from "./ISpreadRepository"
import { IWebsitesRepository } from "./IWebsitesRepository"

export type Modules = {
  LocationService: ILocationService
  WebsitesRepository: IWebsitesRepository
  AnalyticsService: IAnalyticsService
  AuthRepository: ApiAuthRepository
  LocalStorageService: ILocalStorageService
  PaymentService: IPaymentService
  PaymentsRepository: IPaymentsRepository
  KeywordsRepository: IKeywordsRepository
  SpreadRepository: ISpreadRepository
}

export interface IModule {
  build(): Modules
}
