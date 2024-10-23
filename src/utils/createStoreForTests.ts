import { WebsiteActivated } from "../modules/seeds/WebsitesSeeds"
import { TestModule } from "../modules/TestModule"
import { actions } from "../redux/actions"
import { init as createStore } from "../redux/store"

export const createStoreForTests = async (params?: { seeds: boolean }) => {
  const di = new TestModule().build()

  const { store } = createStore({}, di)

  if (params?.seeds) {
    await di.WebsitesRepository.store(WebsiteActivated)

    await store.dispatch<any>(actions.websites.$fetchAll())
    await store.dispatch<any>(
      actions.websites.$changeWebsite({ websiteId: WebsiteActivated.id })
    )
  }

  return {
    store,
    actions,
    di,
  }
}
