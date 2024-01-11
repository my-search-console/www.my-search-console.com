import { init as createStore } from "../redux/store"
import { actions } from "../redux/actions"
import { TestModule } from "../modules/TestModule"

export const createStoreForTests = (initialState = {}) => {
  const di = new TestModule().build()

  const { store } = createStore(initialState, di)

  return {
    store,
    actions,
    di,
  }
}
