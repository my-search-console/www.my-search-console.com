import {
  PaymentEntity,
  PaymentPlansEntity,
  PaymentPricesEntity,
} from "@foudroyer/interfaces"
import { IRepositoryResponse } from "./IApiResponse"

export type InvoiceEntity = {
  id: string
  amount: number
  currency: string
  date: string
  status: string
  invoice_url: string | undefined
}

export type FetchUserResponse = IRepositoryResponse<PaymentEntity[]>
export type UpsellResponse = IRepositoryResponse<PaymentEntity>
export type GetPricesResponse = IRepositoryResponse<PaymentPricesEntity>
export type FetchInvoicesResponse = IRepositoryResponse<InvoiceEntity[]>

export interface IPaymentsRepository {
  fetchUser(): Promise<FetchUserResponse>
  upsell(params: {
    plan: PaymentPlansEntity
    interval: "monthly" | "yearly"
  }): Promise<UpsellResponse>
  getPrices(): Promise<GetPricesResponse>
  pause(params: { subscriptionId: string }): Promise<any>
  unpause(params: { subscriptionId: string }): Promise<any>
  fetchInvoices(): Promise<FetchInvoicesResponse>
}
