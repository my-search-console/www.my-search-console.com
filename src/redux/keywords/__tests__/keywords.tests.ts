import {
  WebsiteActivated,
  WebsitePremium,
} from "../../../modules/seeds/WebsitesSeeds"
import { createStoreForTests } from "../../../utils/createStoreForTests"

describe("keywords tests suite", () => {
  it("J'aimerais pouvoir creer un keyword", async () => {
    const { store, di, actions } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)
    di.LocationService.navigate("/keywords/" + WebsitePremium.id)
    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())

    const keyword = "test"

    expect(store.getState().keywords.isFetching).toBe(false)

    store.dispatch<any>(
      actions.keywords.KeywordsSetSelectedKeywordsToCreate({
        keyword: "test",
      })
    )

    const request = store.dispatch<any>(actions.keywords.$create())

    expect(store.getState().keywords.isFetching).toBe(true)
    await request

    expect(store.getState().keywords.isFetching).toBe(false)

    await store.dispatch<any>(actions.keywords.$create())

    expect(store.getState().keywords.keywords.length).toBe(1)
    expect(store.getState().keywords.keywords[0].query).toBe(keyword)
  })

  it("J'aimerais pouvoir delete un keyword", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)
    di.LocationService.navigate("/keywords/" + WebsitePremium.id)
    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())

    const keyword = "test"

    expect(store.getState().keywords.isFetching).toBe(false)

    store.dispatch<any>(
      actions.keywords.KeywordsSetSelectedKeywordsToCreate({
        keyword: "test",
      })
    )

    const request = store.dispatch<any>(actions.keywords.$create())

    expect(store.getState().keywords.isFetching).toBe(true)

    await request

    expect(store.getState().keywords.isFetching).toBe(false)

    store.dispatch<any>(
      actions.keywords.KeywordsSetSelectedKeywords({
        keyword,
      })
    )

    await store.dispatch<any>(actions.keywords.$delete())

    expect(store.getState().keywords.selectedKeywordsToDelete.size).toBe(0)
    expect(store.getState().keywords.keywords.length).toBe(0)
  })

  it("Je veux selectionner un keyword", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)
    di.LocationService.navigate("/keywords/" + WebsitePremium.id)
    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())

    store.dispatch<any>(
      actions.keywords.KeywordsSetSelectedKeywords({
        keyword: "test",
      })
    )

    expect(store.getState().keywords.selectedKeywordsToDelete.size).toBe(1)
  })

  it("Je veux selectionner un keyword et le déselectionner", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)
    di.LocationService.navigate("/keywords/" + WebsitePremium.id)
    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())

    store.dispatch<any>(
      actions.keywords.KeywordsSetSelectedKeywords({
        keyword: "test",
      })
    )

    await store.dispatch<any>(
      actions.keywords.KeywordsSetSelectedKeywords({
        keyword: "test",
      })
    )

    expect(store.getState().keywords.selectedKeywordsToDelete.size).toBe(0)
  })

  it("Je veux ouvrir le modal d'ajout de keyword", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)
    di.LocationService.navigate("/keywords/" + WebsitePremium.id)
    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())

    expect(store.getState().keywords.addKeywordsModal.isOpen).toBe(false)

    store.dispatch<any>(
      actions.keywords.KeywordsSetAddKeywordsModalIsOpen({
        value: true,
      })
    )

    expect(store.getState().keywords.addKeywordsModal.isOpen).toBe(true)
  })

  it("Je veux remplir l'input du modal d'ajout de keyword", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)
    di.LocationService.navigate("/keywords/" + WebsitePremium.id)
    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())

    expect(store.getState().keywords.addKeywordsModal.input).toBe("")

    store.dispatch<any>(
      actions.keywords.KeywordsSetAddKeywordsModalInput({
        value: "test",
      })
    )

    expect(store.getState().keywords.addKeywordsModal.input).toBe("test")
  })

  it("Quand je ferme la modale, je veux que l'input soit vide", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)
    di.LocationService.navigate("/keywords/" + WebsitePremium.id)
    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())

    store.dispatch<any>(
      actions.keywords.KeywordsSetAddKeywordsModalInput({
        value: "test",
      })
    )

    store.dispatch<any>(
      actions.keywords.KeywordsSetSelectedKeywordsToCreate({
        keyword: "test",
      })
    )

    store.dispatch<any>(
      actions.keywords.KeywordsSetAddKeywordsModalIsOpen({
        value: false,
      })
    )

    expect(store.getState().keywords.addKeywordsModal.input).toBe("")
    expect(store.getState().keywords.addKeywordsModal.isOpen).toBe(false)
    expect(store.getState().keywords.selectedKeywordsToCreate.size).toBe(0)
  })

  it("Lorsque je valide l'input, je veux que le keyword soit ajouté", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)
    di.LocationService.navigate("/keywords/" + WebsitePremium.id)
    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())

    store.dispatch<any>(
      actions.keywords.KeywordsSetAddKeywordsModalInput({
        value: "test",
      })
    )

    store.dispatch<any>(actions.keywords.KeywordsStoreInputToKeywords())

    expect(store.getState().keywords.selectedKeywordsToCreate.size).toBe(1)
    expect(store.getState().keywords.addKeywordsModal.input).toBe("")
  })

  it("Losque je valide l'input et qu'il y a des virgules, je veux ajouter plusieurs keywords", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)
    di.LocationService.navigate("/keywords/" + WebsitePremium.id)
    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())

    store.dispatch<any>(
      actions.keywords.KeywordsSetAddKeywordsModalInput({
        value: "test, test2",
      })
    )

    store.dispatch<any>(actions.keywords.KeywordsStoreInputToKeywords())

    expect(store.getState().keywords.selectedKeywordsToCreate.size).toBe(2)
    expect(store.getState().keywords.addKeywordsModal.input).toBe("")
    expect(store.getState().keywords.selectedKeywordsToCreate.has("test")).toBe(
      true
    )
    expect(
      store.getState().keywords.selectedKeywordsToCreate.has("test2")
    ).toBe(true)
  })

  it("Losque je soumets les keywords, je veux les envoyer au serveur, et si la requete est bonne, fermer la modale avec une notification de succes", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)
    di.LocationService.navigate("/keywords/" + WebsitePremium.id)
    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())

    store.dispatch<any>(
      actions.keywords.KeywordsSetAddKeywordsModalInput({
        value: "test, test2",
      })
    )

    store.dispatch<any>(actions.keywords.KeywordsStoreInputToKeywords())

    const request = store.dispatch<any>(actions.keywords.$create())

    expect(store.getState().keywords.isFetching).toBe(true)

    await request

    expect(store.getState().keywords.isFetching).toBe(false)

    expect(store.getState().keywords.keywords.length).toBe(2)
    expect(store.getState().keywords.addKeywordsModal.isOpen).toBe(false)
    expect(store.getState().keywords.addKeywordsModal.input).toBe("")
    expect(store.getState().keywords.selectedKeywordsToCreate.size).toBe(0)
    expect(store.getState().notifications.notifications.length).toBe(1)
  })

  it("Si les l'utilisateur clique sur soumettre mais qu'il n'a pas selectionné de keyword, je veux qu'il y ait une notification d'erreur", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)
    di.LocationService.navigate("/keywords/" + WebsitePremium.id)
    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())

    await store.dispatch<any>(actions.keywords.$create())

    expect(store.getState().notifications.notifications.length).toBe(1)
    expect(store.getState().notifications.notifications[0].type).toBe("error")
  })

  it("Si l'utilisateur essaye de supprimer alors qu'il n'a pas selectionné de keyword, je veux qu'il y ait une notification d'erreur", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)
    di.LocationService.navigate("/keywords/" + WebsitePremium.id)
    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())

    await store.dispatch<any>(actions.keywords.$delete())

    expect(store.getState().notifications.notifications.length).toBe(1)
    expect(store.getState().notifications.notifications[0].type).toBe("error")
  })

  it("Si l'utilisateur change de site, alors je veux qu'un nouveau fetch soit fait", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)
    di.WebsitesRepository.store(WebsiteActivated)
    di.LocationService.navigate("/keywords/" + WebsitePremium.id)

    await di.KeywordsRepository.create({
      websiteId: WebsitePremium.id,
      keywords: ["test", "test2"],
    })

    await di.KeywordsRepository.create({
      websiteId: WebsiteActivated.id,
      keywords: ["activated", "activated2"],
    })

    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())

    expect(store.getState().keywords.keywords.length).toBe(2)
    expect(
      store
        .getState()
        .keywords.keywords.find((keyword) => keyword.query === "test")
    ).toBeTruthy()

    await store.dispatch<any>(
      actions.websites.$changeWebsite({ websiteId: WebsiteActivated.id })
    )

    expect(store.getState().keywords.keywords.length).toBe(2)
    expect(
      store
        .getState()
        .keywords.keywords.find((keyword) => keyword.query === "activated")
    ).toBeTruthy()
  })

  it("Si j'ajoute des keywords à supprimer et que je change de site, je veux que la liste de keywords à supprimer soit vide", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)
    di.WebsitesRepository.store(WebsiteActivated)
    di.LocationService.navigate("/keywords/" + WebsitePremium.id)

    await di.KeywordsRepository.create({
      websiteId: WebsitePremium.id,
      keywords: ["test", "test2"],
    })

    await di.KeywordsRepository.create({
      websiteId: WebsiteActivated.id,
      keywords: ["activated", "activated2"],
    })

    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())

    expect(store.getState().keywords.keywords.length).toBe(2)
    expect(
      store
        .getState()
        .keywords.keywords.find((keyword) => keyword.query === "test")
    ).toBeTruthy()

    store.dispatch<any>(
      actions.keywords.KeywordsSetSelectedKeywords({
        keyword: "test",
      })
    )

    await store.dispatch<any>(
      actions.websites.$changeWebsite({ websiteId: WebsiteActivated.id })
    )

    expect(store.getState().keywords.selectedKeywordsToDelete.size).toBe(0)
  })

  it("Si l'utilisateur ajoute une keyword à la liste de création alors il doit pouvoir le supprimer", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)

    store.dispatch<any>(
      actions.keywords.KeywordsSetSelectedKeywordsToCreate({ keyword: "test" })
    )

    expect(store.getState().keywords.selectedKeywordsToCreate.size).toBe(1)

    store.dispatch<any>(
      actions.keywords.KeywordsSelectedKeywordsToCreateRemoveKeyword({
        keyword: "test",
      })
    )

    expect(store.getState().keywords.selectedKeywordsToCreate.size).toBe(0)
  })

  it("Si l'utilisateur ne filtre pas par pays, alors je veux que le pays soit null", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)

    expect(store.getState().keywords.filters.country).toBe(null)

    store.dispatch<any>(
      actions.keywords.KeywordsSetFiltersCountry({
        country: "fra",
      })
    )

    expect(store.getState().keywords.filters.country).toBe("fra")
  })

  it("Si l'utilisateur filter avec un pays qui n'existe pas, alors la valeur du filtre selectionné doit être null", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)

    store.dispatch<any>(
      actions.keywords.KeywordsSetFiltersCountry({
        country: "fra",
      })
    )

    expect(store.getState().keywords.filters.country).toBe("fra")

    store.dispatch<any>(
      actions.keywords.KeywordsSetFiltersCountry({
        country: "france",
      })
    )

    expect(store.getState().keywords.filters.country).toBe(null)
  })

  it("Si l'utilisateur filtre par pays, alors un appel vers l'api est fait", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)

    di.LocationService.navigate("/keywords/" + WebsitePremium.id)

    await di.KeywordsRepository.create({
      websiteId: WebsitePremium.id,
      keywords: ["test"],
    })

    await di.KeywordsRepository.create({
      websiteId: WebsitePremium.id,
      keywords: ["test"],
      filter: {
        country: "fra",
      },
    })

    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())
    await store.dispatch<any>(actions.keywords.$fetchKeywords())

    expect(store.getState().keywords.keywords[0].country).toBe("world")

    await store.dispatch<any>(
      actions.keywords.$KeywordsSetFiltersCountry({
        country: "fra",
      })
    )

    expect(store.getState().keywords.keywords[0].country).toBe("fra")
  })

  it("Si l'utilisateur ne filtre pas par device, alors je veux que le device soit null", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)

    expect(store.getState().keywords.filters.device).toBe(null)

    store.dispatch<any>(
      actions.keywords.KeywordsSetFiltersDevice({
        device: "desktop",
      })
    )

    expect(store.getState().keywords.filters.device).toBe("desktop")
  })

  it("Si l'utilisateur filtre par device, alors un appel vers l'api est fait", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)

    di.LocationService.navigate("/keywords/" + WebsitePremium.id)

    await di.KeywordsRepository.create({
      websiteId: WebsitePremium.id,
      keywords: ["test"],
    })

    await di.KeywordsRepository.create({
      websiteId: WebsitePremium.id,
      keywords: ["test"],
      filter: {
        device: "mobile",
      },
    })

    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())
    await store.dispatch<any>(actions.keywords.$fetchKeywords())

    expect(store.getState().keywords.keywords[0].device).toBe("desktop")

    await store.dispatch<any>(
      actions.keywords.$KeywordsSetFiltersDevice({
        device: "mobile",
      })
    )

    expect(store.getState().keywords.keywords[0].device).toBe("mobile")
  })
  it("Si l'utilisateur ne filtre pas par source, alors je veux que le source soit null", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)

    expect(store.getState().keywords.filters.source).toBe(null)

    store.dispatch<any>(
      actions.keywords.KeywordsSetFiltersSource({
        source: "yandex",
      })
    )

    expect(store.getState().keywords.filters.source).toBe("yandex")
  })

  it("Si l'utilisateur filtre par source, alors un appel vers l'api est fait", async () => {
    const { store, actions, di } = createStoreForTests()

    di.WebsitesRepository.store(WebsitePremium)

    di.LocationService.navigate("/keywords/" + WebsitePremium.id)

    await di.KeywordsRepository.create({
      websiteId: WebsitePremium.id,
      keywords: ["test"],
    })

    await di.KeywordsRepository.create({
      websiteId: WebsitePremium.id,
      keywords: ["test"],
      filter: {
        source: "yandex",
      },
    })

    await store.dispatch<any>(actions.websites.$syncWebsiteAndCheckEverything())
    await store.dispatch<any>(actions.keywords.$fetchKeywords())

    expect(store.getState().keywords.keywords[0].source).toBe("google")

    await store.dispatch<any>(
      actions.keywords.$KeywordsSetFiltersSource({
        source: "yandex",
      })
    )

    expect(store.getState().keywords.keywords[0].source).toBe("yandex")
  })
})
