import {
  NotificationEntity,
  NotificationMessageEntity,
} from "./../../entities/NotificationEntity"
import * as types from "./types"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"
import { actions } from "../actions"
import { getWebsiteIdFromUrl } from "../../utils/getWebsiteIdFromUrl"
import { PaymentPlansEntity } from "@foudroyer/interfaces/dist/entities/PaymentEntity"

export const KeywordsStoreKeywords = (
  payload: types.KeywordsStoreKeywordsAction["payload"]
): types.KeywordsActionTypes => ({
  type: types.KeywordsStoreKeywords,
  payload,
})

export const KeywordsSetIsFetching = (
  payload: types.KeywordsSetIsFetchingAction["payload"]
): types.KeywordsActionTypes => ({
  type: types.KeywordsSetIsFetching,
  payload,
})

export const KeywordsSetSelectedKeywords = (
  payload: types.KeywordsSetSelectedKeywordsAction["payload"]
): types.KeywordsActionTypes => ({
  type: types.KeywordsSetSelectedKeywords,
  payload,
})

export const KeywordsSetSelectedKeywordsToCreate = (
  payload: types.KeywordsSetSelectedKeywordsToCreateAction["payload"]
): types.KeywordsActionTypes => ({
  type: types.KeywordsSetSelectedKeywordsToCreate,
  payload,
})

export const KeywordsSelectedKeywordsToCreateRemoveKeyword = (
  payload: types.KeywordsSelectedKeywordsToCreateRemoveKeywordAction["payload"]
): types.KeywordsActionTypes => ({
  type: types.KeywordsSelectedKeywordsToCreateRemoveKeyword,
  payload,
})

export const KeywordsSetAddKeywordsModalIsOpen = (
  payload: types.KeywordsSetAddKeywordsModalIsOpenAction["payload"]
): types.KeywordsActionTypes => ({
  type: types.KeywordsSetAddKeywordsModalIsOpen,
  payload,
})

export const KeywordsSetAddKeywordsModalInput = (
  payload: types.KeywordsSetAddKeywordsModalInputAction["payload"]
): types.KeywordsActionTypes => ({
  type: types.KeywordsSetAddKeywordsModalInput,
  payload,
})

export const KeywordsStoreInputToKeywords = (): types.KeywordsActionTypes => ({
  type: types.KeywordsStoreInputToKeywords,
})

export const KeywordsRemoveAllKeywordsForCreate =
  (): types.KeywordsActionTypes => ({
    type: types.KeywordsRemoveAllKeywordsForCreate,
  })

export const KeywordsRemoveAllKeywordsForDelete =
  (): types.KeywordsActionTypes => ({
    type: types.KeywordsRemoveAllKeywordsForDelete,
  })

export const KeywordsSetFiltersCountry = (
  payload: types.KeywordsSetFiltersCountryAction["payload"]
): types.KeywordsActionTypes => ({
  type: types.KeywordsSetFiltersCountry,
  payload,
})

export const KeywordsSetFiltersDevice = (
  payload: types.KeywordsSetFiltersDeviceAction["payload"]
): types.KeywordsActionTypes => ({
  type: types.KeywordsSetFiltersDevice,
  payload,
})

export const $KeywordsSetFiltersDevice =
  (
    payload: types.KeywordsSetFiltersDeviceAction["payload"]
  ): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    dispatch(KeywordsSetFiltersDevice(payload))
    await dispatch($fetchKeywords())
  }

export const KeywordsSetFiltersSource = (
  payload: types.KeywordsSetFiltersSourceAction["payload"]
): types.KeywordsActionTypes => ({
  type: types.KeywordsSetFiltersSource,
  payload,
})

export const $KeywordsSetFiltersSource =
  (
    payload: types.KeywordsSetFiltersSourceAction["payload"]
  ): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    dispatch(KeywordsSetFiltersSource(payload))
    await dispatch($fetchKeywords())
  }

export const $KeywordsSetFiltersCountry =
  (
    payload: types.KeywordsSetFiltersCountryAction["payload"]
  ): ThunkAction<any, RootState, any, any> =>
  async (dispatch, getState) => {
    dispatch(KeywordsSetFiltersCountry(payload))
    await dispatch($fetchKeywords())
  }

