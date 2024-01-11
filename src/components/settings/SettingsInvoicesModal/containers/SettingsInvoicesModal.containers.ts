import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState, props: { uniqueChartId?: string }) => ({
  isOpen: state.payments.invoices.modal.isOpen,
  invoices: state.payments.invoices.invoices,
  isFetching: state.payments.isLoading,
})

const mapDispatch = (dispatch: any) => ({
  onOpenModal: () => dispatch(actions.payments.PaymentsOpenInvoicesModal(true)),
  onCloseModal: () =>
    dispatch(actions.payments.PaymentsOpenInvoicesModal(false)),
  onFetchInvoices: () => dispatch(actions.payments.$PaymentsFetchInvoices()),
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
