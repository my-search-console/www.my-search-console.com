import { ApiAuthRepository } from "../repositories/ApiAuthRepository"
import { IAnalyticsService } from "./IAnalyticsService"
import { IIndexationService } from "./IIndexationService"
import { IKeywordsRepository } from "./IKeywordsRepository"
import { ILocalStorageService } from "./ILocalStorageService"
import { ILocationService } from "./ILocationService"
import { ILogsRepository } from "./ILogsRepository"
import { IOpportunitiesRepository } from "./IOpportunitiesRepository"
import { IPagesRepository } from "./IPagesRepository"
import { IPaymentService } from "./IPaymentService"
import { IPaymentsRepository } from "./IPaymentsRepository"
import { IRoastRepository } from "./IRoastRepository"
import { ISitemapsService } from "./ISitemapsService"
import { ISpreadRepository } from "./ISpreadRepository"
import { IStatsRepository } from "./IStatsRepository"
import { IWebsitesRepository } from "./IWebsitesRepository"

export type Modules = {
  LocationService: ILocationService
  WebsitesRepository: IWebsitesRepository
  AnalyticsService: IAnalyticsService
  AuthRepository: ApiAuthRepository
  LocalStorageService: ILocalStorageService
  PaymentService: IPaymentService
  PaymentsRepository: IPaymentsRepository
  PagesRepository: IPagesRepository
  IndexationService: IIndexationService
  KeywordsRepository: IKeywordsRepository
  OpportunitiesRepository: IOpportunitiesRepository
  SpreadRepository: ISpreadRepository
  RoastRepository: IRoastRepository
  StatsRepository: IStatsRepository
  LogsRepository: ILogsRepository
  SitemapsService: ISitemapsService
}

export interface IModule {
  build(): Modules
}
