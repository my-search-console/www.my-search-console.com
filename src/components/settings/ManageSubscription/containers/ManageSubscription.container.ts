import { PaymentPlansEntity } from "@my-search-console/interfaces"
import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  payments: state.payments.payments,
  isYearly: false,
  isLoading: state.payments.isLoading,
})

const mapDispatch = (dispatch: any) => ({
  onOpenInvoicesModal: () => {
    dispatch(actions.payments.PaymentsOpenInvoicesModal(true))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
