import { PaymentPlansEntity } from "@foudroyer/interfaces"
import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"
import { getCrispUrl } from "../../../../utils/crisp"

const mapState = (state: RootState) => ({
  source: state.payments.modal.source,
  type: PaymentPlansEntity.indexation,
  products: state.payments.products,
  actualPlan: state.payments.actualAnalyticsPlan,
})

const mapDispatch = (dispatch: any) => ({
  onTry: () => {
    dispatch(actions.payments.PaymentsOpenModal({ value: false }))
  },
  onSubscribe: (plan: PaymentPlansEntity, interval: "monthly" | "yearly") => {
    dispatch(actions.payments.$pay({ plan, interval }))
  },
  onSupport: () => {
    window.open(getCrispUrl(), "_blank")
  },
  onLoadAdjustedPricing: () => {
    dispatch(actions.payments.$getPricing())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>