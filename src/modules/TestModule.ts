import { IModule } from "../interfaces/IModule"
import { InMemoryAuthRepository } from "../repositories/InMemoryAuthRepository"
import { InMemoryKeywordsRepository } from "../repositories/InMemoryKeywordsRepository"
import { InMemoryLogsRepository } from "../repositories/InMemoryLogsRepository"
import { InMemoryOpportunitiesRepository } from "../repositories/InMemoryOpportunitiesRepository"
import { InMemoryPagesRepository } from "../repositories/InMemoryPagesRepository"
import { InMemoryPaymentsRepository } from "../repositories/InMemoryPaymentsRepository"
import { InMemoryRoastRepository } from "../repositories/InMemoryRoastRepository"
import { InMemorySpreadRepository } from "../repositories/InMemorySpreadRepository"
import { InMemoryStatsRepository } from "../repositories/InMemoryStatsRepository"
import { InMemoryWebsitesRepository } from "../repositories/InMemoryWebsitesRepository"
import { InMemoryAnalyticsService } from "../services/InMemoryAnalyticsService"
import { InMemoryIndexationService } from "../services/InMemoryIndexationService"
import { InMemoryLocalStorageService } from "../services/InMemoryLocalStorageService"
import { InMemoryLocationService } from "../services/InMemoryLocationService"
import { InMemoryPaymentService } from "../services/InMemoryPaymentService"

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
    const RoastRepository = new InMemoryRoastRepository()
    const StatsRepository = new InMemoryStatsRepository()
    const LogsRepository = new InMemoryLogsRepository()

    return {
      LogsRepository,
      RoastRepository,
      StatsRepository,
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
