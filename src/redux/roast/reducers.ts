import { WebsiteEntity } from "@foudroyer/interfaces"
import { uniq } from "ramda"
import { RoastWithReportEntity } from "../../entities/RoastEntity"
import { isUrlValidForFoudroyer } from "../../utils/isUrlValidForFoudroyer"
import * as types from "./types"

interface RoastState {
  google: WebsiteEntity[]
  websitesFetching: Array<RoastWithReportEntity["id"]>
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
  entities: Array<RoastWithReportEntity["id"]>
  map: Map<RoastWithReportEntity["id"], RoastWithReportEntity>
  createWebsiteModal: {
    isOpen: boolean
    domains: Array<{ id: string }>
    type: "google" | "yandex" | "bing"
    isFetching: boolean
    selected: string | null
  }
  activeWebsite: string | null
  website: RoastWithReportEntity | null
  fetching: boolean
  indexNowCheckModal: {
    isOpen: boolean
    isFetching: boolean
    website: RoastWithReportEntity | null
  }
}

const initialState: RoastState = {
  entities: [],
  map: new Map(),
  websitesFetching: [],
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

export function roastReducer(
  state = initialState,
  action: types.WebsitesActionTypes
): RoastState {
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

  if (action.type === types.CreateWebsiteSetFetching) {
    return {
      ...state,
      createWebsiteModal: {
        ...state.createWebsiteModal,
        isFetching: action.payload.value,
      },
    }
  }

  if (action.type === types.WebsitesToggleRefreshFetching) {
    const isWebsiteFetching = state.websitesFetching.includes(
      action.payload.websiteId
    )

    return {
      ...state,
      websitesFetching: isWebsiteFetching
        ? state.websitesFetching.filter((id) => id !== action.payload.websiteId)
        : [...state.websitesFetching, action.payload.websiteId],
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
      website: state.map.get(action.payload.id) || null,
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

  return state
}
