import { IModule } from "../../interfaces/IModule"
import { ApiAuthRepository } from "../../repositories/ApiAuthRepository"
import { ApiSpreadRepository } from "../../repositories/ApiSpreadRepository"
import { ApiWebsitesRepository } from "../../repositories/ApiWebsitesRepository"
import { ApiService } from "../../services/ApiService"
import { PlausibleAnalyticsService } from "../../services/PlausibleAnalyticsService"
import { WindowLocalStorageService } from "../../services/WindowLocalStorageService"
import { WindowLocationService } from "../../services/WindowLocationService"

export class FullProductionRecipe implements IModule {
  build() {
    const LocalStorageService = new WindowLocalStorageService()
    const apiService = new ApiService(LocalStorageService)
    const LocationService = new WindowLocationService()
    const AnalyticsService = new PlausibleAnalyticsService()
    const WebsitesRepository = new ApiWebsitesRepository(apiService)
    const AuthRepository = new ApiAuthRepository(apiService)
    const SpreadRepository = new ApiSpreadRepository(apiService)

    return {
      SpreadRepository,
      LocalStorageService,
      AuthRepository,
      AnalyticsService,
      WebsitesRepository,
      LocationService,
    }
  }
}
