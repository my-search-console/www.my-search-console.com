import { IModule } from "../interfaces/IModule"
import { InMemoryAuthRepository } from "../repositories/InMemoryAuthRepository"
import { InMemoryKeywordsRepository } from "../repositories/InMemoryKeywordsRepository"
import { InMemoryPagesRepository } from "../repositories/InMemoryPagesRepository"
import { InMemoryPaymentsRepository } from "../repositories/InMemoryPaymentsRepository"
import { InMemoryWebsitesRepository } from "../repositories/InMemoryWebsitesRepository"
import { InMemoryAnalyticsService } from "../services/InMemoryAnalyticsService"
import { InMemoryIndexationService } from "../services/InMemoryIndexationService"
import { InMemoryLocalStorageService } from "../services/InMemoryLocalStorageService"
import { InMemoryLocationService } from "../services/InMemoryLocationService"
import { InMemoryPaymentService } from "../services/InMemoryPaymentService"
import { InMemoryOpportunitiesRepository } from "../repositories/InMemoryOpportunitiesRepository"
import {
  WebsiteActivated,
  WebsiteNoSitemap,
  WebsiteNotActivated,
} from "./seeds/WebsitesSeeds"
import { InMemorySpreadRepository } from "../repositories/InMemorySpreadRepository"

export class TestModule implements IModule {
  build() {
    const LocationService = new InMemoryLocationService()
    const WebsitesRepository = new InMemoryWebsitesRepository()
    const PagesRepository = new InMemoryPagesRepository()
    const IndexationService = new InMemoryIndexationService()
    const AuthRepository = new InMemoryAuthRepository()
    const LocalStorageService = new InMemoryLocalStorageService()
    const AnalyticsService = new InMemoryAnalyticsService()
    const PaymentService = new InMemoryPaymentService()
    const PaymentsRepository = new InMemoryPaymentsRepository()
    const KeywordsRepository = new InMemoryKeywordsRepository()
    const OpportunitiesRepository = new InMemoryOpportunitiesRepository()
    const SpreadRepository = new InMemorySpreadRepository()

    return {
      SpreadRepository,
      PaymentsRepository,
      PaymentService,
      LocalStorageService,
      AuthRepository,
      AnalyticsService,
      IndexationService,
      PagesRepository,
      WebsitesRepository,
      LocationService,
      KeywordsRepository,
      OpportunitiesRepository,
    }
  }
}
