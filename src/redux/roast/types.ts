import { IndexationSearchEngines } from "../../entities/SearchEngineEntity"
import { IndexationGoogleCloudApiKeyEntity } from "@my-search-console/interfaces"
import { RoastWithReportEntity } from "../../entities/RoastEntity"

export const Reset = "roast/Reset"
export interface ResetAction {
  type: typeof Reset
}

export const Select = "roast/SELECT"
export interface SelectAction {
  type: typeof Select
  payload: { id: RoastWithReportEntity["id"] }
}

export const Add = "roast/ADD"
export interface AddAction {
  type: typeof Add
  payload: { websites: RoastWithReportEntity[] }
}

export const updateWebsite = "roast/updateWebsite"
export interface updateWebsiteAction {
  type: typeof updateWebsite
  payload: { website: RoastWithReportEntity }
}

export const setOpenSitemapModal = "roast/setOpenSitemapModal"
export interface setOpenSitemapModalAction {
  type: typeof setOpenSitemapModal
  payload: { value: boolean }
}

export const Store = "roast/STORE"
export interface StoreAction {
  type: typeof Store
  payload: { websites: RoastWithReportEntity[] }
}

export const StoreGoogle = "roast/GOOGLE_STORE"
export interface StoreGoogleAction {
  type: typeof StoreGoogle
  payload: { websites: RoastWithReportEntity[] }
}

/*********************************************************
 *
 * Credentials
 *
 *********************************************************/

export const setCredentialsFetching = "roast/setCredentialsFetching"
export interface setCredentialsFetchingAction {
  type: typeof setCredentialsFetching
  payload: { value: boolean }
}

export const setIsCredentialsAreGood = "roast/setIsCredentialsAreGood"
export interface setIsCredentialsAreGoodAction {
  type: typeof setIsCredentialsAreGood
  payload: { value: boolean }
}

export const setCredentialsIsOpen = "roast/setCredentialsIsOpen"
export interface setCredentialsIsOpenAction {
  type: typeof setCredentialsIsOpen
  payload: { value: boolean; website: RoastWithReportEntity | null }
}

export const updateCredentials = "roast/updateCredentials"
export interface updateCredentialsAction {
  type: typeof updateCredentials
  payload: { value: string }
}

/*********************************************************
 *
 * Sitemap
 *
 *********************************************************/

export const WebsiteSitemapSetFetching = "WebsiteSitemapSetFetching"
export interface WebsiteSitemapSetFetchingAction {
  type: typeof WebsiteSitemapSetFetching
  payload: { value: boolean }
}

export const UpdateSitemap = "roast/UPDATE_SITEMAP"
export interface UpdateSitemapAction {
  type: typeof UpdateSitemap
  payload: { value: string }
}

export const Remove = "roast/REMOVE"
export interface RemoveAction {
  type: typeof Remove
  payload: { id: RoastWithReportEntity["id"] }
}

export const SetActiveWebsite = "roast/SET_ACTIVE_WEBSITE"
export interface SetActiveWebsiteAction {
  type: typeof SetActiveWebsite
  payload: {
    id: string
  }
}

export const SetFetching = "roast/SET_FETCHING"
export interface SetFetchingAction {
  type: typeof SetFetching
  payload: boolean
}

export const SelectWebsite = "roast/SELECT_WEBSITE"
export interface SelectWebsiteAction {
  type: typeof SelectWebsite
  payload: RoastWithReportEntity["id"]
}

export const WebsiteAddSourceModalSetIsOpen = "WebsiteAddSourceModalSetIsOpen"
export interface WebsiteAddSourceModalSetIsOpenAction {
  type: typeof WebsiteAddSourceModalSetIsOpen
  payload:
    | {
        type: "yandex" | "bing" | "google"
        isOpen: true
      }
    | { isOpen: false }
}

export const WebsitesToggleRefreshFetching = "WebsitesToggleRefreshFetching"
export interface WebsitesToggleRefreshFetchingAction {
  type: typeof WebsitesToggleRefreshFetching
  payload: { websiteId: string }
}

export const WebsiteAddSourceModalSelect = "WebsiteAddSourceModalSelect"
export interface WebsiteAddSourceModalSelectAction {
  type: typeof WebsiteAddSourceModalSelect
  payload: { value: string }
}

export const Update = "roast/UPDATE"
export interface UpdateAction {
  type: typeof Update
  payload: RoastWithReportEntity
}

export const refreshSitemapAndIndexation = "roast/refreshSitemapAndIndexation"
export interface refreshSitemapAndIndexationAction {
  type: typeof refreshSitemapAndIndexation
}

export const DraftUpdate = "roast/DRAFT_UPDATE"
export interface DraftUpdateAction {
  type: typeof DraftUpdate
  payload: {
    [key: string]: string
  }
}

