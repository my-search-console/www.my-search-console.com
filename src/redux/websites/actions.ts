import {
  ErrorEntity,
  findPlanByNameAndInterval,
  PaymentPlansEntity,
  WebsiteEntity,
} from "@foudroyer/interfaces"
import { ThunkAction } from "redux-thunk"
import { TOOLS_AVAILABLE } from "../../constants/tools"
import { ModalKeys } from "../../entities/ModalEntity"
import { NotificationMessageEntity } from "../../entities/NotificationEntity"
import { SitemapEntity } from "../../entities/SitemapEntity"
import { getWebsiteIdFromUrl } from "../../utils/getWebsiteIdFromUrl"
import { howManyWebsitesUserCanHave } from "../../utils/howManyWebsitesUserCanHave"
import { normalizeUrl } from "../../utils/normalizeUrl"
import { actions } from "../actions"
import { RootState } from "../store"
import { IndexationSearchEngines } from "./../../entities/SearchEngineEntity"
import * as types from "./types"

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

export const WebsitesFilter = (
  payload: types.WebsitesFilterAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.WebsitesFilter,
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

export const storeCheck = (
  payload: types.storeCheckAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.storeCheck,
  payload,
})

export const WebsiteAddSourceModalSetIsOpen = (
  payload: types.WebsiteAddSourceModalSetIsOpenAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.WebsiteAddSourceModalSetIsOpen,
  payload,
})

export const $getWebsiteInfoReadOnly =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    await dispatcher(
      actions.websites.$fetchAll({ force: true, readonly: true })
    )
    await dispatcher(actions.websites.$setWebsiteActiveFromUrl())
  }

export const $syncWebsiteAndCheckEverything =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di } = getState()

    const { feature } = getWebsiteIdFromUrl(di.LocationService.getFullUrl())

    await dispatcher(actions.websites.$fetchAll())
    await dispatcher(actions.websites.$setWebsiteActiveFromUrl())

    if (feature === "analytics") {
      await dispatcher(actions.ranking.$fetch())
    }

    if (feature === "logs") {
      await dispatcher(actions.logs.$fetch())
    }

    if (feature === "keywords") {
      await dispatcher(actions.keywords.$fetchKeywords())
    }

    if (feature === "opportunities") {
      await dispatcher(actions.opportunities.$fetchOpportunities())
    }

    if (feature === "settings")
      return dispatcher(actions.websites.$fetchUsersWithRightsOnThisWebsite())
  }

export const $WebsiteIsPublicToggle =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, websites, payments } = getState()

    if (!websites.website) return false
    if (payments.plans.size === 0) {
      return dispatcher(
        actions.payments.$PaymentsOpenModal({
          type: "indexation",
          source: "landing",
          value: true,
        })
      )
    }

    const response = await di.WebsitesRepository.updateIsPublic({
      websiteId: websites.website.id,
      isPublic: !websites.website.is_public,
    })

    if (response.error) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatcher(
      actions.websites.updateWebsite({
        website: {
          ...websites.website,
          is_public: !websites.website.is_public,
        },
      })
    )

    dispatcher(
      actions.notifications.create({
        type: "success",
        message: ErrorEntity.WEBSITE_NOT_FOUND,
      })
    )
  }

export const $check =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, websites } = getState()

    const response = await di.WebsitesRepository.check({
      website: websites.website?.id as string,
    })

    if (response.error) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    if (!response.body.isSitemapValid) {
      dispatcher(actions.websites.$openSitemapModal())
    }

    dispatcher(storeCheck(response.body))
  }

export const $syncAnalytics =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, websites } = getState()

    const website = websites.map.get(websites.activeWebsite || "")
    const { feature } = getWebsiteIdFromUrl(di.LocationService.getFullUrl())

    if (!website) return

    // if (
    //   ["analytics", "keywords", "opportunities"].includes(feature || "") &&
    //   !website.is_analytics_activated
    // ) {
    //   return dispatcher(
    //     actions.ranking.AnalyticsSetAnalyticsDiscoverModalIsOpen({
    //       value: true,
    //     })
    //   )
    // }
  }

