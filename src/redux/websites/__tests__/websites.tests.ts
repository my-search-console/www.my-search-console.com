import { ErrorEntity } from "@my-search-console/interfaces"
import { NotificationMessageEntity } from "../../../entities/NotificationEntity"
import {
  WebsiteActivated,
  WebsiteNoSitemap,
  WebsiteNotActivated,
} from "../../../modules/seeds/WebsitesSeeds"
import { createStoreForTests } from "../../../utils/createStoreForTests"

describe("websites tests suite", () => {
  describe("creation d'un site web", () => {
    it("en tant qu'utilisateur, je dois pouvoir afficher la modale de création de site", async () => {
      const { store, actions, di } = createStoreForTests()

      expect(store.getState().websites.createWebsiteModal.isOpen).toEqual(false)

      await store.dispatch<any>(actions.websites.$WebsiteCreateModal())

      expect(store.getState().websites.createWebsiteModal.isOpen).toEqual(true)
    })

    it("en tant qu'utilisateur, quand j'ouvre la modale de création, je dois pouvoir sélectionner un site google search console", async () => {
      const { store, actions, di } = createStoreForTests()

      const domains = [{ id: "www.sudoku.academy" }]

      di.WebsitesRepository.__storeFetchGoogleDomainsResponse(domains)

      await store.dispatch<any>(actions.websites.$WebsiteCreateModal())

      expect(store.getState().websites.createWebsiteModal.type).toEqual(
        "google"
      )
      expect(store.getState().websites.createWebsiteModal.domains).toEqual(
        domains
      )

      store.dispatch<any>(
        actions.websites.WebsiteAddSourceModalSelect({ value: domains[0].id })
      )

      expect(store.getState().websites.createWebsiteModal.selected).toEqual(
        domains[0].id
      )
    })

    it("en tant qu'utilisateur, si je sélectionne un site et que je valide, alors un nouveau website est crée et la modale se ferme", async () => {
      const { store, actions, di } = createStoreForTests()

      const domain = { id: "www.sudoku.academy" }

      di.WebsitesRepository.__storeFetchGoogleDomainsResponse([domain])

      await store.dispatch<any>(actions.websites.$WebsiteCreateModal())

      store.dispatch<any>(
        actions.websites.WebsiteAddSourceModalSelect({ value: domain.id })
      )

      await store.dispatch<any>(actions.websites.$activate())

      expect(store.getState().websites.createWebsiteModal.isOpen).toEqual(false)
      expect(store.getState().websites.entities.length).toEqual(1)
      expect(store.getState().websites.entities[0]).toEqual(domain.id)
      expect(store.getState().websites.map.get(domain.id)).toMatchSnapshot()
    })

    it("en tant qu'utilisateur, si j'essaie d'ajouter un site, sans en avoir sélectionné un au préalable, alors il ne se passe rien", async () => {
      const { store, actions, di } = createStoreForTests()

      const domain = { id: "www.sudoku.academy" }

      di.WebsitesRepository.__storeFetchGoogleDomainsResponse([domain])

      await store.dispatch<any>(actions.websites.$WebsiteCreateModal())

      await store.dispatch<any>(actions.websites.$activate())

      expect(store.getState().websites.createWebsiteModal.isOpen).toEqual(true)
      expect(store.getState().websites.entities.length).toEqual(0)
    })

    it("en tant qu'utilisateur, si l'api renvoie une erreur, afficher une notification", async () => {
      const { store, actions, di } = createStoreForTests()

      const domain = { id: "should_return_error_on_activate" }

      di.WebsitesRepository.__storeFetchGoogleDomainsResponse([domain])

      await store.dispatch<any>(actions.websites.$WebsiteCreateModal())

      store.dispatch<any>(
        actions.websites.WebsiteAddSourceModalSelect({ value: domain.id })
      )

      expect(store.getState().websites.createWebsiteModal.isFetching).toEqual(
        false
      )

      const promise = store.dispatch<any>(actions.websites.$activate())

      expect(store.getState().websites.createWebsiteModal.isFetching).toEqual(
        true
      )

      await promise

      expect(store.getState().websites.createWebsiteModal.isFetching).toEqual(
        false
      )
      expect(store.getState().websites.createWebsiteModal.isOpen).toEqual(true)
      expect(store.getState().websites.entities.length).toEqual(0)
      expect(store.getState().notifications.notifications.length).toEqual(1)
    })
  })

  describe("$fetchAll test suite", () => {
    it("si l'api retourne une erreur, alors afficher une notification", async () => {
      const { store, actions, di } = createStoreForTests()

      di.WebsitesRepository.__setFetchResponse({
        error: true,
        code: ErrorEntity.WEBSITE_NOT_FOUND,
      })

      const promise = store.dispatch<any>(actions.websites.$fetchAll())

      expect(store.getState().websites.fetching).toEqual(true)

      await promise

      expect(store.getState().websites.fetching).toEqual(false)
      expect(store.getState().notifications.notifications.length).toEqual(1)
      expect(store.getState().notifications.notifications[0].message).toEqual(
        ErrorEntity.WEBSITE_NOT_FOUND
      )
    })

    it("je veux pouvoir récupérer mes sites web", async () => {
      const { store, actions, di } = createStoreForTests()

      di.WebsitesRepository.store(WebsiteActivated)

      const promise = store.dispatch<any>(actions.websites.$fetchAll())

      expect(store.getState().websites.fetching).toEqual(true)

      await promise

      expect(store.getState().websites.fetching).toEqual(false)
      expect(store.getState().websites.map).toMatchSnapshot()
    })
  })

  describe.skip("$syncWebsiteAndCheckEverything test suite", () => {
    it("si un utilisateur se rend sur la page indexation de son site, le site doit être mis dans le store et sélectionné", async () => {
      const { store, actions, di } = createStoreForTests()

      di.LocationService.navigate("/indexation/www.sudoku.academy")

      await store.dispatch<any>(
        actions.websites.$syncWebsiteAndCheckEverything()
      )

      expect(store.getState().websites.activeWebsite).toEqual(
        "www.sudoku.academy"
      )
    })
  })

  describe("sitemap flow", () => {
    it("should return an error if I try to submit an empty sitemap", async () => {
      const { store, actions, di } = createStoreForTests()

      const website = WebsiteNoSitemap

      di.WebsitesRepository.__checkResponse({
        website: website.id,
        response: {
          isCredentialsValid: false,
          isSitemapValid: false,
        },
      })

      await store.dispatch<any>(actions.websites.$fetchAll())
      await store.dispatch<any>(
        actions.websites.$changeWebsite({ websiteId: website.id })
      )
      expect(store.getState().websites.addSitemap.isOpen).toEqual(true)

      const sitemap = ""

      store.dispatch<any>(actions.websites.updateSitemap({ value: sitemap }))

      await store.dispatch<any>(actions.websites.$saveSitemap())

      expect(store.getState().websites.addSitemap.isFetching).toEqual(false)
      expect(store.getState().websites.addSitemap.isOpen).toEqual(true)
      expect(store.getState().notifications.notifications[0].message).toEqual(
        NotificationMessageEntity.WEBSITES_SITEMAP_UPDATE_EMPTY
      )
    })

    it("should return an error if the server respond with an error", async () => {
      const { store, actions, di } = createStoreForTests()

      const website = WebsiteNoSitemap

      di.WebsitesRepository.__checkResponse({
        website: website.id,
        response: {
          isCredentialsValid: false,
          isSitemapValid: false,
        },
      })

      di.WebsitesRepository.__updateSitemapResponse({
        website: website.id,
        response: {
          error: true,
          code: ErrorEntity.SITEMAP_INVALID,
        },
      })

      await store.dispatch<any>(actions.websites.$fetchAll())
      await store.dispatch<any>(
        actions.websites.$changeWebsite({ websiteId: website.id })
      )
      expect(store.getState().websites.addSitemap.isOpen).toEqual(true)

      const sitemap = "bad-sitemap.xml"

      store.dispatch<any>(actions.websites.updateSitemap({ value: sitemap }))

      await store.dispatch<any>(actions.websites.$saveSitemap())

      expect(store.getState().websites.addSitemap.isFetching).toEqual(false)
      expect(store.getState().websites.addSitemap.isOpen).toEqual(true)
      expect(store.getState().notifications.notifications[0].message).toEqual(
        ErrorEntity.SITEMAP_INVALID
      )
    })

    it("as a user, i should be able to submit the sitemap", async () => {
      const { store, actions, di } = createStoreForTests()

      const website = WebsiteNoSitemap

      di.WebsitesRepository.store(website)

      di.WebsitesRepository.__checkResponse({
        website: website.id,
        response: {
          isCredentialsValid: false,
          isSitemapValid: false,
        },
      })

      await store.dispatch<any>(actions.websites.$fetchAll())

      await store.dispatch<any>(
        actions.websites.$changeWebsite({ websiteId: website.id })
      )

      expect(store.getState().websites.addSitemap.isOpen).toEqual(true)

      const sitemap = "https://www.sudoku.academy/sitemap.xml"

      store.dispatch<any>(actions.websites.updateSitemap({ value: sitemap }))

      const promise = store.dispatch<any>(actions.websites.$saveSitemap())

      expect(store.getState().websites.addSitemap.isFetching).toEqual(true)

      await promise

      expect(store.getState().websites.map.get(website.id)?.sitemap).toEqual(
        sitemap
      )
      expect(store.getState().websites.addSitemap.value).toEqual(null)
      expect(store.getState().websites.addSitemap.isOpen).toEqual(false)
      expect(store.getState().websites.addSitemap.isFetching).toEqual(false)
    })
  })

  describe("credentials flow", () => {
    it("should be able to update the credentials and close modal if the servers says it's good", async () => {
      const { store, actions, di } = createStoreForTests()

      di.WebsitesRepository.store(WebsiteNoSitemap)
      di.WebsitesRepository.store(WebsiteActivated)

      di.WebsitesRepository.__checkResponse({
        website: WebsiteNoSitemap.id,
        response: {
          isCredentialsValid: false,
          isSitemapValid: false,
        },
      })
      di.WebsitesRepository.__updateCredentialsResponse({
        website: WebsiteNoSitemap.id,
        response: {
          error: false,
          body: null,
        },
      })

      await store.dispatch<any>(actions.websites.$fetchAll())
      await store.dispatch<any>(
        actions.websites.$changeWebsite({ websiteId: WebsiteNoSitemap.id })
      )

      store.dispatch<any>(
        actions.websites.setCredentialsIsOpen({
          value: true,
          website: null,
        })
      )

      expect(store.getState().websites.addCredentials.isOpen).toEqual(true)

      store.dispatch<any>(
        actions.websites.updateCredentials({ value: "the keys" })
      )

      const promise = store.dispatch<any>(actions.websites.$saveCredentials())

      expect(store.getState().websites.addCredentials.isFetching).toEqual(true)

      await promise

      expect(store.getState().websites.addCredentials.isFetching).toEqual(false)
      expect(store.getState().websites.addCredentials.isOpen).toEqual(false)
      expect(store.getState().websites.addCredentials.value).toEqual(null)
    })

    it("should show an error if the update credentials failed", async () => {
      const { store, actions, di } = createStoreForTests()

      di.WebsitesRepository.store(WebsiteNoSitemap)
      di.WebsitesRepository.store(WebsiteActivated)

      di.WebsitesRepository.__checkResponse({
        website: WebsiteNoSitemap.id,
        response: {
          isCredentialsValid: false,
          isSitemapValid: false,
        },
      })
      di.WebsitesRepository.__updateCredentialsResponse({
        website: WebsiteNoSitemap.id,
        response: {
          error: true,
          code: ErrorEntity.GOOGLE_UNKNOWN_ERROR,
        },
      })

      await store.dispatch<any>(actions.websites.$fetchAll())
      await store.dispatch<any>(
        actions.websites.$changeWebsite({ websiteId: WebsiteNoSitemap.id })
      )

      store.dispatch<any>(
        actions.websites.setCredentialsIsOpen({
          value: true,
          website: null,
        })
      )

      store.dispatch<any>(
        actions.websites.updateCredentials({ value: "the keys" })
      )

      await store.dispatch<any>(actions.websites.$saveCredentials())

      expect(store.getState().websites.addCredentials.isFetching).toEqual(false)
      expect(store.getState().websites.addCredentials.isOpen).toEqual(true)
      expect(store.getState().notifications.notifications[0].message).toEqual(
        ErrorEntity.GOOGLE_UNKNOWN_ERROR
      )
    })
  })

  describe("$syncAnalytics test suite", () => {
    it("doit pouvoir récupérer le status et le stocker dans le reducer", async () => {
      const { store, actions, di } = createStoreForTests()

      di.WebsitesRepository.store(WebsiteActivated)

      di.LocationService.navigate(`/analytics/${WebsiteActivated.id}`)

      await store.dispatch<any>(actions.websites.$fetchAll())
      await store.dispatch<any>(
        actions.websites.$changeWebsite({ websiteId: WebsiteActivated.id })
      )

      expect(store.getState().ranking.isFinished).toEqual(true)
    })
  })
})
