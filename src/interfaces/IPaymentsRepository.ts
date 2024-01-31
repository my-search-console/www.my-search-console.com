import {
  PaymentEntity,
  PaymentPlansEntity,
  PaymentPricesEntity,
} from "@my-search-console/interfaces"
import { IRepositoryResponse } from "./IApiResponse"

export type FetchUserResponse = IRepositoryResponse<PaymentEntity[]>
export type UpsellResponse = IRepositoryResponse<PaymentEntity>
export type GetPricesResponse = IRepositoryResponse<PaymentPricesEntity>
export type FetchInvoicesResponse = IRepositoryResponse<
  {
    id: string
    amount: number
    currency: string
    date: string
    status: string
    invoice_url: string | undefined
  }[]
>

export interface IPaymentsRepository {
  fetchUser(): Promise<FetchUserResponse>
  upsell(params: {
    plan: PaymentPlansEntity
    interval: "monthly" | "yearly"
  }): Promise<UpsellResponse>
  getPrices(): Promise<GetPricesResponse>
  fetchInvoices(): Promise<FetchInvoicesResponse>
}