export const DraftUpdateFetching = "roast/DRAFT_UPDATE_FETCHING"
export interface DraftUpdateFetchingAction {
  type: typeof DraftUpdateFetching
  payload: boolean
}

export const DraftClear = "roast/DRAFT_CLEAR"
export interface DraftClearAction {
  type: typeof DraftClear
}

export const DraftSetUrlChecked = "roast/DRAFT_SET_URL_CHECKED"
export interface DraftSetUrlCheckedAction {
  type: typeof DraftSetUrlChecked
  payload: boolean
}

/*********************************************************
 *
 * Premium
 *
 *********************************************************/

// Yandex & Bing
export const CreateWebsiteSelectYandexDomain =
  "roast/CreateWebsiteSelectYandexDomain"
export interface CreateWebsiteSelectYandexDomainAction {
  type: typeof CreateWebsiteSelectYandexDomain
  payload: { value: string }
}

export const CreateWebsiteSelectBingDomain =
  "roast/CreateWebsiteSelectBingDomain"
export interface CreateWebsiteSelectBingDomainAction {
  type: typeof CreateWebsiteSelectBingDomain
  payload: { value: string }
}

export const CreateWebsiteStoreDomains = "roast/CreateWebsiteStoreDomains"
export interface CreateWebsiteStoreDomainsAction {
  type: typeof CreateWebsiteStoreDomains
  payload: { value: { id: string }[] }
}

export const CreateWebsiteSetFetching = "roast/CreateWebsiteSetFetching"
export interface CreateWebsiteSetFetchingAction {
  type: typeof CreateWebsiteSetFetching
  payload: { value: boolean }
}

export const CreateWebsiteStoreFetchBingDomains =
  "roast/CreateWebsiteStoreFetchBingDomains"
export interface CreateWebsiteStoreFetchBingDomainsAction {
  type: typeof CreateWebsiteStoreFetchBingDomains
  payload: { value: { id: string }[] }
}

// IndexNow
export const WebsiteIndexNowModalSetOpen = "WebsiteIndexNowModalSetOpen"
export interface WebsiteIndexNowModalSetOpenAction {
  type: typeof WebsiteIndexNowModalSetOpen
  payload: { value: boolean; website: RoastWithReportEntity | null }
}

export const WebsiteIndexNowCheckSetFetching = "WebsiteIndexNowCheckSetFetching"
export interface WebsiteIndexNowCheckSetFetchingAction {
  type: typeof WebsiteIndexNowCheckSetFetching
  payload: { value: boolean }
}

export const WebsitesSourceToggle = "WebsitesSourceToggleAction"
export interface WebsitesSourceToggleAction {
  type: typeof WebsitesSourceToggle
  payload: { websiteId: string; source: IndexationSearchEngines }
}

export const WebsiteRemoveGoogleApiKey = "WebsiteRemoveGoogleApiKey"
export interface WebsiteRemoveGoogleApiKeyAction {
  type: typeof WebsiteRemoveGoogleApiKey
  payload: { website: RoastWithReportEntity | null; keyId: string }
}

export const WebsiteStoreGoogleApiKeys = "WebsiteStoreGoogleApiKeys"
export interface WebsiteStoreGoogleApiKeysAction {
  type: typeof WebsiteStoreGoogleApiKeys
  payload: {
    website: RoastWithReportEntity
    keys: IndexationGoogleCloudApiKeyEntity[]
  }
}

export type WebsitesActionTypes =
  | ResetAction
  | UpdateAction
  | AddAction
  | SetActiveWebsiteAction
  | SetFetchingAction
  | SelectWebsiteAction
  | DraftClearAction
  | DraftUpdateFetchingAction
  | DraftSetUrlCheckedAction
  | DraftUpdateAction
  | StoreAction
  | RemoveAction
  | WebsiteSitemapSetFetchingAction
  | UpdateSitemapAction
  | StoreGoogleAction
  | updateWebsiteAction
  | setOpenSitemapModalAction
  | setCredentialsFetchingAction
  | setIsCredentialsAreGoodAction
  | updateCredentialsAction
  | setCredentialsIsOpenAction
  | refreshSitemapAndIndexationAction
  | SelectAction
  | CreateWebsiteSelectYandexDomainAction
  | CreateWebsiteSelectBingDomainAction
  | CreateWebsiteStoreDomainsAction
  | CreateWebsiteSetFetchingAction
  | CreateWebsiteStoreFetchBingDomainsAction
  | WebsiteAddSourceModalSelectAction
  | WebsiteAddSourceModalSetIsOpenAction
  // IndexNow
  | WebsiteIndexNowModalSetOpenAction
  | WebsiteIndexNowCheckSetFetchingAction
  | WebsitesSourceToggleAction
  | WebsiteRemoveGoogleApiKeyAction
  | WebsiteStoreGoogleApiKeysAction
  | WebsitesToggleRefreshFetchingAction
