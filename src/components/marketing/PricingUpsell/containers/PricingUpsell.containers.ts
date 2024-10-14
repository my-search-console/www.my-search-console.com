import { PaymentPlansEntity } from "@foudroyer/interfaces"
import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  source: state.payments.modal.source,
  authenticated: state.auth.authenticated,
  plans: state.payments.plans,
  interval: state.payments?.payments[0]?.interval || "monthly",
  products: state.payments.products,
})

const mapDispatch = (dispatch: any) => ({
  onSubscribe: (params: {
    plan: PaymentPlansEntity
    interval: "monthly" | "yearly"
  }) => {
    dispatch(
      actions.payments.$Upsell({
        plan: params.plan,
        interval: params.interval,
        redirect: true,
      })
    )
  },
  onLoadAdjustedPricing: () => {
    dispatch(actions.payments.$getPricing())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