export const $deleteWebsite =
  (websiteId?: string): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, websites, lang } = getState()

    const website = websiteId || websites.activeWebsite

    if (!website) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: ErrorEntity.WEBSITE_NOT_FOUND,
        })
      )
    }

    await di.WebsitesRepository.delete({
      websiteId: website,
    })

    dispatcher(
      actions.notifications.create({
        type: "success",
        message: NotificationMessageEntity.WEBSITES_DELETED,
      })
    )

    di.LocationService.navigate(
      normalizeUrl({
        url: "/dashboard/",
        locale: lang.lang,
      }),
      {
        disableScroll: true,
      }
    )

    dispatcher(actions.websites.$fetchAll({ force: true }))
  }

export const $openResetConfirmationModale =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di } = getState()

    const url = di.LocationService.getFullUrl()

    di.LocationService.navigate(url + "#reset-website")
  }

export const $closeResetConfirmationModale =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di } = getState()

    di.LocationService.back()
  }

export const $resetWebsite =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, websites, lang } = getState()

    const websiteId = websites.activeWebsite

    if (!websiteId) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: ErrorEntity.WEBSITE_NOT_FOUND,
        })
      )
    }

    dispatcher(actions.websites.setFetching(true))

    const response = await di.WebsitesRepository.reset({
      websiteId,
    })

    dispatcher(actions.websites.setFetching(false))

    if (response.error) {
      dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    } else {
      dispatcher(actions.websites.$closeResetConfirmationModale())
      dispatcher(
        actions.notifications.create({
          type: "success",
        })
      )
    }
  }

export const $saveCredentials =
  (website: WebsiteEntity | null): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {}

export const $WebsiteCreateModal =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { payments, websites } = getState()

    if (
      howManyWebsitesUserCanHave(payments.actualIndexationPlan) <=
      websites.entities.length
    ) {
      return dispatcher(
        actions.payments.$PaymentsOpenModal({
          type: "indexation",
          source: "indexation/add-website",
          value: true,
          isUpsell: !!payments.actualIndexationPlan,
          isClosable: true,
        })
      )
    }

    dispatcher($CreateWebsiteFetchGoogleDomains())
    dispatcher(WebsiteAddSourceModalSetIsOpen({ isOpen: true, type: "google" }))
  }

export const $activate =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, websites, payments } = getState()

    if (websites.fetching) return false
    if (!websites.createWebsiteModal.selected) return false

    if (websites.createWebsiteModal.type === "google") {
      if (
        howManyWebsitesUserCanHave(payments.actualIndexationPlan) >=
        websites.entities.length
      ) {
      }

      dispatcher(setFetching(true))

      const response = await di.WebsitesRepository.activate(
        websites.createWebsiteModal.selected
      )

      if (response.error) {
        dispatcher(
          actions.notifications.create({
            type: "error",
            message: response.code,
          })
        )

        return dispatcher(setFetching(false))
      }

      dispatcher(WebsiteAddSourceModalSetIsOpen({ isOpen: false }))

      dispatcher($fetchAll({ force: true }))

      dispatcher(
        actions.notifications.create({
          type: "success",
          message: NotificationMessageEntity.WEBSITES_CREATE_SUCCESS,
        })
      )

      return
    } else {
      const { websiteId } = getWebsiteIdFromUrl(
        di.LocationService.getPathname()
      )

      if (!websiteId) return false

      di.WebsitesRepository.addSource({
        websiteId,
        type: websites.createWebsiteModal.type,
        url: websites.createWebsiteModal.selected,
      }).then((response) => {
        if (response.error) {
          dispatcher(
            actions.notifications.create({
              type: "error",
              message: response.code,
            })
          )
          return dispatcher(setFetching(false))
        }

        dispatcher(
          actions.websites.updateWebsite({
            website: response.body,
          })
        )

        dispatcher(
          actions.websites.$WebsiteSourceToggle({
            website: response.body,
            source: "google" as IndexationSearchEngines,
          })
        )

        dispatcher(actions.ranking.$fetch({ force: true }))
      })

      dispatcher(
        actions.notifications.create({
          type: "success",
          message: NotificationMessageEntity.WEBSITES_UPDATE_SUCCESS,
        })
      )
      dispatcher(WebsiteAddSourceModalSetIsOpen({ isOpen: false }))
    }
  }

