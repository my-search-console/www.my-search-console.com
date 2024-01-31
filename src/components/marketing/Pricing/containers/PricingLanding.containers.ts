import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"
import { PaymentPlansEntity } from "@my-search-console/interfaces"

const mapState = (state: RootState) => ({
  source: state.payments.modal.source,
  type: PaymentPlansEntity.starter,
  products: state.payments.products,
})

const mapDispatch = (dispatch: any) => ({
  onTry: () => {
    dispatch(actions.auth.$authenticateWithGoogle())
  },
  onSubscribe: (plan: PaymentPlansEntity, interval: "monthly" | "yearly") => {
    dispatch(actions.websites.$openPaymentModal(plan, interval))
  },
  onSupport: () => {
    window.open(
      `https://go.crisp.chat/chat/embed/?website_id=b5235ee2-e9d5-4d06-9c92-488f64e57c8d`,
      "_blank"
    )
  },
  onLoadAdjustedPricing: () => {
    dispatch(actions.payments.$getPricing())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
