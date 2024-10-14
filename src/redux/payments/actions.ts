import {
  findPlanByNameAndInterval,
  PaymentPlansEntity,
} from "@foudroyer/interfaces/dist/entities/PaymentEntity"
import { ThunkAction } from "redux-thunk"
import { ModalKeys } from "../../entities/ModalEntity"
import { NotificationMessageEntity } from "../../entities/NotificationEntity"
import { normalizeUrl } from "../../utils/normalizeUrl"
import { actions } from "../actions"
import { RootState } from "../store"
import * as types from "./types"

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

export const PaymentsUpsellConfirmationOpenModal = (
  payload: types.PaymentsUpsellConfirmationOpenModalAction["payload"]
): types.PaymentsActionTypes => ({
  type: types.PaymentsUpsellConfirmationOpenModal,
  payload,
})

export const $PaymentsUpsellConfirmationOpenModal =
  (
    payload: types.PaymentsUpsellConfirmationOpenModalAction["payload"]
  ): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, auth } = getState()

    if (payload.isOpen === true) {
      di.LocationService.push(
        di.LocationService.getPathname() +
          "#" +
          ModalKeys["upsell-confirmation-modal"]
      )
    } else {
      di.LocationService.push(di.LocationService.getPathname())
    }

    return dispatcher(
      actions.payments.PaymentsUpsellConfirmationOpenModal(payload)
    )
  }

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
    const { di, payments, lang } = getState()

    if (payload.value === false) return

    if (payments.actualIndexationPlan?.paused_at) {
      return dispatcher(actions.payments.$UnsubscribeOpenModal())
    } else {
      di.LocationService.navigate(
        normalizeUrl({
          url: `/pricing/?why=${payload.source}`,
          locale: lang.lang,
        })
      )

      return
    }

    // dispatcher(
    //   actions.payments.PaymentsOpenModal({
    //     ...payload,
    //     isClosable: true,
    //   })
    // )

    // if (payload.value === true) {
    //   di.AnalyticsService.send({
    //     category: "modal",
    //     action: "open",
    //     data: {
    //       type: "payment",
    //       source: payload.source,
    //     },
    //   })
    // } else {
    //   di.AnalyticsService.send({
    //     category: "modal",
    //     action: "close",
    //   })
    // }
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

export const $pay =
  (params: {
    plan: PaymentPlansEntity
    interval: "monthly" | "yearly"
  }): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, auth, payments, lang } = getState()

    if (!auth.user?.email) {
      return dispatcher(
        actions.auth.$goToAuthentication({
          redirection: "pricing",
        })
      )
    }

    if (
      [
        PaymentPlansEntity["analytics/free"],
        PaymentPlansEntity["indexation/free"],
      ].includes(params.plan)
    ) {
      return di.LocationService.navigate(
        normalizeUrl({
          url: "/dashboard/",
          locale: lang.lang,
        })
      )
    }

    const planWithInfo = findPlanByNameAndInterval({
      planName: params.plan,
      interval: params.interval,
    })

    const doesUserAlreadyHaveSubscriptionInThisScope = () => {
      if (!payments.actualIndexationPlan) return false
      if (
        payments.actualIndexationPlan?.plan ===
        PaymentPlansEntity["indexation/free"]
      ) {
        return false
      }

      return true
    }

    if (doesUserAlreadyHaveSubscriptionInThisScope()) {
      return dispatcher(
        actions.payments.$PaymentsUpsellConfirmationOpenModal({
          ...params,
          isOpen: true,
        })
      )
    }

    di.AnalyticsService.send({
      category: "payment",
      action: "open",
    })

    const response = await di.PaymentService.openDialog({
      email: auth.user.email,
      productId: planWithInfo.id,
      coupon_code: null,
      customData: {
        userId: auth.user.id,
      },
    })

    if (response.status === "success") {
      di.AnalyticsService.send({
        category: "payment",
        action: "success",
        data: {
          plan: params.plan,
          interval: params.interval,
        },
      })

      dispatcher(
        actions.notifications.create({
          type: "success",
          message: NotificationMessageEntity.FOUDROYER_PAYMENT_SUCCESS,
        })
      )

      dispatcher(
        actions.payments.PaymentsStore([
          ...payments.payments,
          {
            cancel_url: "",
            cancellation_effective_date: null,
            created_at: new Date(),
            fk_user_id: "",
            id: "",
            paddle_user_id: "",
            plan: params.plan,
            subscription_id: "",
            update_url: "",
            interval: params.interval,
            paused_at: null,
          },
        ])
      )
    } else {
      di.AnalyticsService.send({
        category: "payment",
        action: "close",
        data: {
          plan: params.plan,
          interval: params.interval,
        },
      })
    }
  }

export const $Upsell =
  (params: { redirect?: boolean }): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, lang, payments } = getState()

    const response = await di.PaymentsRepository.upsell({
      plan: payments.upsellConfirmationModal.plan,
      interval: payments.upsellConfirmationModal.interval,
    })

    if (response.error) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatcher(actions.payments.$UnsubscribeCloseModal())
    dispatcher(
      actions.notifications.create({
        type: "success",
      })
    )
    dispatcher(actions.payments.$fetchPaymentsInfo())

    if (params?.redirect) {
      di.LocationService.navigate(
        normalizeUrl({
          url: "/administration?tool=dashboard",
          locale: lang.lang,
          removeLocaleIfExists: true,
        })
      )
    }
  }

export const $pause =
  (params: { why: string }): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, lang, payments } = getState()

    di.AnalyticsService.send({
      category: "payment",
      action: "pause",
      data: {
        why: params.why,
      },
    })

    const response = await di.PaymentsRepository.pause({
      subscriptionId: payments.payments[0].subscription_id,
    })

    if (response.error) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    } else {
      dispatcher(
        actions.notifications.create({
          type: "success",
        })
      )
    }

    dispatcher(actions.payments.$UnsubscribeCloseModal())
    dispatcher(actions.payments.$fetchPaymentsInfo())
  }

export const $unpause =
  (): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, lang, payments } = getState()

    const response = await di.PaymentsRepository.unpause({
      subscriptionId: payments.payments[0].subscription_id,
    })

    if (response.error) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    } else {
      dispatcher(
        actions.notifications.create({
          type: "success",
        })
      )
    }

    dispatcher(actions.payments.$UnsubscribeCloseModal())
    dispatcher(actions.payments.$fetchPaymentsInfo())
  }

export const $unsubscribe =
  (params: { why: string }): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, lang, payments } = getState()

    di.AnalyticsService.send({
      category: "payment",
      action: "unsubscribe",
      data: {
        why: params.why,
      },
    })

    dispatcher(actions.payments.$UnsubscribeCloseModal())
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

export const $UnsubscribeCloseModal =
  (): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, websites, lang } = getState()

    di.LocationService.navigate(di.LocationService.getPathname())
  }

export const $UnsubscribeOpenModal =
  (): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, websites, lang } = getState()
    const url = di.LocationService.getFullUrl()
    const id = "#unsubscribe=true"

    di.LocationService.navigate(url.concat(id))
  }
