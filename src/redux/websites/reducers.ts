import { WebsiteEntity } from "@foudroyer/interfaces"
import { uniq } from "ramda"
import * as types from "./types"
import { isUrlValidForFoudroyer } from "../../utils/isUrlValidForFoudroyer"

interface WebsitesState {
  google: WebsiteEntity[]
  areCredentialsGood: boolean
  addSitemap: {
    isOpen: boolean
    value: string | null
    isFetching: boolean
  }
  addCredentials: {
    website: WebsiteEntity | null
    isOpen: boolean
    value: string | null
    isFetching: boolean
  }
  entities: Array<WebsiteEntity["id"]>
  map: Map<WebsiteEntity["id"], WebsiteEntity>
  createWebsiteModal: {
    isOpen: boolean
    domains: Array<{ id: string }>
    type: "google" | "yandex" | "bing"
    isFetching: boolean
    selected: string | null
  }
  activeWebsite: string | null
  website: WebsiteEntity | null
  fetching: boolean
  indexNowCheckModal: {
    isOpen: boolean
    isFetching: boolean
    website: WebsiteEntity | null
  }
}

const initialState: WebsitesState = {
  entities: [],
  map: new Map(),
  areCredentialsGood: false,
  google: [],
  fetching: false,
  addSitemap: {
    isOpen: false,
    value: null,
    isFetching: false,
  },
  addCredentials: {
    website: null,
    isOpen: false,
    value: null,
    isFetching: false,
  },
  website: null,
  activeWebsite: null,
  createWebsiteModal: {
    type: "google",
    isOpen: false,
    domains: [],
    isFetching: false,
    selected: null,
  },
  indexNowCheckModal: {
    isOpen: false,
    isFetching: false,
    website: null,
  },
}

