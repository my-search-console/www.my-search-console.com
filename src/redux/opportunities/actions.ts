import { PaymentPlansEntity } from "@foudroyer/interfaces/dist/entities/PaymentEntity"
import { ThunkAction } from "redux-thunk"
import { getWebsiteIdFromUrl } from "../../utils/getWebsiteIdFromUrl"
import { actions } from "../actions"
import { RootState } from "../store"
import * as types from "./types"

export const OpportunitiesStoreOpportunities = (
  payload: types.OpportunitiesStoreOpportunitiesAction["payload"]
): types.OpportunitiesActionTypes => ({
  type: types.OpportunitiesStoreOpportunities,
  payload,
})

export const OpportunitiesSetIsFetching = (
  payload: types.OpportunitiesSetIsFetchingAction["payload"]
): types.OpportunitiesActionTypes => ({
  type: types.OpportunitiesSetIsFetching,
  payload,
})

const showPaywall = (props: {
  signupDate: Date
  plans: Set<PaymentPlansEntity>
}) => {
  return false
}

export const $fetchOpportunities =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { di, websites, payments, auth } = getState()
    const { feature } = getWebsiteIdFromUrl(di.LocationService.getFullUrl())

    if (feature !== "opportunities") {
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

    dispatch(OpportunitiesSetIsFetching({ value: true }))

    const res = await di.OpportunitiesRepository.fetch({
      website: websiteId,
    })

    if (res.error) {
      return dispatch(
        actions.notifications.create({
          type: "error",
          message: res.code,
        })
      )
    }

    dispatch(OpportunitiesSetIsFetching({ value: false }))

    dispatch(OpportunitiesStoreOpportunities({ opportunities: res.body }))
  }
