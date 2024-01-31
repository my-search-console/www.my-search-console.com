import {
  PaymentEntity,
  PaymentPlansEntity,
  PaymentPricesEntity,
} from "@my-search-console/interfaces"
import { IApiResponse, IRepositoryResponse } from "../interfaces/IApiResponse"
import {
  FetchInvoicesResponse,
  FetchUserResponse,
  GetPricesResponse,
  IPaymentsRepository,
  UpsellResponse,
} from "../interfaces/IPaymentsRepository"

export class InMemoryPaymentsRepository implements IPaymentsRepository {
  fetchInvoices(): Promise<FetchInvoicesResponse> {
    return new Promise((resolve) => {
      resolve({
        error: false,
        body: [
          {
            id: "1",
            amount: 29.99,
            currency: "EUR",
            invoice_url: "https://google.com",
            date: new Date().toString(),
            status: "paid",
          },
        ],
      })
    })
  }
  getPrices(): Promise<GetPricesResponse> {
    return new Promise((resolve) => {
      resolve({
        error: false,
        body: {
          currency: "EUR",
          indexation: {
            monthly: 29.99,
            yearly: 299,
          },
          enterprise: {
            monthly: 129.99,
            yearly: 1299,
          },
          newbie: {
            monthly: 9.99,
            yearly: 99,
          },
        },
      })
    })
  }

  private paymentsInfo: Array<PaymentEntity> = []

  __storePaymentsInfo(entity: PaymentEntity) {
    this.paymentsInfo.push(entity)
  }

  async upsell(): Promise<UpsellResponse> {
    const newPlan: PaymentEntity = {
      id: "me",
      fk_user_id: "me",
      cancellation_effective_date: null,
      subscription_id: "",
      cancel_url: "",
      update_url: "",
      created_at: new Date(),
      paddle_user_id: "",
      plan: PaymentPlansEntity.enterprise,
      interval: "monthly",
    }

    this.paymentsInfo = [newPlan]

    return {
      error: false,
      body: newPlan,
    }
  }

  changeplan(params: { newPlan: string }): Promise<IRepositoryResponse<any>> {
    throw new Error("Method not implemented.")
  }

  async fetchUser(): Promise<FetchUserResponse> {
    const response = this.paymentsInfo.filter(
      ({ fk_user_id }) => fk_user_id === "me"
    )

    return {
      error: false,
      body: response,
    }
  }
}
