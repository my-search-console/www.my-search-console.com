import { IKeywordsRepository } from "./IKeywordsRepository"
import { IOpportunitiesRepository } from "./IOpportunitiesRepository"
import { ILocationService } from "./ILocationService"
import { IWebsitesRepository } from "./IWebsitesRepository"
import { IAuthRepository } from "./IAuthRepository"
import { ILocalStorageService } from "./ILocalStorageService"
import { IAnalyticsService } from "./IAnalyticsService"
import { IPaymentService } from "./IPaymentService"
import { IIndexationService } from "./IIndexationService"
import { IPagesRepository } from "./IPagesRepository"
import { IPaymentsRepository } from "./IPaymentsRepository"
import { ISpreadRepository } from "./ISpreadRepository"
import { IRoastRepository } from "./IRoastRepository"

export type Modules = {
  LocationService: ILocationService
  WebsitesRepository: IWebsitesRepository
  AnalyticsService: IAnalyticsService
  AuthRepository: IAuthRepository
  LocalStorageService: ILocalStorageService
  PaymentService: IPaymentService
  PaymentsRepository: IPaymentsRepository
  PagesRepository: IPagesRepository
  IndexationService: IIndexationService
  KeywordsRepository: IKeywordsRepository
  OpportunitiesRepository: IOpportunitiesRepository
  SpreadRepository: ISpreadRepository
  RoastRepository: IRoastRepository
}

export interface IModule {
  build(): Modules
}
