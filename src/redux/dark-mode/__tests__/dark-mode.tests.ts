import { createStoreForTests } from "../../../utils/createStoreForTests"

describe("dark-mode tests suite", () => {
  it("as a user, i would like to go to dark mode", async () => {
    const { store, actions } = createStoreForTests()

    expect(store.getState().darkMode.dark).toEqual(false)

    store.dispatch(actions.darkMode.toggleDarkMode())

    expect(store.getState().darkMode.dark).toEqual(true)
  })
})
