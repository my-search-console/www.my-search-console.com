import * as types from "./types"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"
import { actions } from "../actions"
import { NotificationMessageEntity } from "../../entities/NotificationEntity"
import { getWebsiteIdFromUrl } from "../../utils/getWebsiteIdFromUrl"
import { ErrorEntity, PaymentPlansEntity } from "@foudroyer/interfaces"
import { normalizeUrl } from "../../utils/normalizeUrl"
import { getProductIdByPlan } from "../../utils/getProductIdByPlan"
import { IssueTypes } from "../../entities/IssueEntity"

export const Reset = (): types.WebsitesActionTypes => ({
  type: types.Reset,
})

export const CreateWebsiteStoreDomains = (
  payload: types.CreateWebsiteStoreDomainsAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.CreateWebsiteStoreDomains,
  payload,
})

export const CreateWebsiteSetFetching = (
  payload: types.CreateWebsiteSetFetchingAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.CreateWebsiteSetFetching,
  payload,
})

export const CreateWebsiteStoreFetchBingDomains = (
  payload: types.CreateWebsiteStoreFetchBingDomainsAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.CreateWebsiteStoreFetchBingDomains,
  payload,
})

export const WebsiteAddSourceModalSelect = (
  payload: types.WebsiteAddSourceModalSelectAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.WebsiteAddSourceModalSelect,
  payload,
})

export const WebsiteIndexNowModalSetOpen = (
  payload: types.WebsiteIndexNowModalSetOpenAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.WebsiteIndexNowModalSetOpen,
  payload,
})

export const WebsiteIndexNowCheckSetFetching = (
  payload: types.WebsiteIndexNowCheckSetFetchingAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.WebsiteIndexNowCheckSetFetching,
  payload,
})

export const add = (
  payload: types.AddAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.Add,
  payload,
})

export const store = (
  payload: types.StoreAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.Store,
  payload,
})

export const storeGoogleWebsites = (
  payload: types.StoreGoogleAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.StoreGoogle,
  payload,
})

export const remove = (
  payload: types.RemoveAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.Remove,
  payload,
})

export const updateWebsite = (
  payload: types.updateWebsiteAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.updateWebsite,
  payload,
})

export const updateSitemap = (
  payload: types.UpdateSitemapAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.UpdateSitemap,
  payload,
})

export const setOpenSitemapModal = (
  payload: types.setOpenSitemapModalAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.setOpenSitemapModal,
  payload,
})

export const setSitemapFetching = (
  payload: types.WebsiteSitemapSetFetchingAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.WebsiteSitemapSetFetching,
  payload,
})

export const updateCredentials = (
  payload: types.updateCredentialsAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.updateCredentials,
  payload,
})

export const setCredentialsFetching = (
  payload: types.setCredentialsFetchingAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.setCredentialsFetching,
  payload,
})

export const setIsCredentialsAreGood = (
  payload: types.setIsCredentialsAreGoodAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.setIsCredentialsAreGood,
  payload,
})

export const setCredentialsIsOpen = (
  payload: types.setCredentialsIsOpenAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.setCredentialsIsOpen,
  payload,
})

export const setActiveWebsite = (
  payload: types.SetActiveWebsiteAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.SetActiveWebsite,
  payload,
})

export const setFetching = (
  payload: types.SetFetchingAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.SetFetching,
  payload,
})

export const WebsiteAddSourceModalSetIsOpen = (
  payload: types.WebsiteAddSourceModalSetIsOpenAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.WebsiteAddSourceModalSetIsOpen,
  payload,
})

export const WebsitesToggleRefreshFetching = (
  payload: types.WebsitesToggleRefreshFetchingAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.WebsitesToggleRefreshFetching,
  payload,
})

export const $getWebsiteInfoReadOnly =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    await dispatcher(actions.roast.$fetchAll())
    await dispatcher(actions.roast.$setWebsiteActiveFromUrl())
  }

export const $syncWebsiteAndCheckEverything =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di } = getState()

    await dispatcher(actions.roast.$fetchAll())
    await dispatcher(actions.roast.$setWebsiteActiveFromUrl())
  }