export const $CreateWebsite =
  (params: { id: string }): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, websites, payments } = getState()

    if (websites.fetching) return false

    dispatcher(setFetching(true))

    const response = await di.WebsitesRepository.activate(params.id)

    if (response.error) {
      dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )

      return dispatcher(setFetching(false))
    }

    dispatcher(WebsiteAddSourceModalSetIsOpen({ isOpen: false }))

    dispatcher($fetchAll({ force: true }))
    dispatcher($CreateWebsiteFetchGoogleDomains())

    dispatcher(
      actions.notifications.create({
        type: "success",
        message: NotificationMessageEntity.WEBSITES_CREATE_SUCCESS,
      })
    )

    di.AnalyticsService.send({
      category: "websites",
      action: "create",
    })

    return
  }

export const WebsiteFetchStatsSetFetching = (
  payload: types.WebsiteFetchStatsSetFetchingAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.WebsiteFetchStatsSetFetching,
  payload,
})

export const WebsiteFetchStatsStoreStats = (
  payload: types.WebsiteFetchStatsStoreStatsAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.WebsiteFetchStatsStoreStats,
  payload,
})

export const $fetchAll =
  (props?: {
    force?: boolean
    readonly?: boolean
  }): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, websites, payments, auth } = getState()
    const { websiteId } = getWebsiteIdFromUrl(di.LocationService.getPathname())

    if (!websiteId) return
    if (websites.entities.length > 0 && !props?.force) return

    dispatcher(setFetching(true))

    const response = await di.WebsitesRepository.fetch({ websiteId })

    if (response.error === true) {
      dispatcher(setFetching(false))
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatcher(store({ websites: response.body.websites }))
    dispatcher(setFetching(false))
  }

export const $fetchAndRedirectToWebsiteActive =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    dispatcher(actions.websites.Reset())

    await dispatcher(actions.websites.$fetchAll())

    const { websites, di, lang } = getState()

    const activeWebsiteId = websites.entities[0]

    if (!activeWebsiteId) {
      dispatcher(actions.websites.$WebsiteCreateModal())
      return di.LocationService.navigate(
        normalizeUrl({
          url: "/dashboard",
          locale: lang.lang,
        })
      )
    }

    const activeTool = new URL(
      di.LocationService.getFullUrl()
    ).searchParams.get("tool")

    const isAllowedTool = TOOLS_AVAILABLE.includes(activeTool || "")

    di.LocationService.navigate(
      normalizeUrl({
        url: `/${
          activeTool && isAllowedTool ? activeTool : "analytics"
        }/${activeWebsiteId}`,
        locale: lang.lang,
      })
    )
  }

//@todo pour Analytics
export const $fetchWebsitesAndShow404IfNotExists =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    if (getState().websites.entities.length > 0) return

    await dispatcher($fetchAll())
  }

export const $changeWebsite =
  (params: { websiteId: string }): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, lang, websites } = getState()
    const href = di.LocationService.getFullUrl()
    const { feature } = getWebsiteIdFromUrl(href)

    if (!params.websiteId || !websites.map.get(params.websiteId)) return

    dispatcher(setActiveWebsite({ id: params.websiteId }))

    di.LocationService.navigate(
      normalizeUrl({
        url: `/${feature}/${params.websiteId}`,
        locale: lang.lang,
      })
    )

    if (feature === "logs") {
      dispatcher(actions.logs.$fetch())
    }

    if (feature === "keywords") {
      dispatcher(actions.keywords.KeywordsReset())
      dispatcher(actions.keywords.$fetchKeywords())
    }

    if (feature === "analytics") {
      dispatcher(actions.ranking.$fetch())
    }

    if (feature === "opportunities") {
      dispatcher(actions.opportunities.$fetchOpportunities())
    }

    if (feature === "settings") {
      dispatcher(
        actions.websites.$WebsiteStoreGoogleApiKeys(
          websites.map.get(params.websiteId) as WebsiteEntity
        )
      )
      dispatcher(actions.websites.$fetchUsersWithRightsOnThisWebsite())
    }
  }

