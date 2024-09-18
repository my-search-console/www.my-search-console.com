import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (
  state: RootState,
  props: {
    readonly?: boolean
  }
) => ({
  authenticated: state.auth.authenticated,
  plan: state.payments.actualIndexationPlan,
  isPremium: state.payments.plans.size > 0,
  readonly: props.readonly,
})

const mapDispatch = (dispatch: any) => ({
  onOpenPremiumModal: (params: { isUpsell: boolean }) =>
    dispatch(
      actions.payments.$PaymentsOpenModal({
        value: true,
        type: "indexation",
        source: "navbar",
        isUpsell: params.isUpsell,
      })
    ),
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
