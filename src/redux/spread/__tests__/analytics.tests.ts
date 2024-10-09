import {
  WebsiteActivated,
  WebsiteNotActivatedAndNotPremium,
  WebsitePremium,
} from "../../../modules/seeds/WebsitesSeeds"
import { createStoreForTests } from "../../../utils/createStoreForTests"

describe("analytics tests suite", () => {
  it("as a user, i would like to fetch ranking stats", async () => {
    const { store, actions, di } = createStoreForTests()

    const website = WebsiteActivated

    di.WebsitesRepository.store(website)

    di.LocationService.navigate("/analytics/" + website.id)

    const promise = store.dispatch<any>(actions.ranking.$fetch())

    expect(store.getState().ranking.isFetching).toEqual(true)

    await promise

    expect(store.getState().ranking.isFetching).toEqual(false)

    expect(store.getState().ranking.stats.countries).toEqual([])
    expect(store.getState().ranking.stats.date).toEqual([])
    expect(store.getState().ranking.stats.devices).toEqual([])
    expect(store.getState().ranking.stats.query).toEqual([])
    expect(store.getState().ranking.stats.sources).toEqual([])
    expect(store.getState().ranking.stats.global.click_through_rate).toEqual(0)
    expect(store.getState().ranking.stats.global.position).toEqual(0)
    expect(store.getState().ranking.stats.global.impressions).toEqual(0)
    expect(store.getState().ranking.stats.global.clicks).toEqual(0)
  })

  it("as a user, i would like to add a filter", async () => {
    const { store, actions, di } = createStoreForTests()

    const website = WebsitePremium

    di.WebsitesRepository.store(website)

    di.LocationService.navigate("/analytics/" + website.id)

    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())

    await store.dispatch<any>(
      actions.ranking.$RankingStoreFilter({
        type: "source",
        value: "google",
      })
    )

    expect(di.LocationService.getFullUrl()).toEqual(
      "http://local.dev/analytics/" + website.id + "?source=google"
    )

    await store.dispatch<any>(
      actions.ranking.$RankingStoreFilter({
        type: "source",
        value: "google",
      })
    )

    expect(di.LocationService.getFullUrl()).toEqual(
      "http://local.dev/analytics/" + website.id
    )

    await store.dispatch<any>(
      actions.ranking.$RankingStoreFilter({
        type: "source",
        value: "google",
      })
    )

    await store.dispatch<any>(
      actions.ranking.$RankingStoreFilter({
        type: "query",
        value: "sudoku",
      })
    )

    expect(di.LocationService.getFullUrl()).toEqual(
      "http://local.dev/analytics/" + website.id + "?source=google&query=sudoku"
    )

    await store.dispatch<any>(
      actions.ranking.$RankingStoreFilter({
        type: "source",
        value: "google",
      })
    )

    expect(di.LocationService.getFullUrl()).toEqual(
      "http://local.dev/analytics/" + website.id + "?query=sudoku"
    )
  })

  it("as a user, if i make twice the same request to get stats, the second request should not be made", async () => {
    const { store, actions, di } = createStoreForTests()

    const website = WebsitePremium

    di.LocationService.navigate("/analytics/" + website.id)
    di.WebsitesRepository.__storeStats(website.id, {
      global: {
        click_through_rate: 1,
        clicks: 0,
        impressions: 0,
        position: 0,
        previous_click_through_rate: 0,
        previous_clicks: 0,
        previous_impressions: 0,
        previous_position: 0,
      },
      date: [],
      sources: [],
      devices: [],
      query: [],
      countries: [],
    })

    await store.dispatch<any>(actions.ranking.$fetch())

    expect(store.getState().ranking.stats.global.click_through_rate).toEqual(1)

    di.WebsitesRepository.__storeStats(website.id, {
      global: {
        click_through_rate: 100,
        clicks: 0,
        impressions: 0,
        position: 0,
        previous_click_through_rate: 0,
        previous_clicks: 0,
        previous_impressions: 0,
        previous_position: 0,
      },
      date: [],
      sources: [],
      devices: [],
      query: [],
      countries: [],
    })

    await store.dispatch<any>(actions.ranking.$fetch())

    expect(store.getState().ranking.stats.global.click_through_rate).toEqual(1)
  })

  it("as a user, if my website is not premium and I did not activate analytics, my loaded stats are the ones from www.sudoku.academy", async () => {
    const { store, actions, di } = createStoreForTests()

    const website = WebsiteNotActivatedAndNotPremium
    const websiteDemo = WebsitePremium

    di.WebsitesRepository.__storeStats(websiteDemo.id, {
      global: {
        click_through_rate: 1000000,
        clicks: 0,
        impressions: 0,
        position: 0,
        previous_click_through_rate: 0,
        previous_clicks: 0,
        previous_impressions: 0,
        previous_position: 0,
      },
      date: [],
      sources: [],
      devices: [],
      query: [],
      countries: [],
    })

    di.WebsitesRepository.__storeStats(website.id, {
      global: {
        click_through_rate: 10,
        clicks: 0,
        impressions: 0,
        position: 0,
        previous_click_through_rate: 0,
        previous_clicks: 0,
        previous_impressions: 0,
        previous_position: 0,
      },
      date: [],
      sources: [],
      devices: [],
      query: [],
      countries: [],
    })

    di.LocationService.navigate("/analytics/" + website.id)

    await store.dispatch<any>(actions.ranking.$fetch())

    expect(store.getState().ranking.stats.global.click_through_rate).toEqual(
      1000000
    )
  })
})
