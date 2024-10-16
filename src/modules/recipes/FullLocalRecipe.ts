import {
  IndexationQueueStatus,
  IndexationType,
  OpportunityEntity,
  PaymentPlansEntity,
} from "@foudroyer/interfaces"
import { localStorageKeys } from "../../constants/localStorageKeys"
import {
  RankingStatEntity,
  RankingStatsForFrontend,
} from "../../entities/RankingWebsiteEntity"
import { IModule } from "../../interfaces/IModule"
import { InMemoryAuthRepository } from "../../repositories/InMemoryAuthRepository"
import { InMemoryKeywordsRepository } from "../../repositories/InMemoryKeywordsRepository"
import { InMemoryLogsRepository } from "../../repositories/InMemoryLogsRepository"
import { InMemoryOpportunitiesRepository } from "../../repositories/InMemoryOpportunitiesRepository"
import { InMemoryPagesRepository } from "../../repositories/InMemoryPagesRepository"
import { InMemoryPaymentsRepository } from "../../repositories/InMemoryPaymentsRepository"
import { InMemoryRoastRepository } from "../../repositories/InMemoryRoastRepository"
import { InMemorySpreadRepository } from "../../repositories/InMemorySpreadRepository"
import { InMemoryStatsRepository } from "../../repositories/InMemoryStatsRepository"
import { InMemoryWebsitesRepository } from "../../repositories/InMemoryWebsitesRepository"
import { InMemoryIndexationService } from "../../services/InMemoryIndexationService"
import { InMemoryLocalStorageService } from "../../services/InMemoryLocalStorageService"
import { InMemoryPaymentService } from "../../services/InMemoryPaymentService"
import { WindowLocationService } from "../../services/WindowLocationService"
import OpportunitiesResponse from "../seeds/OpportunitiesResponse.json"
import { AllRoastSeeds } from "../seeds/RoastSeeds"
import StatsHistogramCountryResponse from "../seeds/StatsHistogramCountryResponse.json"
import StatsHistogramDeviceResponse from "../seeds/StatsHistogramDeviceResponse.json"
import StatsHistogramQueryResponse from "../seeds/StatsHistogramQueryResponse.json"
import StatsHistogramSourceResponse from "../seeds/StatsHistogramSourceResponse.json"
import StatsResponse from "../seeds/StatsResponse.json"
import {
  AllWebsiteSeeds,
  WebsiteForDemo,
  WebsiteNoSitemap,
  WebsitePremium,
  WebsitesBasic,
} from "../seeds/WebsitesSeeds"
import { MixpanelAnalyticsService } from "./../../services/MixpanelAnalyticsService"

