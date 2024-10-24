import { ThunkAction } from "redux-thunk"
import { getWebsiteIdFromUrl } from "../../utils/getWebsiteIdFromUrl"
import { normalizeUrl } from "../../utils/normalizeUrl"
import { actions } from "../actions"
import { RootState } from "../store"
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
      await dispatcher(actions.analytics.$fetch())
    }
  }

export const $fetchAll =
  (props?: {
    force?: boolean
    readonly?: boolean
  }): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, websites } = getState()
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

    if (feature === "analytics") {
      dispatcher(actions.analytics.$fetch())
    }
  }

export const $setWebsiteActiveFromUrl =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di } = getState()

    const url = di.LocationService.getPathname()

    const { websiteId } = getWebsiteIdFromUrl(url)

    dispatcher(setActiveWebsite({ id: websiteId }))
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