export const $setWebsiteActiveFromUrl =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di } = getState()

    const url = di.LocationService.getPathname()

    const { websiteId } = getWebsiteIdFromUrl(url)

    dispatcher(setActiveWebsite({ id: websiteId }))
  }

export const $CreateWebsiteFetchYandexDomains =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di } = getState()

    dispatcher(CreateWebsiteSetFetching({ value: true }))

    const response = await di.WebsitesRepository.fetchYandexDomains()

    dispatcher(CreateWebsiteSetFetching({ value: false }))

    if (response.error)
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )

    dispatcher(CreateWebsiteStoreDomains({ value: response.body }))
  }

export const $CreateWebsiteFetchBingDomains =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di } = getState()

    dispatcher(CreateWebsiteSetFetching({ value: true }))

    const response = await di.WebsitesRepository.fetchBingDomains()

    dispatcher(CreateWebsiteSetFetching({ value: false }))

    if (response.error) {
      if (response.code === ErrorEntity.BING_REFRESH_TOKEN) {
        return dispatcher(actions.websites.$linkSourceToWebsite("bing", true))
      }

      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatcher(CreateWebsiteStoreDomains({ value: response.body }))
  }

export const $CreateWebsiteFetchGoogleDomains =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di } = getState()

    dispatcher(actions.websites.CreateWebsiteSetFetching({ value: true }))
    const response = await di.WebsitesRepository.fetchGoogleDomains()

    if (response.error) {
      dispatcher(actions.websites.CreateWebsiteSetFetching({ value: false }))
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatcher(actions.websites.CreateWebsiteSetFetching({ value: false }))
    dispatcher(CreateWebsiteStoreDomains({ value: response.body }))
  }

export const $linkSourceToWebsite =
  (
    source: "yandex" | "bing",
    force?: boolean
  ): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, websites, auth } = getState()

    const { websiteId } = getWebsiteIdFromUrl(di.LocationService.getPathname())
    const websiteSelected = websites.map.get(websiteId || "")
    if (!websiteSelected) return false

    if (source === "yandex") {
      if (!auth.accountConnectedTo.yandex) {
        const response = await di.AuthRepository.authenticateWithYandex()

        if (response.error) return

        dispatcher(
          actions.auth.AuthStoreSources({
            ...auth.accountConnectedTo,
            yandex: true,
          })
        )
      }

      dispatcher($CreateWebsiteFetchYandexDomains())
      dispatcher(
        actions.websites.WebsiteAddSourceModalSetIsOpen({
          type: "yandex",
          isOpen: true,
        })
      )
    }

    if (source === "bing") {
      if (!auth.accountConnectedTo.bing || force) {
        const response = await di.AuthRepository.authenticateWithBing()

        if (response.error) return

        dispatcher(
          actions.auth.AuthStoreSources({
            ...auth.accountConnectedTo,
            bing: true,
          })
        )
      }

      dispatcher($CreateWebsiteFetchBingDomains())
      dispatcher(
        actions.websites.WebsiteAddSourceModalSetIsOpen({
          type: "bing",
          isOpen: true,
        })
      )
    }
  }

export const $openPaymentModal =
  (
    plan: PaymentPlansEntity,
    interval: "monthly" | "yearly"
  ): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, auth, payments, lang } = getState()
    const planWithInfo = findPlanByNameAndInterval({ planName: plan, interval })

    if (!auth.user?.email) {
      return dispatcher(actions.auth.$goToAuthentication())
    }

    // @ts-ignore
    if (plan === "free") {
      dispatcher(actions.payments.PaymentsOpenModal({ value: false }))

      return di.LocationService.navigate(
        normalizeUrl({
          url: "/dashboard/",
          locale: lang.lang,
        })
      )
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
          plan,
          interval,
        },
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
            paused_at: null,
          },
        ])
      )
    } else {
      di.AnalyticsService.send({
        category: "payment",
        action: "close",
        data: {
          plan,
          interval,
        },
      })
    }
  }

export const $WebsiteIndexNowCheckIfKeyIsInstalled =
  (website: WebsiteEntity | null): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {}

