import { navigate } from "@reach/router"
import { IndexationSearchEngines } from "./../../entities/SearchEngineEntity"
import { WebsiteActivated } from "./../../modules/seeds/WebsitesSeeds"
import * as types from "./types"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"
import { actions } from "../actions"
import { NotificationMessageEntity } from "../../entities/NotificationEntity"
import { getWebsiteIdFromUrl } from "../../utils/getWebsiteIdFromUrl"
import {
  ErrorEntity,
  IndexationGoogleCloudApiKeyEntity,
  IndexationSourceType,
  PaymentPlansEntity,
  WebsiteEntity,
} from "@my-search-console/interfaces"
import { normalizeUrl } from "../../utils/normalizeUrl"
import { TOOLS_AVAILABLE } from "../../constants/tools"
import { getProductIdByPlan } from "../../utils/getProductIdByPlan"

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

    dispatcher(setSitemapFetching({ value: false }))

    if (website.error === true) {
      dispatcher(
        actions.notifications.create({
          type: "error",
          message: website.code,
        })
      )

      return false
    }

    dispatcher(
      actions.notifications.create({
        type: "success",
        message: NotificationMessageEntity.SYNC_SUCCESS,
      })
    )

    dispatcher(updateWebsite({ website: website.body }))
    dispatcher(setSitemapFetching({ value: false }))
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
    dispatcher(actions.indexation.$fetch())
  }

export const $syncWebsiteAndCheckEverything =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di } = getState()

    const { feature } = getWebsiteIdFromUrl(di.LocationService.getFullUrl())

    if (feature === "shared")
      return dispatcher(actions.websites.$getWebsiteInfoReadOnly())

    await dispatcher(actions.websites.$fetchAll())
    await dispatcher(actions.websites.$setWebsiteActiveFromUrl())
    await dispatcher(actions.websites.$check())
    await dispatcher(
      actions.websites.$WebsiteStoreGoogleApiKeys(
        getState().websites.website as WebsiteEntity
      )
    )
    await dispatcher(actions.websites.$syncAnalytics())
    await dispatcher(actions.keywords.$fetchKeywords())
    await dispatcher(actions.opportunities.$fetchOpportunities())
    await dispatcher(actions.indexation.$fetch())
    // await dispatcher(actions.indexation.$IndexationAutoQueueFetch())
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

    dispatcher(storeCheck(response.body))
  }

export const $syncAnalytics =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, websites } = getState()

    const websiteId = websites.activeWebsite || ""
    const website = websites.map.get(websites.activeWebsite || "")
    const { feature } = getWebsiteIdFromUrl(di.LocationService.getFullUrl())

    if (!website) return

    const isFinishedResponse =
      await di.WebsitesRepository.fetchWebsiteAnalyticsStatus({ websiteId })

    if (isFinishedResponse.error) {
    } else {
      dispatcher(
        actions.ranking.AnalyticsStoreIsFinishedStatus({
          value: isFinishedResponse.body.is_finished,
        })
      )
    }

    if (feature === "analytics") {
      dispatcher(actions.ranking.$fetch())
    }
  }

export const $deleteWebsite =
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

    di.WebsitesRepository.delete({
      websiteId,
    })

    dispatcher(
      actions.notifications.create({
        type: "success",
        message: NotificationMessageEntity.WEBSITES_DELETED,
      })
    )

    di.LocationService.navigate(
      normalizeUrl({
        url: "/administration?tool=analytics",
        locale: lang.lang,
      })
    )
  }

export const $saveCredentials =
  (website: WebsiteEntity | null): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    const {
      di,
      websites: { addCredentials },
    } = getState()

    if (!website) return false

    if (!addCredentials.value) {
      dispatcher(
        actions.notifications.create({
          message: NotificationMessageEntity.WEBSITES_CREDENTIALS_UPDATE_EMPTY,
          type: "error",
        })
      )
      return false
    }

    dispatcher(setCredentialsFetching({ value: true }))

    const response = await di.IndexationService.addGoogleApiKey({
      websiteId: website.id,
      key: addCredentials.value,
    })

    if (response.error === true) {
      dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )

      dispatcher(setCredentialsFetching({ value: false }))
      return false
    }

    dispatcher(
      actions.notifications.create({
        type: "success",
        message: ErrorEntity.WEBSITE_NOT_FOUND,
      })
    )

    dispatcher(setCredentialsFetching({ value: false }))
    dispatcher(setIsCredentialsAreGood({ value: true }))

    dispatcher(actions.websites.$WebsiteStoreGoogleApiKeys(website))
  }