export class FullLocalRecipe implements IModule {
  build() {
    const LocationService = new WindowLocationService()
    const PagesRepository = new InMemoryPagesRepository()
    const WebsitesRepository = new InMemoryWebsitesRepository()
    const IndexationService = new InMemoryIndexationService()
    const AuthRepository = new InMemoryAuthRepository()
    const LocalStorageService = new InMemoryLocalStorageService()
    const AnalyticsService = new MixpanelAnalyticsService()
    const PaymentService = new InMemoryPaymentService()
    const PaymentsRepository = new InMemoryPaymentsRepository()
    const SpreadRepository = new InMemorySpreadRepository()
    const StatsRepository = new InMemoryStatsRepository()
    const RoastRepository = new InMemoryRoastRepository()
    const LogsRepository = new InMemoryLogsRepository()

    const KeywordsRepository = new InMemoryKeywordsRepository()

    const OpportunitiesRepository = new InMemoryOpportunitiesRepository()

    AuthRepository.store([
      {
        id: "1",
        email: "hello@gmail.com",
        language: "fr",
        // 3 days ago
        created_at: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
        last_connected_at: new Date(
          new Date().getTime() - 2 * 24 * 60 * 60 * 1000
        ),
        username: "hello",
        welcome_email_sent_at: new Date(
          new Date().getTime() - 1 * 24 * 60 * 60 * 1000
        ),
      },
    ])

    LocalStorageService.store(localStorageKeys.TOKEN_KEY, "access-token")

    LocalStorageService.store(localStorageKeys.TOASTER_ACCEPTED, "true")

    for (const website of AllWebsiteSeeds) {
      WebsitesRepository.store(website)
    }

    KeywordsRepository.create({
      websiteId: WebsitePremium.id,
      keywords: [
        "sudoku academy",
        "sudoku facile",
        "sudoku difficile",
        "sudoku moyen",
      ],
    })

    OpportunitiesRepository.__storeOpportunities({
      opportunities: OpportunitiesResponse as OpportunityEntity[],
    })

    PaymentsRepository.__storePaymentsInfo({
      cancel_url: "",
      paused_at: null,
      cancellation_effective_date: null,
      fk_user_id: "me",
      paddle_user_id: "",
      created_at: new Date(),
      id: "a",
      plan: PaymentPlansEntity.enterprise,
      subscription_id: "",
      update_url: "",
      interval: "yearly",
    })

    // PaymentsRepository.__storePaymentsInfo({
    //   cancel_url: "",
    //   cancellation_effective_date: null,
    //   fk_user_id: "me",
    //   paddle_user_id: "",
    //   created_at: new Date(),
    //   id: "a",
    //   plan: PaymentPlansEntity.indexation,
    //   subscription_id: "",
    //   update_url: "",
    // })

    WebsitesRepository.__storeFetchYandexDomainsResponse([
      { id: "yandex:chanoyu.fr" },
    ])
    WebsitesRepository.__storeFetchGoogleDomainsResponse([
      { id: "google:chanoyu.fr" },
      { id: "sc-domain:sudoku.academy" },
      { id: "sc-domain:hellofabien.fr" },
      { id: "hellofabien.fr/blog" },
    ])
    WebsitesRepository.__storeFetchBingDomainsResponse([
      { id: "bing:chanoyu.fr" },
    ])

    WebsitesRepository.__checkResponse({
      website: "www.japon-et-decouverte",
      response: {
        isCredentialsValid: true,
        isSitemapValid: true,
      },
    })

    WebsitesRepository.__checkResponse({
      website: "www.no-credentials.fr",
      response: {
        isCredentialsValid: false,
        isSitemapValid: true,
      },
    })

    WebsitesRepository.__checkResponse({
      website: WebsiteNoSitemap.id,
      response: {
        isCredentialsValid: true,
        isSitemapValid: false,
      },
    })

    WebsitesRepository.__updateCredentialsResponse({
      website: "www.no-credentials.fr",
      response: {
        error: false,
        body: null,
      },
    })

    PagesRepository._store([
      {
        fk_website_id: "www.japon-et-decouvertes.fr/art-japonais/",
        url: "https://www.japon-et-decouvertes.fr/art-japonais/",
        updated_at: new Date("2021-01-01"),
        indexation_state: IndexationType.INDEXED,
        in_sitemap_last_modified_at: null,
        request_indexing_at: null,
        inspection_google_page: null,
        submitted_at: null,
      },
      {
        fk_website_id: "www.sudoku.academy/fr/",
        url: "https://www.japon-et-decouvertes.fr/voyages-au-japon/",
        updated_at: new Date("2021-12-02"),
        indexation_state: IndexationType.NOT_INDEXED,
        in_sitemap_last_modified_at: null,
        request_indexing_at: null,
        inspection_google_page: null,
        submitted_at: null,
      },
      {
        fk_website_id: "www.sudoku.academy/fr/apprendre/",
        url: "https://www.japon-et-decouvertes.fr/gastronomie-japonaise/",
        updated_at: new Date("2021-12-03"),
        indexation_state: IndexationType.INDEXED,
        in_sitemap_last_modified_at: null,
        request_indexing_at: new Date(),
        inspection_google_page: null,
        submitted_at: null,
      },
      {
        fk_website_id: "www.sudoku.academy/fr/indexing/",
        url: "https://www.japon-et-decouvertes.fr/indexing/",
        updated_at: new Date("2021-12-03"),
        indexation_state: IndexationType.INDEXED,
        in_sitemap_last_modified_at: null,
        request_indexing_at: new Date(),
        inspection_google_page: null,
        submitted_at: null,
      },
      {
        fk_website_id: "www.sudoku.academy/de/",
        url: "https://www.japon-et-decouvertes.fr/artisanat-japonais/",
        updated_at: new Date("2021-12-03"),
        indexation_state: IndexationType.INDEXED,
        in_sitemap_last_modified_at: null,
        request_indexing_at: new Date(),
        inspection_google_page: null,
        submitted_at: null,
      },
      {
        fk_website_id: "www.sudoku.academy/pt/",
        url: "https://www.japon-et-decouvertes.fr/art-japonais/sudoku/",
        updated_at: new Date("2021-12-03"),
        indexation_state: IndexationType.INDEXED,
        in_sitemap_last_modified_at: null,
        request_indexing_at: new Date(),
        inspection_google_page: null,
        submitted_at: null,
      },
    ])

    WebsitesRepository.__storeStats(
      WebsiteForDemo.id,
      StatsResponse as unknown as RankingStatsForFrontend
    )

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

    IndexationService.__storeCheckIndexNowKeyResponse({
      websiteId: WebsitesBasic[0].id,
      response: {
        error: false,
        body: {
          success: true,
        },
      },
    })

    IndexationService.__storeGoogleApiKeys({
      keys: [],
    })

    PagesRepository._storeQueue([
      {
        created_at: new Date(),
        fk_website_id: WebsitePremium.id,
        indexed_at: new Date(),
        page: "https://www.sudoku.academy",
        page_updated_at: new Date(),
        sources: ["google", "bing"],
        status: IndexationQueueStatus.done,
        checked_indexation_state_at: new Date(),
        inspection_google_page: null,
        is_indexed: true,
        indexation_state: IndexationType["error-unknown"],
        fake_indexation_state_at: new Date(),
      },
      {
        created_at: new Date(),
        fk_website_id: WebsitePremium.id,
        indexed_at: null,
        page: "https://www.sudoku.academy/fr/",
        page_updated_at: new Date(),
        sources: ["google", "bing", "yandex", "naver"],
        status: IndexationQueueStatus.queue,
        checked_indexation_state_at: null,
        inspection_google_page: null,
        is_indexed: false,
        indexation_state: IndexationType["error-unknown"],
        fake_indexation_state_at: new Date(),
      },
    ])

    SpreadRepository.__storeStats(
      StatsResponse as unknown as RankingStatsForFrontend,
      [
        {
          id: WebsitePremium.id,
          clicks: 100,
          impressions: 1000,
          timeline: StatsResponse.date,
        },
        {
          id: WebsiteForDemo.id,
          clicks: 100,
          impressions: 1000,
          timeline: StatsResponse.date,
        },
        {
          id: WebsitePremium.id,
          clicks: 100,
          impressions: 1000,
          timeline: StatsResponse.date,
        },
        {
          id: WebsiteForDemo.id,
          clicks: 100,
          impressions: 1000,
          timeline: StatsResponse.date,
        },
        {
          id: WebsitePremium.id,
          clicks: 100,
          impressions: 1000,
          timeline: StatsResponse.date,
        },
        {
          id: WebsiteForDemo.id,
          clicks: 100,
          impressions: 1000,
          timeline: StatsResponse.date,
        },
        {
          id: WebsitePremium.id,
          clicks: 100,
          impressions: 1000,
          timeline: StatsResponse.date,
        },
        {
          id: WebsiteForDemo.id,
          clicks: 100,
          impressions: 1000,
          timeline: StatsResponse.date,
        },
      ]
    )

    /**
     * Roast
     */

    for (const website of AllRoastSeeds) {
      RoastRepository.store(website)
    }

    return {
      StatsRepository,
      RoastRepository,
      PaymentsRepository,
      PaymentService,
      LocalStorageService,
      AuthRepository,
      WebsitesRepository,
      AnalyticsService,
      LocationService,
      IndexationService,
      PagesRepository,
      KeywordsRepository,
      OpportunitiesRepository,
      SpreadRepository,
      LogsRepository,
    }
  }
}
