import { LogsEntity } from "@foudroyer/interfaces"
import { WebsiteActivated } from "../../../modules/seeds/WebsitesSeeds"
import { createStoreForTests } from "../../../utils/createStoreForTests"

describe("logs tests suite", () => {
  it("le reducer initial doit être conforme au snapshot", async () => {
    const { store, actions, di } = await createStoreForTests()
    expect(store.getState().logs).toMatchSnapshot()
  })

  it("je dois pouvoir fetch les logs", async () => {
    const { store, actions, di } = await createStoreForTests({
      seeds: true,
    })

    di.LogsRepository.createOrUpdate({
      id: "id",
      fk_website_id: WebsiteActivated.id,
      title: "",
      description: "",
      log_date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      clicks: 0,
      impressions: 0,
      type: "global",
      query: null,
      page: null,
    })

    expect(store.getState().logs.logs).toHaveLength(0)

    await store.dispatch<any>(actions.logs.$fetch())

    expect(store.getState().logs.logs).toHaveLength(1)
  })

  it("si je crée un log, le titre est obligatoire", async () => {
    const { store, actions, di } = await createStoreForTests({
      seeds: true,
    })

    const log: LogsEntity = {
      id: "",
      fk_website_id: "",
      title: "",
      description: "",
      log_date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      clicks: 0,
      impressions: 0,
      type: "global",
      query: null,
      page: null,
    }

    await store.dispatch<any>(actions.logs.$create(log))

    expect(store.getState().logs.logs).toHaveLength(0)
  })

  it("je dois pouvoir créer un log", async () => {
    const { store, actions, di } = await createStoreForTests({
      seeds: true,
    })

    expect(store.getState().logs.logs).toHaveLength(0)

    const log: LogsEntity = {
      id: "aziadoijz",
      fk_website_id: WebsiteActivated.id,
      title: "hello",
      description: "",
      log_date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      clicks: 0,
      impressions: 0,
      type: "global",
      query: null,
      page: null,
    }

    await store.dispatch<any>(actions.logs.$fetch())

    expect(store.getState().logs.logs).toHaveLength(0)

    await store.dispatch<any>(actions.logs.$create(log))

    expect(store.getState().logs.logs).toHaveLength(1)
    expect(store.getState().logs.logs[0].created_at).toEqual(log.created_at)
  })

  it("je dois pouvoir supprimer un log", async () => {
    const { store, actions, di } = await createStoreForTests({
      seeds: true,
    })

    expect(store.getState().logs.logs).toHaveLength(0)

    const log: LogsEntity = {
      id: "id",

      fk_website_id: WebsiteActivated.id,
      title: "hello",
      description: "",
      log_date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      clicks: 0,
      impressions: 0,
      type: "global",
      query: null,
      page: null,
    }

    await store.dispatch<any>(actions.logs.$create(log))
    await store.dispatch<any>(actions.logs.$delete(log.id))

    expect(store.getState().logs.logs).toHaveLength(0)
  })

  it("je dois pouvoir modifier un log", async () => {
    const { store, actions, di } = await createStoreForTests({
      seeds: true,
    })

    expect(store.getState().logs.logs).toHaveLength(0)

    const log: LogsEntity = {
      id: "id",
      fk_website_id: WebsiteActivated.id,
      title: "hello",
      description: "",
      log_date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      clicks: 0,
      impressions: 0,
      type: "global",
      query: null,
      page: null,
    }

    await store.dispatch<any>(actions.logs.$create(log))
    await store.dispatch<any>(
      actions.logs.$update({ ...log, title: "changed" })
    )

    expect(store.getState().notifications.notifications.length).toEqual(0)
    expect(store.getState().logs.logs.length).toEqual(1)
    expect(store.getState().logs.logs[0].title).toEqual("changed")
  })
})
