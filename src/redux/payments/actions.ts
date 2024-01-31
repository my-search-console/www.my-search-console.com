import { PaymentPlansEntity } from "@my-search-console/interfaces/dist/entities/PaymentEntity"
import { ThunkAction } from "redux-thunk"
import { actions } from "../actions"
import { RootState } from "../store"
import * as types from "./types"
import { normalizeUrl } from "../../utils/normalizeUrl"

export const PaymentsSetLoading = (
  payload: types.PaymentsSetLoadingAction["payload"]
): types.PaymentsActionTypes => ({
  type: types.PaymentsSetLoading,
  payload,
})

export const PaymentsOpenInvoicesModal = (
  payload: types.PaymentsOpenInvoicesModalAction["payload"]
): types.PaymentsActionTypes => ({
  type: types.PaymentsOpenInvoicesModal,
  payload,
})

export const PaymentsStore = (
  payload: types.PaymentsStoreAction["payload"]
): types.PaymentsActionTypes => ({
  type: types.PaymentsStore,
  payload,
})

export const PaymentsStoreInvoices = (
  payload: types.PaymentsStoreInvoicesAction["payload"]
): types.PaymentsActionTypes => ({
  type: types.PaymentsStoreInvoices,
  payload,
})

export const PaymentsStorePlans = (
  payload: types.PaymentsStorePlansAction["payload"]
): types.PaymentsActionTypes => ({
  type: types.PaymentsStorePlans,
  payload,
})

export const PaymentsOpenModal = (
  payload: types.PaymentsOpenModalAction["payload"]
): types.PaymentsActionTypes => ({
  type: types.PaymentsOpenModal,
  payload,
})

export const PaymentSetPaymentPlan = (
  payload: types.PaymentSetPaymentPlanAction["payload"]
): types.PaymentsActionTypes => ({
  type: types.PaymentSetPaymentPlan,
  payload,
})

export const $PaymentsOpenModal =
  (
    payload: types.PaymentsOpenModalAction["payload"]
  ): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di } = getState()

    dispatcher(
      actions.payments.PaymentsOpenModal({
        ...payload,
        isClosable: payload.isClosable === false ?? true,
      })
    )

    if (payload.value === true) {
      di.AnalyticsService.send({
        category: "modal",
        action: "open",
        data: {
          type: "payment",
          source: payload.source,
        },
      })
    } else {
      di.AnalyticsService.send({
        category: "modal",
        action: "close",
      })
    }
  }

export const $fetchPaymentsInfo =
  (): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, auth } = getState()

    const response = await di.PaymentsRepository.fetchUser()

    if (response.error) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatcher(actions.payments.PaymentsStore(response.body))
  }

export const $Upsell =
  (params: {
    plan: PaymentPlansEntity
    interval: "monthly" | "yearly"
    redirect?: boolean
  }): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, lang } = getState()

    const response = await di.PaymentsRepository.upsell({
      plan: params.plan,
      interval: params.interval,
    })

    if (response.error) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatcher(actions.payments.$fetchPaymentsInfo())

    if (params?.redirect) {
      di.LocationService.navigate(
        normalizeUrl({
          url: "/administration?tool=indexation",
          locale: lang.lang,
          removeLocaleIfExists: true,
        })
      )
    }
  }

export const $getPricing =
  (): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di } = getState()

    const response = await di.PaymentsRepository.getPrices()

    if (response.error) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatcher(actions.payments.PaymentsStorePlans(response.body))
  }

export const $PaymentsFetchInvoices =
  (): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di } = getState()

    actions.payments.PaymentsSetLoading({ value: true })

    const response = await di.PaymentsRepository.fetchInvoices()

    actions.payments.PaymentsSetLoading({ value: false })

    if (response.error) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatcher(actions.payments.PaymentsStoreInvoices(response.body))
  }
