import { RankingStatEntity } from "../../entities/RankingWebsiteEntity"

export const KeywordsStoreKeywords = "KeywordsStoreKeywords"
export interface KeywordsStoreKeywordsAction {
  type: typeof KeywordsStoreKeywords
  payload: {
    keywords: RankingStatEntity[]
  }
}

export const KeywordsSetIsFetching = "KeywordsSetIsFetching"
export interface KeywordsSetIsFetchingAction {
  type: typeof KeywordsSetIsFetching
  payload: {
    value: boolean
  }
}

export const KeywordsSetSelectedKeywords = "KeywordsSetSelectedKeywords"
export interface KeywordsSetSelectedKeywordsAction {
  type: typeof KeywordsSetSelectedKeywords
  payload: {
    keyword: string
  }
}

export const KeywordsSetSelectedKeywordsToCreate =
  "KeywordsSetSelectedKeywordsToCreate"
export interface KeywordsSetSelectedKeywordsToCreateAction {
  type: typeof KeywordsSetSelectedKeywordsToCreate
  payload: {
    keyword: string
  }
}

export const KeywordsSetAddKeywordsModalIsOpen =
  "KeywordsSetAddKeywordsModalIsOpen"
export interface KeywordsSetAddKeywordsModalIsOpenAction {
  type: typeof KeywordsSetAddKeywordsModalIsOpen
  payload: {
    value: boolean
  }
}

export const KeywordsSetAddKeywordsModalInput =
  "KeywordsSetAddKeywordsModalInput"
export interface KeywordsSetAddKeywordsModalInputAction {
  type: typeof KeywordsSetAddKeywordsModalInput
  payload: {
    value: string
  }
}

export const KeywordsStoreInputToKeywords = "KeywordsStoreInputToKeywords"
export interface KeywordsStoreInputToKeywordsAction {
  type: typeof KeywordsStoreInputToKeywords
}

export const KeywordsRemoveAllKeywordsForCreate =
  "KeywordsRemoveAllKeywordsForCreate"
export interface KeywordsRemoveAllKeywordsForCreateAction {
  type: typeof KeywordsRemoveAllKeywordsForCreate
}

export const KeywordsRemoveAllKeywordsForDelete =
  "KeywordsRemoveAllKeywordsForDelete"
export interface KeywordsRemoveAllKeywordsForDeleteAction {
  type: typeof KeywordsRemoveAllKeywordsForDelete
}

export const KeywordsReset = "KeywordsReset"
export interface KeywordsResetAction {
  type: typeof KeywordsReset
}

export const KeywordsSetFiltersCountry = "KeywordsSetFiltersCountry"
export interface KeywordsSetFiltersCountryAction {
  type: typeof KeywordsSetFiltersCountry
  payload: {
    country: string
  }
}

export const KeywordsSetFiltersDevice = "KeywordsSetFiltersDevice"
export interface KeywordsSetFiltersDeviceAction {
  type: typeof KeywordsSetFiltersDevice
  payload: {
    device: "desktop" | "mobile" | "tablet" | null
  }
}

export const KeywordsSetFiltersSource = "KeywordsSetFiltersSource"
export interface KeywordsSetFiltersSourceAction {
  type: typeof KeywordsSetFiltersSource
  payload: {
    source: "google" | "bing" | "yandex" | null
  }
}

export const KeywordsSelectedKeywordsToCreateRemoveKeyword =
  "KeywordsSelectedKeywordsToCreateRemoveKeyword"
export interface KeywordsSelectedKeywordsToCreateRemoveKeywordAction {
  type: typeof KeywordsSelectedKeywordsToCreateRemoveKeyword
  payload: {
    keyword: string
  }
}

export type KeywordsActionTypes =
  | KeywordsStoreKeywordsAction
  | KeywordsSetIsFetchingAction
  | KeywordsSetSelectedKeywordsAction
  | KeywordsSetSelectedKeywordsToCreateAction
  | KeywordsSetAddKeywordsModalIsOpenAction
  | KeywordsSetAddKeywordsModalInputAction
  | KeywordsStoreInputToKeywordsAction
  | KeywordsRemoveAllKeywordsForCreateAction
  | KeywordsRemoveAllKeywordsForDeleteAction
  | KeywordsResetAction
  | KeywordsSetFiltersCountryAction
  | KeywordsSetFiltersDeviceAction
  | KeywordsSetFiltersSourceAction
  | KeywordsSelectedKeywordsToCreateRemoveKeywordAction
