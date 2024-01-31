import {
  PaymentEntity,
  PaymentPricesEntity,
  ProductEntity,
} from "@my-search-console/interfaces"
import { AnalyticsPaymentEntityPaymentSources } from "../../entities/AnalyticsEntity"
import { GetPricesResponse } from "../../interfaces/IPaymentsRepository"

export const PaymentsSetLoading = "PaymentsSetLoading"
export interface PaymentsSetLoadingAction {
  type: typeof PaymentsSetLoading
  payload: { value: boolean }
}

export const PaymentsStore = "PaymentsStore"
export interface PaymentsStoreAction {
  type: typeof PaymentsStore
  payload: PaymentEntity[]
}

export const PaymentsStoreInvoices = "PaymentsStoreInvoices"
export interface PaymentsStoreInvoicesAction {
  type: typeof PaymentsStoreInvoices
  payload: {
    id: string
    amount: number
    currency: string
    date: string
    status: string
    invoice_url: string | undefined
  }
}

export const PaymentsStorePlans = "PaymentsStorePlans"
export interface PaymentsStorePlansAction {
  type: typeof PaymentsStorePlans
  payload: PaymentPricesEntity
}

export const PaymentsOpenModal = "PaymentsOpenModal"
export interface PaymentsOpenModalAction {
  type: typeof PaymentsOpenModal
  payload:
    | {
        value: true
        type: "indexation" | "analytics" | null
        source: AnalyticsPaymentEntityPaymentSources
        isUpsell?: boolean
        isClosable?: boolean
      }
    | {
        value: false
        isClosable?: boolean
      }
}

export const PaymentsOpenInvoicesModal = "PaymentsOpenInvoicesModal"
export interface PaymentsOpenInvoicesModalAction {
  type: typeof PaymentsOpenInvoicesModal
  payload: boolean
}

export const PaymentSetPaymentPlan = "PaymentSetPaymentPlan"
export interface PaymentSetPaymentPlanAction {
  type: typeof PaymentSetPaymentPlan
  payload: string
}

export type PaymentsActionTypes =
  | PaymentsSetLoadingAction
  | PaymentsStoreAction
  | PaymentsStoreInvoicesAction
  | PaymentsOpenModalAction
  | PaymentsOpenInvoicesModalAction
  | PaymentSetPaymentPlanAction
  | PaymentsStorePlansAction