export const $WebsiteIndexNowDownloadKeyFile =
  (website: WebsiteEntity | null): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    if (!website || !website.index_now_key) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: ErrorEntity.WEBSITE_NOT_FOUND,
        })
      )
    }

    const file = new Blob([website.index_now_key], { type: "text/plain" })
    const fileURL = URL.createObjectURL(file)
    const fileLink = document.createElement("a")
    fileLink.href = fileURL
    fileLink.download = website.index_now_key
    fileLink.click()
  }

export const WebsitesSourceToggle = (
  payload: types.WebsitesSourceToggleAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.WebsitesSourceToggle,
  payload,
})

export const $WebsiteSourceToggle =
  (params: {
    website: WebsiteEntity
    source: IndexationSearchEngines
  }): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    dispatcher(
      WebsitesSourceToggle({
        websiteId: params.website.id,
        source: params.source,
      })
    )
  }

export const WebsiteRemoveGoogleApiKey = (
  payload: types.WebsiteRemoveGoogleApiKeyAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.WebsiteRemoveGoogleApiKey,
  payload,
})

export const $WebsiteRemoveGoogleApiKey =
  (params: {
    keyId: string
    website: WebsiteEntity | null
  }): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {}

export const WebsiteStoreGoogleApiKeys = (
  payload: types.WebsiteStoreGoogleApiKeysAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.WebsiteStoreGoogleApiKeys,
  payload,
})

export const WebsiteStoreUsers = (
  payload: types.WebsiteStoreUsersAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.WebsiteStoreUsers,
  payload,
})

export const $WebsiteStoreGoogleApiKeys =
  (website: WebsiteEntity): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {}

export const $fetchUsersWithRightsOnThisWebsite =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { di, websites } = getState()

    if (!websites.website) return false

    const response = await di.WebsitesRepository.getUsersFromWebsite({
      websiteId: websites.website.id,
    })

    if (response.error) {
      return dispatch(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatch(
      actions.websites.WebsiteStoreUsers({
        users: response.body,
      })
    )
  }

export const $addUserOnThisWebsite =
  (params: { email: string }): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di, websites } = getState()

    if (!websites.website) return false

    const response = await di.WebsitesRepository.addUserToWebsite({
      websiteId: websites.website.id,
      email: params.email,
    })

    if (response.error) {
      return dispatch(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatch(actions.websites.$fetchUsersWithRightsOnThisWebsite())
  }

export const $removeUserOnThisWebsite =
  (params: { email: string }): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di, websites } = getState()

    if (!websites.website) return false

    const response = await di.WebsitesRepository.removeUserToWebsite({
      websiteId: websites.website.id,
      email: params.email,
    })

    if (response.error) {
      return dispatch(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatch(actions.websites.$fetchUsersWithRightsOnThisWebsite())
  }

export const navigateOrShowModal =
  (website: WebsiteEntity): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, lang } = getState()

    if (!website) return false

    const getSourcesToIndexOn =
      website.indexation_auto_activated_sources as IndexationSearchEngines[]

    if (getSourcesToIndexOn.length === 0) {
      return dispatcher(
        actions.indexation.IndexationToggleSearchEngineModal({ value: true })
      )
    }

    di.LocationService.navigate(
      normalizeUrl({
        url: "/indexation/" + website.id,
        locale: lang.lang,
      })
    )
  }

/**
 * ========================================================================
 *
 * SITEMAP
 *
 * ========================================================================
 */

export const SitemapsStore = (
  payload: types.SitemapsStoreAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.SitemapsStore,
  payload,
})

export const $SitemapsFetch =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { di, websites } = getState()

    if (!websites.website) return false

    dispatch(actions.websites.setSitemapFetching({ value: true }))

    const response = await di.WebsitesRepository.SitemapsFetchAll({
      websiteId: websites.website.id,
    })

    dispatch(actions.websites.setSitemapFetching({ value: false }))

    if (response.error) {
      return dispatch(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatch(
      actions.websites.SitemapsStore({
        sitemaps: response.body.sitemaps,
      })
    )
  }

export const $openSitemapModal =
  (params?: { websiteId?: string }): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di, websites } = getState()

    const websiteId = params?.websiteId || websites.website?.id

    if (!websiteId) return false

    dispatch(
      actions.websites.setActiveWebsite({
        id: websiteId,
      })
    )

    dispatch(actions.websites.setOpenSitemapModal({ value: true }))

    dispatch(actions.websites.$SitemapsFetch())
  }