export const $roast =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, roast } = getState()

    if (roast.fetching) {
      return dispatcher(
        actions.notifications.create({
          type: "warning",
          message: NotificationMessageEntity.WEBSITES_ALREADY_REFRESHING,
        })
      )
    }

    dispatcher(actions.roast.setFetching(true))

    const response = await di.RoastRepository.roast()

    if (response.error) {
      dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    } else {
      dispatcher(actions.roast.store(response.body))

      dispatcher(
        actions.notifications.create({
          type: "success",
          message: ErrorEntity.ANALYTICS_PREMIUM_RESERVED,
        })
      )
    }

    dispatcher(actions.roast.setFetching(false))

    di.AnalyticsService.send({
      category: "roast",
      action: "refresh-all",
    })
  }

export const $fetchAll =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, roast } = getState()

    /**
     * On ne veut pas récupérer des sites web si on
     * les a déjà chargés une fois.
     */
    if (roast.entities.length > 0) return false

    dispatcher(setFetching(true))

    const response = await di.RoastRepository.fetchWebsites()

    dispatcher(setFetching(false))

    if (response.error === true) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatcher(store({ websites: response.body.websites }))
  }

export const $changeWebsite =
  (params: {
    websiteId: string
    issueType: IssueTypes
  }): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, lang, roast } = getState()

    if (!roast.map.get(params.websiteId)) return

    dispatcher(actions.roast.setActiveWebsite({ id: params.websiteId }))

    di.LocationService.navigate(
      normalizeUrl({
        url: `/roast/dashboard/${params.websiteId}/${params.issueType}`,
        locale: lang.lang,
      })
    )
  }

export const $setWebsiteActiveFromUrl =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, roast, lang } = getState()

    const url = di.LocationService.getPathname()

    const { websiteId } = getWebsiteIdFromUrl(url)

    const website = roast.map.get(websiteId || "")

    if (!website) {
      dispatcher(
        actions.notifications.create({
          type: "error",
          message: ErrorEntity.WEBSITE_NOT_FOUND,
        })
      )
      di.LocationService.navigate(
        normalizeUrl({
          url: "/",
          locale: lang.lang,
          removeLocaleIfExists: true,
        })
      )
    } else {
      dispatcher(setActiveWebsite({ id: websiteId as string }))
    }
  }

export const $openPaymentModal =
  (
    plan: PaymentPlansEntity,
    interval: "monthly" | "yearly"
  ): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, auth, payments, lang } = getState()

    if (!auth.user?.email) {
      return dispatcher(actions.auth.$authenticateWithGoogle())
    }

    if (
      payments.plans.size > 0 &&
      !payments.payments[0].cancellation_effective_date
    ) {
      return di.LocationService.navigate(
        normalizeUrl({
          url: "/pricing/upsell",
          locale: lang.lang,
        })
      )
    }

    di.AnalyticsService.send({
      category: "payment",
      action: "open",
    })

    const response = await di.PaymentService.openDialog({
      email: auth.user.email,
      productId: getProductIdByPlan(plan, interval),
      coupon_code: null,
      customData: {
        userId: auth.user.id,
      },
    })

    if (response.status === "success") {
      di.AnalyticsService.send({
        category: "payment",
        action: "success",
      })

      dispatcher(
        actions.notifications.create({
          type: "success",
          message: NotificationMessageEntity.FOUDROYER_PAYMENT_SUCCESS,
        })
      )

      dispatcher(actions.payments.PaymentsOpenModal({ value: false }))

      dispatcher(
        actions.payments.PaymentsStore([
          {
            cancel_url: "",
            cancellation_effective_date: null,
            created_at: new Date(),
            fk_user_id: "",
            id: "",
            paddle_user_id: "",
            plan,
            subscription_id: "",
            update_url: "",
            interval: interval,
          },
        ])
      )
    } else {
      di.AnalyticsService.send({
        category: "payment",
        action: "close",
      })

      dispatcher(
        actions.payments.PaymentsOpenModal({
          value: true,
          type: "indexation",
          source: "indexation/quota",
        })
      )
    }
  }
