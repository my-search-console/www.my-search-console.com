import {
  WebsiteActivated,
  WebsitePremium,
} from "../../../modules/seeds/WebsitesSeeds"
import { createStoreForTests } from "../../../utils/createStoreForTests"

describe("analytics tests suite", () => {
  it("as a user, i would like to fetch ranking stats", async () => {
    const { store, actions, di } = await createStoreForTests()

    const website = WebsiteActivated

    di.WebsitesRepository.store(website)

    di.LocationService.navigate("/analytics/" + website.id)

    const promise = store.dispatch<any>(actions.analytics.$fetch())

    expect(store.getState().analytics.isFetching).toEqual(true)

    await promise

    expect(store.getState().analytics.isFetching).toEqual(false)

    expect(store.getState().analytics.stats.countries).toEqual([])
    expect(store.getState().analytics.stats.date).toEqual([])
    expect(store.getState().analytics.stats.devices).toEqual([])
    expect(store.getState().analytics.stats.query).toEqual([])
    expect(store.getState().analytics.stats.sources).toEqual([])
    expect(store.getState().analytics.stats.global.click_through_rate).toEqual(
      0
    )
    expect(store.getState().analytics.stats.global.position).toEqual(0)
    expect(store.getState().analytics.stats.global.impressions).toEqual(0)
    expect(store.getState().analytics.stats.global.clicks).toEqual(0)
  })

  it("as a user, i would like to add a filter", async () => {
    const { store, actions, di } = await createStoreForTests()

    const website = WebsitePremium

    di.WebsitesRepository.store(website)

    di.LocationService.navigate("/analytics/" + website.id)

    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())

    await store.dispatch<any>(
      actions.analytics.$RankingStoreFilter({
        type: "source",
        value: "google",
      })
    )

    expect(di.LocationService.getFullUrl()).toEqual(
      "http://local.dev/analytics/" + website.id + "?source=google"
    )

    await store.dispatch<any>(
      actions.analytics.$RankingStoreFilter({
        type: "source",
        value: "google",
      })
    )

    expect(di.LocationService.getFullUrl()).toEqual(
      "http://local.dev/analytics/" + website.id
    )

    await store.dispatch<any>(
      actions.analytics.$RankingStoreFilter({
        type: "source",
        value: "google",
      })
    )

    await store.dispatch<any>(
      actions.analytics.$RankingStoreFilter({
        type: "query",
        value: "sudoku",
      })
    )

    expect(di.LocationService.getFullUrl()).toEqual(
      "http://local.dev/analytics/" + website.id + "?source=google&query=sudoku"
    )

    await store.dispatch<any>(
      actions.analytics.$RankingStoreFilter({
        type: "source",
        value: "google",
      })
    )

    expect(di.LocationService.getFullUrl()).toEqual(
      "http://local.dev/analytics/" + website.id + "?query=sudoku"
    )
  })
})
