import { PaymentEntity } from "@foudroyer/interfaces"
import { WebsiteActivated } from "../../../modules/seeds/WebsitesSeeds"
import { createStoreForTests } from "../../../utils/createStoreForTests"

describe("payments tests suite", () => {
  it("je dois pouvoir récupérer les infos de paiement du site web", async () => {
    const { store, actions, di } = createStoreForTests()

    const paymentEntity: PaymentEntity = {
      pfk_website_id: WebsiteActivated.id,
      fk_user_id: "",
      cancellation_effective_date: null,
      subscription_id: "",
      cancel_url: "",
      update_url: "",
      paddle_user_id: "",
    }

    di.WebsitesRepository.store(WebsiteActivated)
    di.PaymentsRepository.__storePaymentsInfo(paymentEntity)

    expect(store.getState().payments.isLoading).toEqual(false)

    store.dispatch<any>(
      actions.websites.$changeWebsite({ websiteId: WebsiteActivated.id })
    )

    await store.dispatch<any>(actions.payments.$fetchPaymentsInfo())

    expect(store.getState().payments.isLoading).toEqual(false)
    expect(store.getState().payments.info).not.toEqual(null)
  })
})
