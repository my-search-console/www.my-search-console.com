import { IModule } from "../../interfaces/IModule"
import { WindowLocationService } from "../../services/WindowLocationService"
import { ApiWebsitesRepository } from "../../repositories/ApiWebsitesRepository"
import { ApiPagesRepository } from "../../repositories/ApiPagesRepository"
import { ApiAuthRepository } from "../../repositories/ApiAuthRepository"
import { ApiIndexationService } from "../../services/ApiIndexationService"
import { ApiService } from "../../services/ApiService"
import { PaddlePaymentService } from "../../services/PaddlePaymentService"
import { WindowLocalStorageService } from "../../services/WindowLocalStorageService"
import { ApiKeywordsRepository } from "../../repositories/ApiKeywordsRepository"
import { ApiOpportunitiesRepository } from "../../repositories/ApiOpportunitiesRepository"
import { ApiPaymentsRepository } from "../../repositories/ApiPaymentsRepository"
import { MixpanelAnalyticsService } from "../../services/MixpanelAnalyticsService"
import { ApiSpreadRepository } from "../../repositories/ApiSpreadRepository"
import { ApiRoastRepository } from "../../repositories/ApiRoastRepository"

export class FullDevelopmentRecipe implements IModule {
  build() {
    const LocalStorageService = new WindowLocalStorageService()
    const apiService = new ApiService(LocalStorageService)

    const LocationService = new WindowLocationService()
    const AnalyticsService = new MixpanelAnalyticsService()
    const PaymentService = new PaddlePaymentService()

    const PagesRepository = new ApiPagesRepository(apiService)
    const WebsitesRepository = new ApiWebsitesRepository(apiService)
    const IndexationService = new ApiIndexationService(apiService)
    const AuthRepository = new ApiAuthRepository(apiService)
    const PaymentsRepository = new ApiPaymentsRepository(apiService)
    const SpreadRepository = new ApiSpreadRepository(apiService)
    const RoastRepository = new ApiRoastRepository(apiService)

    const KeywordsRepository = new ApiKeywordsRepository(apiService)

    const OpportunitiesRepository = new ApiOpportunitiesRepository(apiService)

    return {
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