export const KeywordsReset = (): types.KeywordsActionTypes => ({
  type: types.KeywordsReset,
})

const showPaywall = (props: {
  signupDate: Date
  plans: Set<PaymentPlansEntity>
}) => {
  const { signupDate, plans } = props
  // true if signed up more that 3 days ago
  const signedUpMoreThan3DaysAgo = Boolean(
    signupDate &&
      new Date(signupDate) <
        new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000)
  )

  return plans.size === 0 && signedUpMoreThan3DaysAgo
}

export const $fetchKeywords =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { di, websites, keywords, payments, auth } = getState()
    const { feature } = getWebsiteIdFromUrl(di.LocationService.getFullUrl())

    if (feature !== "keywords") {
      return
    }

    if (
      showPaywall({
        signupDate: auth.user?.created_at || new Date(),
        plans: payments.plans,
      })
    ) {
      return dispatch(
        actions.payments.$PaymentsOpenModal({
          value: true,
          type: PaymentPlansEntity.indexation,
          source: "indexation/trial-expired",
          isClosable: false,
        })
      )
    }

    const websiteId = websites.activeWebsite

    if (!websiteId) {
      throw new Error("No websiteId provided")
    }

    dispatch(KeywordsSetIsFetching({ value: true }))

    const res = await di.KeywordsRepository.fetch({
      website: websiteId,
      filter: {
        country: keywords.filters.country,
        device: keywords.filters.device,
        source: keywords.filters.source,
      },
    })

    dispatch(KeywordsSetIsFetching({ value: false }))

    if (res.error) {
      return dispatch(
        actions.notifications.create({
          type: "error",
          message: res.code,
        })
      )
    }

    dispatch(KeywordsStoreKeywords({ keywords: res.body }))
  }

export const $create =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { di, keywords, websites } = getState()
    const websiteId = websites.activeWebsite

    if (!websiteId) {
      throw new Error("No websiteId provided")
    }

    if (keywords.selectedKeywordsToCreate.size === 0) {
      return dispatch(
        actions.notifications.create({
          type: "error",
          message: NotificationMessageEntity.WEBSITES_SITEMAP_UPDATE_EMPTY,
        })
      )
    }

    dispatch(KeywordsSetIsFetching({ value: true }))

    const res = await di.KeywordsRepository.create({
      websiteId: websiteId,
      keywords: Array.from(keywords.selectedKeywordsToCreate.values()),
    })

    dispatch(KeywordsSetIsFetching({ value: false }))

    if (res.error) {
      return dispatch(
        actions.notifications.create({
          type: "error",
          message: res.code,
        })
      )
    }

    dispatch(KeywordsRemoveAllKeywordsForCreate())
    dispatch(KeywordsSetAddKeywordsModalIsOpen({ value: false }))

    dispatch(
      actions.notifications.create({
        type: "success",
        message: NotificationMessageEntity.KEYWORDS_ADD_SUCCESS,
      })
    )

    dispatch($fetchKeywords())
  }

export const $delete =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { di, keywords, websites } = getState()

    const websiteId = websites.activeWebsite

    if (!websiteId) {
      throw new Error("No websiteId provided")
    }

    if (keywords.selectedKeywordsToDelete.size === 0) {
      return dispatch(
        actions.notifications.create({
          type: "error",
          message: NotificationMessageEntity.WEBSITES_SITEMAP_UPDATE_EMPTY,
        })
      )
    }

    dispatch(KeywordsSetIsFetching({ value: true }))

    const res = await di.KeywordsRepository.delete({
      websiteId: websiteId,
      keywords: Array.from(keywords.selectedKeywordsToDelete.values()),
    })

    dispatch(KeywordsRemoveAllKeywordsForDelete())

    dispatch(KeywordsSetIsFetching({ value: false }))

    if (res.error) {
      return dispatch(
        actions.notifications.create({
          type: "error",
          message: res.code,
        })
      )
    }

    dispatch($fetchKeywords())
  }
