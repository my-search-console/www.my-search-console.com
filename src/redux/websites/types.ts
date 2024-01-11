import { IndexationSearchEngines } from "./../../entities/SearchEngineEntity"
import {
  IndexationGoogleCloudApiKeyEntity,
  WebsiteEntity,
  WebsiteGoogleCloudApiKeyEntity,
} from "@foudroyer/interfaces"
import { CheckResponseEntity } from "../../interfaces/IWebsitesRepository"

export const Reset = "Reset"
export interface ResetAction {
  type: typeof Reset
}

export const Select = "websites/SELECT"
export interface SelectAction {
  type: typeof Select
  payload: { id: WebsiteEntity["id"] }
}

export const Add = "websites/ADD"
export interface AddAction {
  type: typeof Add
  payload: { websites: WebsiteEntity[] }
}

export const updateWebsite = "websites/updateWebsite"
export interface updateWebsiteAction {
  type: typeof updateWebsite
  payload: { website: WebsiteEntity }
}

export const setOpenSitemapModal = "websites/setOpenSitemapModal"
export interface setOpenSitemapModalAction {
  type: typeof setOpenSitemapModal
  payload: { value: boolean }
}

export const Store = "websites/STORE"
export interface StoreAction {
  type: typeof Store
  payload: { websites: WebsiteEntity[] }
}

export const StoreGoogle = "websites/GOOGLE_STORE"
export interface StoreGoogleAction {
  type: typeof StoreGoogle
  payload: { websites: WebsiteEntity[] }
}

/*********************************************************
 *
 * Credentials
 *
 *********************************************************/

export const setCredentialsFetching = "websites/setCredentialsFetching"
export interface setCredentialsFetchingAction {
  type: typeof setCredentialsFetching
  payload: { value: boolean }
}

export const setIsCredentialsAreGood = "websites/setIsCredentialsAreGood"
export interface setIsCredentialsAreGoodAction {
  type: typeof setIsCredentialsAreGood
  payload: { value: boolean }
}

export const setCredentialsIsOpen = "websites/setCredentialsIsOpen"
export interface setCredentialsIsOpenAction {
  type: typeof setCredentialsIsOpen
  payload: { value: boolean; website: WebsiteEntity | null }
}

export const updateCredentials = "websites/updateCredentials"
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

export const UpdateSitemap = "websites/UPDATE_SITEMAP"
export interface UpdateSitemapAction {
  type: typeof UpdateSitemap
  payload: { value: string }
}

export const Remove = "websites/REMOVE"
export interface RemoveAction {
  type: typeof Remove
  payload: { id: WebsiteEntity["id"] }
}

export const SetActiveWebsite = "websites/SET_ACTIVE_WEBSITE"
export interface SetActiveWebsiteAction {
  type: typeof SetActiveWebsite
  payload: {
    id: string | null
  }
}

export const SetFetching = "websites/SET_FETCHING"
export interface SetFetchingAction {
  type: typeof SetFetching
  payload: boolean
}

export const SelectWebsite = "websites/SELECT_WEBSITE"
export interface SelectWebsiteAction {
  type: typeof SelectWebsite
  payload: WebsiteEntity["id"]
}

export const storeCheck = "websites/storeCheck"
export interface storeCheckAction {
  type: typeof storeCheck
  payload: CheckResponseEntity
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

export const WebsiteAddSourceModalSelect = "WebsiteAddSourceModalSelect"
export interface WebsiteAddSourceModalSelectAction {
  type: typeof WebsiteAddSourceModalSelect
  payload: { value: string }
}

export const Update = "websites/UPDATE"
export interface UpdateAction {
  type: typeof Update
  payload: WebsiteEntity
}

export const refreshSitemapAndIndexation =
  "websites/refreshSitemapAndIndexation"
export interface refreshSitemapAndIndexationAction {
  type: typeof refreshSitemapAndIndexation
}

export const DraftUpdate = "websites/DRAFT_UPDATE"
export interface DraftUpdateAction {
  type: typeof DraftUpdate
  payload: {
    [key: string]: string
  }
}

export const DraftUpdateFetching = "websites/DRAFT_UPDATE_FETCHING"
export interface DraftUpdateFetchingAction {
  type: typeof DraftUpdateFetching
  payload: boolean
}

export const DraftClear = "websites/DRAFT_CLEAR"
export interface DraftClearAction {
  type: typeof DraftClear
}

export const DraftSetUrlChecked = "websites/DRAFT_SET_URL_CHECKED"
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
  "websites/CreateWebsiteSelectYandexDomain"
export interface CreateWebsiteSelectYandexDomainAction {
  type: typeof CreateWebsiteSelectYandexDomain
  payload: { value: string }
}

export const CreateWebsiteSelectBingDomain =
  "websites/CreateWebsiteSelectBingDomain"
export interface CreateWebsiteSelectBingDomainAction {
  type: typeof CreateWebsiteSelectBingDomain
  payload: { value: string }
}

export const CreateWebsiteStoreDomains = "websites/CreateWebsiteStoreDomains"
export interface CreateWebsiteStoreDomainsAction {
  type: typeof CreateWebsiteStoreDomains
  payload: { value: { id: string }[] }
}

export const CreateWebsiteSetFetching = "websites/CreateWebsiteSetFetching"
export interface CreateWebsiteSetFetchingAction {
  type: typeof CreateWebsiteSetFetching
  payload: { value: boolean }
}

export const CreateWebsiteStoreFetchBingDomains =
  "websites/CreateWebsiteStoreFetchBingDomains"
export interface CreateWebsiteStoreFetchBingDomainsAction {
  type: typeof CreateWebsiteStoreFetchBingDomains
  payload: { value: { id: string }[] }
}

// IndexNow
export const WebsiteIndexNowModalSetOpen = "WebsiteIndexNowModalSetOpen"
export interface WebsiteIndexNowModalSetOpenAction {
  type: typeof WebsiteIndexNowModalSetOpen
  payload: { value: boolean; website: WebsiteEntity | null }
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
  payload: { website: WebsiteEntity | null; keyId: string }
}

export const WebsiteStoreGoogleApiKeys = "WebsiteStoreGoogleApiKeys"
export interface WebsiteStoreGoogleApiKeysAction {
  type: typeof WebsiteStoreGoogleApiKeys
  payload: {
    website: WebsiteEntity
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
  | storeCheckAction
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
