import {
  IndexationType,
  PageEntity,
  WebsiteEntity,
} from "@foudroyer/interfaces"
import {
  WebsiteActivated,
  WebsitePremium,
} from "../../../modules/seeds/WebsitesSeeds"
import { createStoreForTests } from "../../../utils/createStoreForTests"

describe("indexation tests suite", () => {
  it("as a user, i should be able to fetch pages of selected website", async () => {
    const { store, actions, di } = createStoreForTests()

    const website: WebsiteEntity = {
      already_activated: false,
      search_console_domain: "",
      image: "https://www.sudoku.academy",
      sitemap: "https://www.sudoku.academy",
      id: "www.sudoku.academy",
      yandex_domain: null,
      bing_domain: null,
      index_now_key: null,
      index_now_installed: false,
      is_premium: false,
      is_analytics_activated: false,
      sitemap_updated_at: new Date("2021-01-01"),
    }

    const pages: PageEntity[] = [
      {
        fk_website_id: website.id,
        url: "https://www.sudoku.academy/from-memory/",
        updated_at: new Date("2021-01-01"),
        indexation_state: IndexationType.INDEXED,
      },
      {
        fk_website_id: website.id,
        url: "https://www.sudoku.academy/from-sitemap/",
        updated_at: new Date("2021-01-01"),
        indexation_state: IndexationType.INDEXED,
      },
    ]

    di.WebsitesRepository.store(website)
    di.PagesRepository._store(pages)
    di.LocationService.navigate("/indexation/" + website.id)

    await store.dispatch<any>(actions.websites.$fetchAll())
    await store.dispatch<any>(
      actions.websites.$changeWebsite({
        websiteId: website.id,
      })
    )

    expect(store.getState().websites.activeWebsite).toEqual(website.id)
    expect(store.getState().indexation.fetching).toEqual(false)
    expect(store.getState().indexation.pages).toEqual(pages)
  })

  it("as a user, i should be able to filter the pages by name", async () => {
    const { store, actions, di } = createStoreForTests()

    const website: WebsiteEntity = {
      already_activated: false,
      search_console_domain: "",
      image: "https://www.sudoku.academy",
      sitemap: "https://www.sudoku.academy",
      id: "https://www.sudoku.academy",
      yandex_domain: null,
      bing_domain: null,
      index_now_key: null,
      index_now_installed: false,
      is_premium: false,
      is_analytics_activated: false,
      sitemap_updated_at: new Date("2021-01-01"),
    }

    const pages: PageEntity[] = [
      {
        fk_website_id: website.id,
        url: "https://www.sudoku.academy/from-memory/",
        updated_at: new Date("2021-01-01"),
        indexation_state: IndexationType.NOT_INDEXED,
      },
      {
        fk_website_id: website.id,
        url: "https://www.sudoku.academy/from-sitemap/",
        updated_at: new Date("2021-01-01"),
        indexation_state: IndexationType.NOT_INDEXED,
      },
    ]

    di.WebsitesRepository.store(website)
    di.PagesRepository._store(pages)
    di.LocationService.navigate("/indexation/" + website.id)

    await store.dispatch<any>(actions.websites.$fetchAll())
    await store.dispatch<any>(
      actions.websites.$changeWebsite({
        websiteId: "https://www.sudoku.academy",
      })
    )

    await store.dispatch<any>(actions.indexation.$fetch())

    store.dispatch<any>(actions.indexation.filterByName({ name: "sitemap" }))

    await store.dispatch<any>(actions.indexation.$fetch())

    expect(store.getState().indexation.pages).toEqual([pages[1]])
  })

  it("as a user, i should be able to send the urls filtered to indexation process", async () => {
    const { store, actions, di } = createStoreForTests()

    const website: WebsiteEntity = {
      already_activated: false,
      search_console_domain: "",
      image: "https://www.sudoku.academy",
      sitemap: "https://www.sudoku.academy",
      id: "https://www.sudoku.academy",
      yandex_domain: null,
      bing_domain: null,
      index_now_key: null,
      index_now_installed: false,
      is_premium: false,
      is_analytics_activated: false,
      sitemap_updated_at: new Date("2021-01-01"),
    }

    const pages: PageEntity[] = [
      {
        fk_website_id: website.id,
        url: "https://www.sudoku.academy/from-memory/",
        updated_at: new Date("2021-01-01"),
        indexation_state: IndexationType.NOT_INDEXED,
      },
      {
        fk_website_id: website.id,
        url: "https://www.sudoku.academy/from-sitemap/",
        updated_at: new Date("2021-01-01"),
        indexation_state: IndexationType.INDEXED,
      },
    ]

    di.WebsitesRepository.store(website)
    di.PagesRepository._store(pages)
    di.LocationService.navigate("/indexation/" + website.id)

    await store.dispatch<any>(actions.websites.$fetchAll())
    await store.dispatch<any>(
      actions.websites.$changeWebsite({
        websiteId: "https://www.sudoku.academy",
      })
    )

    await store.dispatch<any>(
      actions.indexation.filterByName({ name: "from-sitemap" })
    )

    await store.dispatch<any>(actions.indexation.$fetch())
  })

  describe("Pagination test suite", () => {
    it("I should be able to paginate", async () => {
      const { store, actions, di } = createStoreForTests()

      di.WebsitesRepository.store(WebsiteActivated)
      di.WebsitesRepository.__checkResponse({
        website: WebsiteActivated.id,
        response: {
          isSitemapValid: true,
          isCredentialsValid: true,
        },
      })

      di.LocationService.navigate("/indexation/" + WebsiteActivated.id)

      await store.dispatch<any>(actions.websites.$fetchAll())
      await store.dispatch<any>(
        actions.websites.$changeWebsite({ websiteId: WebsiteActivated.id })
      )

      const pages: PageEntity[] = [
        {
          fk_website_id: WebsiteActivated.id,
          url: "https://www.sudoku.academy/indexed/",
          updated_at: new Date("2021-01-04"),
          indexation_state: IndexationType.INDEXED,
        },
        {
          fk_website_id: WebsiteActivated.id,
          url: "https://www.sudoku.academy/not-processed/",
          updated_at: new Date("2021-01-02"),
          indexation_state: IndexationType.NOT_INDEXED,
        },
        {
          fk_website_id: WebsiteActivated.id,
          url: "https://www.sudoku.academy/indexing/",
          updated_at: new Date("2021-01-01"),
          indexation_state: IndexationType.INDEXING,
        },
        {
          fk_website_id: WebsiteActivated.id,
          url: "https://www.sudoku.academy/indexing/",
          updated_at: new Date("2021-01-01"),
          indexation_state: IndexationType.INDEXING,
        },
      ]

      di.PagesRepository._store(pages)

      expect(store.getState().indexation.pagination.limit).toEqual(50)
      expect(store.getState().indexation.pagination.page).toEqual(1)

      store.dispatch<any>(
        actions.indexation.pagination.limit.update({
          value: 1,
        })
      )

      expect(store.getState().indexation.pagination.limit).toEqual(1)

      await store.dispatch<any>(actions.indexation.$fetch())

      expect(store.getState().indexation.pages).toEqual([pages[0]])

      await store.dispatch<any>(actions.indexation.pagination.$next())

      expect(store.getState().indexation.pagination.page).toEqual(2)
      expect(store.getState().indexation.pages).toEqual([pages[1]])

      await store.dispatch<any>(actions.indexation.pagination.$next())

      expect(store.getState().indexation.pagination.page).toEqual(3)
      expect(store.getState().indexation.pages).toEqual([pages[2]])

      await store.dispatch<any>(actions.indexation.pagination.$next())

      expect(store.getState().indexation.pages).toEqual([pages[2]])
      expect(store.getState().indexation.pagination.page).toEqual(3)

      await store.dispatch<any>(actions.indexation.pagination.$previous())

      expect(store.getState().indexation.pagination.page).toEqual(2)
      expect(store.getState().indexation.pages).toEqual([pages[1]])

      await store.dispatch<any>(actions.indexation.pagination.$previous())

      expect(store.getState().indexation.pagination.page).toEqual(1)
      expect(store.getState().indexation.pages).toEqual([pages[0]])

      await store.dispatch<any>(actions.indexation.pagination.$previous())

      expect(store.getState().indexation.pagination.page).toEqual(1)
      expect(store.getState().indexation.pages).toEqual([pages[0]])
    })
  })

  it("quand je clique sur le bouton d'indexation automatique, ça doit ouvrir la modale d'indexation automatique", async () => {
    const { store, actions } = createStoreForTests()

    expect(store.getState().indexation.autoIndexationModal.isOpen).toEqual(
      false
    )

    store.dispatch<any>(
      actions.indexation.IndexationAutoIndexationModalSetIsOpen({ value: true })
    )

    expect(store.getState().indexation.autoIndexationModal.isOpen).toEqual(true)

    store.dispatch<any>(
      actions.indexation.IndexationAutoIndexationModalSetIsOpen({
        value: false,
      })
    )

    expect(store.getState().indexation.autoIndexationModal.isOpen).toEqual(
      false
    )
  })

  it("dans la modale d'indexation, je dois pouvoir choisir les moteurs de recherches avec lesquels indexer", async () => {
    const { store, actions } = createStoreForTests()

    expect(
      store.getState().indexation.autoIndexationModal.searchEngines
    ).toEqual({
      google: false,
      bing: false,
      yandex: false,
      naver: false,
    })

    store.dispatch<any>(
      actions.indexation.IndexationAutoIndexationModalToggleSource({
        type: "google",
        value: true,
      })
    )

    expect(
      store.getState().indexation.autoIndexationModal.searchEngines
    ).toEqual({
      google: true,
      bing: false,
      yandex: false,
      naver: false,
    })
  })

  it("dans la modale d'indexation, je dois pouvoir activer ou désactiver l'indexation automatique", async () => {
    const { store, actions } = createStoreForTests()

    expect(store.getState().indexation.autoIndexationModal.isActive).toEqual(
      false
    )

    store.dispatch<any>(
      actions.indexation.IndexationAutoIndexationModalToggleActivate({})
    )

    expect(store.getState().indexation.autoIndexationModal.isActive).toEqual(
      true
    )
  })

  it("je dois pouvoir récupérer depuis le back-end les infos de l'indexation automatique", async () => {
    const { store, di, actions } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)

    di.LocationService.navigate("/indexation/" + WebsitePremium.id)

    di.PagesRepository.__storeIndexationAuto(WebsitePremium.id, {
      searchEngines: {
        google: true,
        bing: false,
        yandex: false,
        naver: false,
      },
      isActive: true,
    })

    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())
    await store.dispatch<any>(actions.indexation.$IndexationAutoFetch())

    expect(store.getState().indexation.autoIndexationModal.isActive).toEqual(
      true
    )
    expect(
      store.getState().indexation.autoIndexationModal.searchEngines
    ).toEqual({
      google: true,
      bing: false,
      yandex: false,
      naver: false,
    })
  })

  it("je dois pouvoir sauvegarder les nouveaux paramètres de l'indexation automatique", async () => {
    const { store, di, actions } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)

    di.LocationService.navigate("/indexation/" + WebsitePremium.id)

    di.PagesRepository.__storeIndexationAuto(WebsitePremium.id, {
      searchEngines: {
        google: false,
        bing: false,
        yandex: false,
        naver: false,
      },
      isActive: true,
    })

    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())
    await store.dispatch<any>(actions.indexation.$IndexationAutoFetch())

    store.dispatch<any>(
      actions.indexation.IndexationAutoIndexationModalToggleActivate({
        value: true,
      })
    )

    store.dispatch<any>(
      actions.indexation.IndexationAutoIndexationModalToggleSource({
        type: "google",
        value: true,
      })
    )

    await store.dispatch<any>(actions.indexation.$IndexationAutoSave())

    expect(store.getState().indexation.autoIndexationModal.isActive).toEqual(
      true
    )
    expect(
      store.getState().indexation.autoIndexationModal.searchEngines.google
    ).toEqual(true)

    expect(store.getState().indexation.autoIndexationModal.isOpen).toEqual(
      false
    )
  })

  it("si l'utilisateur active l'indexation sans avoir sélectionner de source, renvoyer une erreur", async () => {
    const { store, di, actions } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)

    di.LocationService.navigate("/indexation/" + WebsitePremium.id)

    di.PagesRepository.__storeIndexationAuto(WebsitePremium.id, {
      searchEngines: {
        google: false,
        bing: false,
        yandex: false,
        naver: false,
      },
      isActive: true,
    })

    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())
    await store.dispatch<any>(actions.indexation.$IndexationAutoFetch())

    store.dispatch<any>(
      actions.indexation.IndexationAutoIndexationModalToggleActivate({
        value: true,
      })
    )
    expect(store.getState().notifications.notifications.length).toEqual(0)

    await store.dispatch<any>(actions.indexation.$IndexationAutoSave())

    expect(store.getState().notifications.notifications.length).toEqual(1)
  })
})
