import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  interval: state.payments.upsellConfirmationModal.interval,
  plan: state.payments.upsellConfirmationModal.plan,
  actualPlan: state.payments.actualIndexationPlan,
  products: state.payments.products,
})

const mapDispatch = (dispatch: any) => ({
  onClose: () => {
    dispatch(
      actions.payments.$PaymentsUpsellConfirmationOpenModal({ isOpen: false })
    )
  },
  onConfirm: () => {
    dispatch(
      actions.payments.$Upsell({
        redirect: false,
      })
    )
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