export const $DeleteConfirmModalOpen =
  (params: { websiteId: string }): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di } = getState()

    di.LocationService.navigate(
      di.LocationService.getPathname() +
        `?${ModalKeys["remove-website-confirmation-modal"]}=${params?.websiteId}`,
      { disableScroll: true }
    )
  }

export const $DeleteConfirmModalClose =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { di } = getState()

    di.LocationService.navigate(di.LocationService.getPathname(), {
      disableScroll: true,
    })
  }

export const $SitemapsDelete =
  (params: {
    id: SitemapEntity["id"]
  }): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di, websites } = getState()

    if (!websites.website) return false

    dispatch(actions.websites.setSitemapFetching({ value: true }))

    const response = await di.WebsitesRepository.SitemapsDelete({
      websiteId: websites.website.id,
      id: params.id,
    })

    dispatch(actions.websites.setSitemapFetching({ value: false }))

    if (response.error) {
      return dispatch(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatch(actions.websites.$SitemapsFetch())
  }

export const $saveSitemap =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, websites } = getState()

    if (!websites.addSitemap.value) {
      dispatcher(
        actions.notifications.create({
          message: NotificationMessageEntity.WEBSITES_SITEMAP_UPDATE_EMPTY,
          type: "error",
        })
      )

      return false
    }

    dispatcher(setSitemapFetching({ value: true }))

    const website = await di.WebsitesRepository.updateSitemap({
      website: websites.activeWebsite as string,
      sitemap: websites.addSitemap.value,
    })

    if (website.error === true) {
      dispatcher(setSitemapFetching({ value: false }))

      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: website.code,
        })
      )
    }

    dispatcher(
      actions.notifications.create({
        type: "success",
        message: NotificationMessageEntity.SYNC_SUCCESS,
      })
    )

    dispatcher(actions.websites.updateSitemap({ value: "" }))
    dispatcher(actions.websites.$SitemapsFetch())
    dispatcher(actions.indexation.$fetch())
  }

export const $refreshSitemapAndIndexation =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, websites } = getState()

    if (!websites.activeWebsite) {
      return dispatcher(
        actions.notifications.create({
          message: NotificationMessageEntity.WEBSITES_NOT_SELECTED,
          type: "error",
        })
      )
    }

    dispatcher(actions.websites.setSitemapFetching({ value: true }))

    const response = await di.WebsitesRepository.refreshSitemapAndIndexation({
      websiteId: websites.activeWebsite,
    })

    if (response.error === true) {
      dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )

      return dispatcher(actions.websites.setSitemapFetching({ value: false }))
    }

    dispatcher(actions.websites.setSitemapFetching({ value: false }))
    dispatcher(
      actions.notifications.create({
        type: "success",
        message: NotificationMessageEntity.SYNC_SUCCESS,
      })
    )
    dispatcher(actions.websites.$SitemapsFetch())
    dispatcher(actions.indexation.$fetch())
    dispatcher(actions.websites.$fetchAll({ force: true }))
  }

/**
 * ========================================================================
 *
 *
 *
 *
 *
 *
 * ========================================================================
 */

export const $WebsitesOpenAddUsersModal =
  (params: { websiteId: string }): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di } = getState()

    dispatcher(actions.websites.setActiveWebsite({ id: params.websiteId }))
    dispatcher(actions.websites.$fetchUsersWithRightsOnThisWebsite())

    di.LocationService.navigate(
      di.LocationService.getPathname() +
        `#${ModalKeys["add-user-to-website-modal"]}`,
      {
        disableScroll: true,
      }
    )
  }

export const $WebsitesCloseAddUsersModal =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di } = getState()

    di.LocationService.navigate(di.LocationService.getPathname(), {
      disableScroll: true,
    })
  }
