import { ErrorEntity } from "@foudroyer/interfaces"
import { NotificationMessageEntity } from "../../../entities/NotificationEntity"
import { RoastWithReportEntity } from "../../../entities/RoastEntity"
import { createStoreForTests } from "../../../utils/createStoreForTests"

const WebsiteForTest: RoastWithReportEntity = {
  id: "www.test.com",
  url: "www.test.com",
  search_console_domain: "www.test.com",
  favicon: "www.test.com",
  robots: [],
  server: [],
  sitemap: [],
  indexation: [],
}

describe("websites tests suite", () => {
  it("as a user, when I click on the roast button, I should be in loading mode", async () => {
    const { store, actions, di } = createStoreForTests()

    const promise = store.dispatch<any>(actions.websites.$roast())

    let isLoading = store.getState().websites.fetching

    expect(isLoading).toEqual(true)

    await promise

    isLoading = store.getState().websites.fetching

    expect(isLoading).toEqual(false)
  })

  it("as a user, when I click on the roast button, I should see my websites roasted", async () => {
    const { store, actions, di } = createStoreForTests()

    expect(store.getState().websites.entities).toHaveLength(0)

    await di.WebsitesRepository.store(WebsiteForTest)

    await store.dispatch<any>(actions.websites.$roast())

    expect(store.getState().websites.entities).toHaveLength(1)
  })

  it("as a user, if the server respond with an error, show a notification and remove fetching status", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.__roast({
      error: true,
      code: ErrorEntity.WEBSITE_NOT_FOUND,
    })

    await store.dispatch<any>(actions.websites.$roast())

    expect(store.getState().notifications.notifications).toHaveLength(1)
    expect(store.getState().websites.fetching).toEqual(false)
  })

  it("as a user, if I click on the roast button, I should send an event on the Analytics Service", async () => {
    const { store, actions, di } = createStoreForTests()

    await di.WebsitesRepository.store(WebsiteForTest)

    await store.dispatch<any>(actions.websites.$roast())

    expect(di.AnalyticsService.getAllAnalytics()).toHaveLength(1)
  })

  it("as a user, when I click on the refresh button but the roast is already loading, send a notification that said the roast is alreay loading", async () => {
    const { store, actions, di } = createStoreForTests()

    await di.WebsitesRepository.store(WebsiteForTest)

    store.dispatch<any>(actions.websites.$roast())
    store.dispatch<any>(actions.websites.$roast())

    expect(store.getState().notifications.notifications).toHaveLength(1)
    expect(store.getState().notifications.notifications[0].message).toEqual(
      NotificationMessageEntity.WEBSITES_ALREADY_REFRESHING
    )
  })

  it("as a user, if I already fetch my websites, don't fetch again (have a better feeling)", async () => {
    const { store, actions, di } = createStoreForTests()

    await di.WebsitesRepository.store(WebsiteForTest)

    expect(store.getState().websites.entities).toHaveLength(0)

    await store.dispatch<any>(actions.websites.$fetchAll())

    expect(store.getState().websites.entities).toHaveLength(1)

    await di.WebsitesRepository.store({
      id: "www.test2.com",
      url: "www.test2.com",
      search_console_domain: "www.test2.com",
      favicon: "www.test2.com",
      robots: [],
      server: [],
      sitemap: [],
      indexation: [],
    })

    await store.dispatch<any>(actions.websites.$fetchAll())

    expect(store.getState().websites.entities).toHaveLength(1)
  })

  it("as a user, if I logout, websites should be removed from the state", async () => {
    const { store, actions, di } = createStoreForTests()

    await di.WebsitesRepository.store(WebsiteForTest)

    await store.dispatch<any>(actions.websites.$fetchAll())

    expect(store.getState().websites.entities).toHaveLength(1)

    await store.dispatch<any>(actions.auth.$logout())

    expect(store.getState().websites.entities).toHaveLength(0)
  })

  it("as a user, if I select a website, the website should be on the store", async () => {
    const { store, actions, di } = createStoreForTests()

    await di.WebsitesRepository.store(WebsiteForTest)

    await store.dispatch<any>(actions.websites.$fetchAll())
    await store.dispatch<any>(
      actions.websites.$changeWebsite({ websiteId: WebsiteForTest.id })
    )

    expect(store.getState().websites.website).toEqual(WebsiteForTest)
  })

  it("as a user, if I go to a website page, the website should be found in the url and stored on the store", async () => {
    const { store, actions, di } = createStoreForTests()

    di.LocationService.push(`/dashboard/${WebsiteForTest.id}/robots/`)
    await di.WebsitesRepository.store(WebsiteForTest)

    await store.dispatch<any>(actions.websites.$fetchAll())
    await store.dispatch<any>(actions.websites.$setWebsiteActiveFromUrl())

    expect(store.getState().websites.website).toEqual(WebsiteForTest)
  })

  it("as a user, if I go to a website page that not exists, I should be redirected on home page with a notification error", async () => {
    const { store, actions, di } = createStoreForTests()

    di.LocationService.push(`/dashboard/bad-website/robots/`)
    await di.WebsitesRepository.store(WebsiteForTest)

    await store.dispatch<any>(actions.websites.$fetchAll())
    await store.dispatch<any>(actions.websites.$setWebsiteActiveFromUrl())

    expect(store.getState().websites.website).toEqual(null)
    expect(di.LocationService.getFullUrl()).toEqual("http://local.dev/")

    expect(store.getState().notifications.notifications).toHaveLength(1)
    expect(store.getState().notifications.notifications[0].type).toEqual(
      "error"
    )
    expect(store.getState().notifications.notifications[0].message).toEqual(
      ErrorEntity.WEBSITE_NOT_FOUND
    )
  })
})