export function websitesReducer(
  state = initialState,
  action: types.WebsitesActionTypes
): WebsitesState {
  if (action.type === types.Store) {
    const map = new Map()

    const entities = action.payload.websites.map((website) => {
      map.set(website.id, website)
      return website.id
    })

    return {
      ...state,
      entities: [...entities],
      map,
    }
  }

  if (action.type === types.StoreGoogle) {
    return {
      ...state,
      google: action.payload.websites,
    }
  }

  if (action.type === types.CreateWebsiteSetFetching) {
    return {
      ...state,
      createWebsiteModal: {
        ...state.createWebsiteModal,
        isFetching: action.payload.value,
      },
    }
  }

  if (action.type === types.updateWebsite) {
    state.map.set(action.payload.website.id, action.payload.website)
    return {
      ...state,
    }
  }

  if (action.type === types.setOpenSitemapModal) {
    return {
      ...state,
      addSitemap: {
        ...state.addSitemap,
        isOpen: action.payload.value,
      },
    }
  }

  if (action.type === types.UpdateSitemap) {
    return {
      ...state,
      addSitemap: {
        ...state.addSitemap,
        value: action.payload.value,
      },
    }
  }

  if (action.type === types.updateCredentials) {
    return {
      ...state,
      addCredentials: {
        ...state.addCredentials,
        value: action.payload.value,
      },
    }
  }

  if (action.type === types.Remove) {
    const entities = state.entities.filter((id) => {
      return id !== action.payload.id
    })

    return {
      ...state,
      entities,
    }
  }

  if (action.type === types.CreateWebsiteStoreDomains) {
    return {
      ...state,
      createWebsiteModal: {
        ...state.createWebsiteModal,
        domains: action.payload.value,
      },
    }
  }

  if (action.type === types.WebsiteAddSourceModalSetIsOpen) {
    return {
      ...state,
      createWebsiteModal: {
        ...state.createWebsiteModal,
        ...(action.payload.isOpen === true
          ? { ...action.payload }
          : { ...initialState.createWebsiteModal }),
      },
    }
  }

  if (action.type === types.WebsiteAddSourceModalSelect) {
    if (!isUrlValidForFoudroyer({ url: action.payload.value })) return state
    return {
      ...state,
      createWebsiteModal: {
        ...state.createWebsiteModal,
        selected: action.payload.value,
      },
    }
  }

  if (action.type === types.Add) {
    const entities = action.payload.websites.map((website) => {
      state.map.set(website.id, website)
      return website.id
    })

    return {
      ...state,
      entities: uniq([...state.entities, ...entities]),
    }
  }

  if (action.type === types.SetActiveWebsite) {
    return {
      ...state,
      activeWebsite: action.payload.id,
      website: state.map.get(action.payload.id || "") || null,
    }
  }

  if (action.type === types.SetFetching) {
    return {
      ...state,
      fetching: action.payload,
    }
  }

  if (action.type === types.setCredentialsFetching) {
    return {
      ...state,
      addCredentials: {
        ...state.addCredentials,
        isFetching: action.payload.value,
      },
    }
  }

  if (action.type === types.setCredentialsIsOpen) {
    return {
      ...state,
      addCredentials: {
        ...initialState.addCredentials,
        website: action.payload.website,
        isOpen: action.payload.value,
      },
    }
  }

  if (action.type === types.storeCheck) {
    return {
      ...state,
      addSitemap: {
        ...initialState.addSitemap,
        isOpen: !action.payload.isSitemapValid,
      },
      areCredentialsGood: action.payload.isCredentialsValid,
      addCredentials: {
        ...initialState.addCredentials,
        isOpen: false,
      },
    }
  }

  if (action.type === types.setIsCredentialsAreGood) {
    return {
      ...state,
      areCredentialsGood: action.payload.value,
    }
  }

  if (action.type === types.WebsiteIndexNowModalSetOpen) {
    return {
      ...state,
      indexNowCheckModal: {
        ...state.indexNowCheckModal,
        website: action.payload.website,
        isOpen: action.payload.value,
      },
    }
  }

  if (action.type === types.WebsiteIndexNowCheckSetFetching) {
    return {
      ...state,
      indexNowCheckModal: {
        ...state.indexNowCheckModal,
        isFetching: action.payload.value,
      },
    }
  }

  if (action.type === types.WebsiteSitemapSetFetching) {
    return {
      ...state,
      addSitemap: {
        ...state.addSitemap,
        isFetching: action.payload.value,
      },
    }
  }

  if (action.type === types.Reset) {
    return {
      ...initialState,
    }
  }

  if (action.type === types.WebsitesSourceToggle) {
    const website = state.map.get(action.payload.websiteId)

    if (!website) return state

    const sources = website.indexation_auto_activated_sources

    if (sources.includes(action.payload.source)) {
      const index = sources.indexOf(action.payload.source)
      sources.splice(index, 1)
    } else {
      sources.push(action.payload.source)
    }

    const newWebsite = {
      ...website,
      indexation_auto_activated_sources: sources,
    }

    state.map.set(action.payload.websiteId, newWebsite)

    return {
      ...state,
      website: newWebsite,
    }
  }

  if (action.type === types.WebsiteRemoveGoogleApiKey) {
    const website = state.map.get(action.payload.website?.id || "")

    if (!website || !action.payload.website) return state

    const newKeys = website.google_api_keys.filter(
      (key) => key.id !== action.payload.keyId
    )

    const newWebsite = {
      ...website,
      google_api_keys: newKeys,
    }

    state.map.set(action.payload.website.id, newWebsite)

    return {
      ...state,
      addCredentials: {
        ...state.addCredentials,
        website: newWebsite,
      },
      website: newWebsite,
    }
  }

  if (action.type === types.WebsiteStoreGoogleApiKeys) {
    const website = state.map.get(action.payload.website.id)

    if (!website) return state

    const keys = action.payload.keys

    const updatedWebsite = {
      ...website,
      google_api_keys: keys,
    }

    state.map.set(action.payload.website.id, updatedWebsite)

    return {
      ...state,
      addCredentials: {
        ...state.addCredentials,
        website: updatedWebsite,
      },
      website: updatedWebsite,
    }
  }

  return state
}