export const $WebsiteCreateModal =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    dispatcher($CreateWebsiteFetchGoogleDomains())
    dispatcher(WebsiteAddSourceModalSetIsOpen({ isOpen: true, type: "google" }))
  }

export const $activate =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, websites } = getState()

    if (websites.fetching) return false
    if (!websites.createWebsiteModal.selected) return false

    if (websites.createWebsiteModal.type === "google") {
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

      await dispatcher($fetchAll({ force: true }))

      dispatcher(WebsiteAddSourceModalSetIsOpen({ isOpen: false }))
      dispatcher(
        actions.websites.$changeWebsite({ websiteId: response.body.id })
      )

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

export const $fetchAll =
  (props?: {
    force?: boolean
    readonly?: boolean
  }): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, websites, payments, auth } = getState()
    const { websiteId } = getWebsiteIdFromUrl(di.LocationService.getPathname())

    if (!websiteId && props?.readonly === true) {
      return false
    }

    if (websites.entities.length > 0 && !props?.force) return

    dispatcher(setFetching(true))

    const response = await di.WebsitesRepository.fetch(
      websiteId && props?.readonly === true ? { websiteId } : undefined
    )

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

    if (!activeWebsiteId)
      return dispatcher(actions.websites.$WebsiteCreateModal())

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

    di.LocationService.navigate(
      normalizeUrl({
        url: `/${feature || "analytics"}/${params.websiteId}`,
        locale: lang.lang,
      })
    )

    dispatcher(setActiveWebsite({ id: params.websiteId }))
    dispatcher(actions.websites.$check())

    if (feature === "analytics") {
      dispatcher(actions.websites.$syncAnalytics())
    }

    if (feature === "keywords") {
      dispatcher(actions.keywords.KeywordsReset())
      dispatcher(actions.keywords.$fetchKeywords())
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
    }
  }

export const $setWebsiteActiveFromUrl =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, websites, lang } = getState()

    const url = di.LocationService.getPathname()

    const { websiteId } = getWebsiteIdFromUrl(url)
    const website = websites.map.get(websiteId || "")

    if (!website) {
      return di.LocationService.navigate(
        normalizeUrl({
          url: "/",
          locale: lang.lang,
          removeLocaleIfExists: true,
        })
      )
    }

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
      if (websiteSelected.yandex_domain) return

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
      if (websiteSelected.bing_domain && !force) return

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

    if (!auth.user?.email) {
      return dispatcher(actions.auth.$authenticateWithGoogle())
    }

    if (plan === "free") {
      dispatcher(actions.payments.PaymentsOpenModal({ value: false }))
      return di.LocationService.navigate(
        normalizeUrl({
          url: "/administration?tool=analytics/",
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

      dispatcher(
        actions.payments.PaymentsOpenModal({
          value: true,
          type: "indexation",
          source: "indexation/quota",
        })
      )
    }
  }

export const $WebsiteIndexNowCheckIfKeyIsInstalled =
  (website: WebsiteEntity | null): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di } = getState()

    if (!website) return

    dispatcher(WebsiteIndexNowCheckSetFetching({ value: true }))

    const response = await di.IndexationService.checkIndexNowKey({
      websiteId: website.id,
    })

    if (response.error) {
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      )
    }

    dispatcher(WebsiteIndexNowCheckSetFetching({ value: false }))
    dispatcher(WebsiteIndexNowModalSetOpen({ value: false, website: null }))
    dispatcher(
      updateWebsite({ website: { ...website, index_now_installed: true } })
    )
    dispatcher(
      actions.notifications.create({
        type: "success",
        message: NotificationMessageEntity.SYNC_SUCCESS,
      })
    )
  }

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
  async (dispatcher, getState) => {
    const { di } = getState()

    if (!params.website || !params.keyId) return false

    const response = await di.IndexationService.deleteGoogleApiKey({
      websiteId: params.website.id,
      keyId: params.keyId,
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
      actions.notifications.create({
        type: "success",
        message: NotificationMessageEntity.WEBSITES_UPDATE_SUCCESS,
      })
    )

    dispatcher(actions.websites.WebsiteRemoveGoogleApiKey(params))
  }

export const WebsiteStoreGoogleApiKeys = (
  payload: types.WebsiteStoreGoogleApiKeysAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.WebsiteStoreGoogleApiKeys,
  payload,
})

export const $WebsiteStoreGoogleApiKeys =
  (website: WebsiteEntity): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    const { di } = getState()

    if (!website) return false

    const response = await di.IndexationService.getGoogleApiKeys({
      websiteId: website.id,
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
      actions.websites.WebsiteStoreGoogleApiKeys({
        website: website,
        keys: response.body.google_cloud_api_keys,
      })
    )
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
