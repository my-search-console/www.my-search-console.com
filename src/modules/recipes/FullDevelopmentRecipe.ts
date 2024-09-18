import { IModule } from "../../interfaces/IModule"
import { ApiAuthRepository } from "../../repositories/ApiAuthRepository"
import { ApiKeywordsRepository } from "../../repositories/ApiKeywordsRepository"
import { ApiLogsRepository } from "../../repositories/ApiLogsRepository"
import { ApiOpportunitiesRepository } from "../../repositories/ApiOpportunitiesRepository"
import { ApiPagesRepository } from "../../repositories/ApiPagesRepository"
import { ApiPaymentsRepository } from "../../repositories/ApiPaymentsRepository"
import { ApiRoastRepository } from "../../repositories/ApiRoastRepository"
import { ApiSpreadRepository } from "../../repositories/ApiSpreadRepository"
import { ApiStatsRepository } from "../../repositories/ApiStatsRepository"
import { ApiWebsitesRepository } from "../../repositories/ApiWebsitesRepository"
import { ApiIndexationService } from "../../services/ApiIndexationService"
import { ApiService } from "../../services/ApiService"
import { ApiSitemapsService } from "../../services/ApiSitemapsService"
import { InMemoryAnalyticsService } from "../../services/InMemoryAnalyticsService"
import { PaddlePaymentService } from "../../services/PaddlePaymentService"
import { WindowLocalStorageService } from "../../services/WindowLocalStorageService"
import { WindowLocationService } from "../../services/WindowLocationService"

export class FullDevelopmentRecipe implements IModule {
  build() {
    const LocalStorageService = new WindowLocalStorageService()
    const apiService = new ApiService(LocalStorageService)
    const LocationService = new WindowLocationService()
    const AnalyticsService = new InMemoryAnalyticsService()
    const PaymentService = new PaddlePaymentService()
    const SitemapsService = new ApiSitemapsService(apiService)

    const PagesRepository = new ApiPagesRepository(apiService)
    const WebsitesRepository = new ApiWebsitesRepository(apiService)
    const IndexationService = new ApiIndexationService(apiService)
    const AuthRepository = new ApiAuthRepository(apiService)
    const PaymentsRepository = new ApiPaymentsRepository(apiService)
    const SpreadRepository = new ApiSpreadRepository(apiService)
    const StatsRepository = new ApiStatsRepository(apiService)
    const RoastRepository = new ApiRoastRepository(apiService)
    const LogsRepository = new ApiLogsRepository(apiService)
    const KeywordsRepository = new ApiKeywordsRepository(apiService)
    const OpportunitiesRepository = new ApiOpportunitiesRepository(apiService)

    return {
      SitemapsService,
      LogsRepository,
      StatsRepository,
      RoastRepository,
      SpreadRepository,
      PaymentsRepository,
      PaymentService,
      LocalStorageService,
      AuthRepository,
      AnalyticsService,
      PagesRepository,
      IndexationService,
      WebsitesRepository,
      LocationService,
      KeywordsRepository,
      OpportunitiesRepository,
    }
  }
}
