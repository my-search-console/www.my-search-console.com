import { WebsiteEntity } from "@my-search-console/interfaces"
import * as types from "./types"

interface WebsitesState {
  google: WebsiteEntity[]
  filter: string
  entities: Array<WebsiteEntity["id"]>
  map: Map<WebsiteEntity["id"], WebsiteEntity>
  website: WebsiteEntity | null
  fetching: boolean
  activeWebsite: WebsiteEntity["id"] | null
}

const initialState: WebsitesState = {
  entities: [],
  map: new Map(),
  google: [],
  fetching: false,
  filter: "",
  website: null,
  activeWebsite: null,
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

  if (action.type === types.updateWebsite) {
    state.map.set(action.payload.website.id, action.payload.website)

    return {
      ...state,
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

  if (action.type === types.SetActiveWebsite) {
    return {
      ...state,
      activeWebsite: action.payload.id,
      website: state.map.get(action.payload.id || "") || null,
      filter: "",
    }
  }

  if (action.type === types.SetFetching) {
    return {
      ...state,
      fetching: action.payload,
    }
  }

  if (action.type === types.Reset) {
    return {
      ...initialState,
    }
  }

  return state
}
