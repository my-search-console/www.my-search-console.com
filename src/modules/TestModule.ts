import { IModule } from "../interfaces/IModule"
import { InMemoryAuthRepository } from "../repositories/InMemoryAuthRepository"
import { InMemorySpreadRepository } from "../repositories/InMemorySpreadRepository"
import { InMemoryWebsitesRepository } from "../repositories/InMemoryWebsitesRepository"
import { InMemoryAnalyticsService } from "../services/InMemoryAnalyticsService"
import { InMemoryLocalStorageService } from "../services/InMemoryLocalStorageService"
import { InMemoryLocationService } from "../services/InMemoryLocationService"

export class TestModule implements IModule {
  build() {
    const LocationService = new InMemoryLocationService()
    const WebsitesRepository = new InMemoryWebsitesRepository()
    const AuthRepository = new InMemoryAuthRepository()
    const LocalStorageService = new InMemoryLocalStorageService()
    const AnalyticsService = new InMemoryAnalyticsService()
    const SpreadRepository = new InMemorySpreadRepository()

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
