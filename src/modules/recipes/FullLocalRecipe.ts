import { localStorageKeys } from "../../constants/localStorageKeys"
import {
  RankingStatEntity,
  RankingStatsForFrontend,
} from "../../entities/RankingWebsiteEntity"
import { IModule } from "../../interfaces/IModule"
import { InMemoryAuthRepository } from "../../repositories/InMemoryAuthRepository"
import { InMemorySpreadRepository } from "../../repositories/InMemorySpreadRepository"
import { InMemoryWebsitesRepository } from "../../repositories/InMemoryWebsitesRepository"
import { InMemoryAnalyticsService } from "../../services/InMemoryAnalyticsService"
import { InMemoryLocalStorageService } from "../../services/InMemoryLocalStorageService"
import { WindowLocationService } from "../../services/WindowLocationService"
import StatsHistogramCountryResponse from "../seeds/StatsHistogramCountryResponse.json"
import StatsHistogramDeviceResponse from "../seeds/StatsHistogramDeviceResponse.json"
import StatsHistogramQueryResponse from "../seeds/StatsHistogramQueryResponse.json"
import StatsHistogramSourceResponse from "../seeds/StatsHistogramSourceResponse.json"
import StatsResponse from "../seeds/StatsResponse.json"
import { AllWebsiteSeeds, WebsitePremium } from "../seeds/WebsitesSeeds"

export class FullLocalRecipe implements IModule {
  build() {
    const LocationService = new WindowLocationService()
    const WebsitesRepository = new InMemoryWebsitesRepository()
    const AuthRepository = new InMemoryAuthRepository()
    const LocalStorageService = new InMemoryLocalStorageService()
    const AnalyticsService = new InMemoryAnalyticsService()
    const SpreadRepository = new InMemorySpreadRepository()

    AuthRepository.store([
      {
        id: "1",
        email: "hello@gmail.com",
        language: "fr",
        // 3 days ago
        created_at: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
      },
    ])

    LocalStorageService.store(localStorageKeys.TOKEN_KEY, "access-token")
    LocalStorageService.store(localStorageKeys.TOASTER_ACCEPTED, "true")

    for (const website of AllWebsiteSeeds) {
      WebsitesRepository.store(website)
    }

    WebsitesRepository.__storeFetchGoogleDomainsResponse([
      { id: "google:kevin-marques.com" },
      { id: "sc-domain:sudoku.academy" },
      { id: "sc-domain:temple-du-haiku.fr" },
    ])

    WebsitesRepository.__storeStats(
      WebsitePremium.id,
      StatsResponse as unknown as RankingStatsForFrontend
    )

    WebsitesRepository.__storeStatsHistogram(
      StatsHistogramCountryResponse as unknown as RankingStatEntity[],
      "country"
    )
    WebsitesRepository.__storeStatsHistogram(
      StatsHistogramDeviceResponse as unknown as RankingStatEntity[],
      "device"
    )
    WebsitesRepository.__storeStatsHistogram(
      StatsHistogramQueryResponse as unknown as RankingStatEntity[],
      "query"
    )
    WebsitesRepository.__storeStatsHistogram(
      StatsHistogramSourceResponse as unknown as RankingStatEntity[],
      "source"
    )

    return {
      LocalStorageService,
      AuthRepository,
      WebsitesRepository,
      AnalyticsService,
      LocationService,
      SpreadRepository,
    }
  }
}
