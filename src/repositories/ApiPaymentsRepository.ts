import {
  ErrorEntity,
  PaymentEntity,
  PaymentPlansEntity,
  PaymentPricesEntity,
} from "@foudroyer/interfaces"
import {
  FetchUserResponse,
  GetPricesResponse,
  IPaymentsRepository,
  UpsellResponse,
} from "../interfaces/IPaymentsRepository"
import { ApiService } from "../services/ApiService"

export class ApiPaymentsRepository implements IPaymentsRepository {
  constructor(private apiService: ApiService) {}

  async getPrices(): Promise<GetPricesResponse> {
    const response = await this.apiService.get<PaymentPricesEntity>(
      `/payments/prices`
    )

    if (response.data.statusCode === 400)
      return {
        error: true,
        code: response.data.message,
      }

    return {
      error: false,
      body: response.data,
    }
  }

  async pause(params: { subscriptionId: string }): Promise<GetPricesResponse> {
    const response = await this.apiService.post<PaymentPricesEntity>(
      `/payments/pause`,
      params
    )

    if (response.data.statusCode === 400)
      return {
        error: true,
        code: response.data.message,
      }

    return {
      error: false,
      body: response.data,
    }
  }

  async unpause(params: {
    subscriptionId: string
  }): Promise<GetPricesResponse> {
    const response = await this.apiService.post<PaymentPricesEntity>(
      `/payments/unpause`,
      params
    )

    if (response.data.statusCode === 400)
      return {
        error: true,
        code: response.data.message,
      }

    return {
      error: false,
      body: response.data,
    }
  }

  async fetchInvoices(): Promise<any> {
    const response = await this.apiService.get<
      {
        id: string
        amount: number
        currency: string
        date: string
        status: string
        invoice_url: string | undefined
      }[]
    >(`/payments/invoices`)

    if (response.data.statusCode === 400)
      return {
        error: true,
        code: response.data.message,
      }

    return {
      error: false,
      body: response.data,
    }
  }

  async upsell(params: {
    plan: PaymentPlansEntity
    interval: "monthly" | "yearly"
  }): Promise<UpsellResponse> {
    const response = await this.apiService.post<PaymentEntity>(
      `/payments/upsell`,
      {
        plan: params.plan,
        interval: params.interval,
      }
    )

    if (response.data.statusCode === 400)
      return {
        error: true,
        code: response.data.message,
      }

    return {
      error: false,
      body: response.data,
    }
  }

  async fetchUser(): Promise<FetchUserResponse> {
    try {
      const response = await this.apiService.get<PaymentEntity[]>(
        `/payments/me`
      )

      if (response.data.statusCode === 400)
        return { error: true, code: response.data.message }

      return { error: false, body: response.data }
    } catch (error) {
      return { error: true, code: ErrorEntity.UNKNOWN_ERROR }
    }
  }
}
