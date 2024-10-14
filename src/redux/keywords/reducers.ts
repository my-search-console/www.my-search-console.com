import { countries } from "../../constants/countries"
import { RankingStatEntity } from "../../entities/RankingWebsiteEntity"
import * as types from "./types"

export interface KeywordsState {
  keywords: RankingStatEntity[]
  isFetching: boolean
  selectedKeywordsToDelete: Set<string>
  selectedKeywordsToCreate: Set<string>
  filters: {
    country: string | null
    device: "desktop" | "mobile" | "tablet" | null
    source: "google" | "bing" | "yandex" | null
  }
  addKeywordsModal: {
    isOpen: boolean
    input: string
  }
}

const initialState: KeywordsState = {
  keywords: [],
  isFetching: false,
  selectedKeywordsToDelete: new Set(),
  selectedKeywordsToCreate: new Set(),
  filters: {
    country: null,
    device: null,
    source: null,
  },
  addKeywordsModal: {
    isOpen: false,
    input: "",
  },
}

export function keywordsReducer(
  state = initialState,
  action: types.KeywordsActionTypes
): KeywordsState {
  if (action.type === types.KeywordsStoreKeywords) {
    return {
      ...state,
      keywords: action.payload.keywords,
    }
  }

  if (action.type === types.KeywordsSetIsFetching) {
    return {
      ...state,
      isFetching: action.payload.value,
    }
  }

  if (action.type === types.KeywordsSetSelectedKeywords) {
    const selectedKeywords = new Set(state.selectedKeywordsToDelete)
    if (selectedKeywords.has(action.payload.keyword)) {
      selectedKeywords.delete(action.payload.keyword)
    } else {
      selectedKeywords.add(action.payload.keyword)
    }

    return {
      ...state,
      selectedKeywordsToDelete: selectedKeywords,
    }
  }

  if (action.type === types.KeywordsSetSelectedKeywordsToCreate) {
    const selectedKeywords = new Set(state.selectedKeywordsToCreate)
    if (selectedKeywords.has(action.payload.keyword)) {
      selectedKeywords.delete(action.payload.keyword)
    } else {
      selectedKeywords.add(action.payload.keyword)
    }

    return {
      ...state,
      selectedKeywordsToCreate: selectedKeywords,
    }
  }

  if (action.type === types.KeywordsSetAddKeywordsModalIsOpen) {
    return {
      ...state,
      addKeywordsModal: {
        ...state.addKeywordsModal,
        isOpen: action.payload.value,
        input: action.payload.value ? state.addKeywordsModal.input : "",
      },
      selectedKeywordsToCreate: !action.payload.value
        ? new Set()
        : state.selectedKeywordsToCreate,
    }
  }

  if (action.type === types.KeywordsSetAddKeywordsModalInput) {
    return {
      ...state,
      addKeywordsModal: {
        ...state.addKeywordsModal,
        input: action.payload.value,
      },
    }
  }

  if (action.type === types.KeywordsStoreInputToKeywords) {
    return {
      ...state,
      selectedKeywordsToCreate: new Set([
        ...state.selectedKeywordsToCreate,
        ...state.addKeywordsModal.input
          .split(",")
          .map((keyword) => keyword.trim()),
      ]),
      addKeywordsModal: {
        ...state.addKeywordsModal,
        input: "",
      },
    }
  }

  if (action.type === types.KeywordsRemoveAllKeywordsForCreate) {
    return {
      ...state,
      selectedKeywordsToCreate: new Set(),
    }
  }

  if (action.type === types.KeywordsRemoveAllKeywordsForDelete) {
    return {
      ...state,
      selectedKeywordsToDelete: new Set(),
    }
  }

  if (action.type === types.KeywordsSetFiltersCountry) {
    if (
      countries.includes(action.payload.country) === false ||
      action.payload.country === "unknown"
    ) {
      return {
        ...state,
        filters: {
          ...state.filters,
          country: null,
        },
      }
    }
    return {
      ...state,
      filters: {
        ...state.filters,
        country: action.payload.country,
      },
    }
  }

  if (action.type === types.KeywordsSetFiltersDevice) {
    return {
      ...state,
      filters: {
        ...state.filters,
        device: action.payload.device,
      },
    }
  }

  if (action.type === types.KeywordsSetFiltersSource) {
    return {
      ...state,
      filters: {
        ...state.filters,
        source: action.payload.source,
      },
    }
  }

  if (action.type === types.KeywordsSelectedKeywordsToCreateRemoveKeyword) {
    const selectedKeywords = new Set(state.selectedKeywordsToCreate)
    selectedKeywords.delete(action.payload.keyword)

    return {
      ...state,
      selectedKeywordsToCreate: selectedKeywords,
    }
  }

  if (action.type === types.KeywordsReset) {
    return { ...initialState }
  }

  return state
}
