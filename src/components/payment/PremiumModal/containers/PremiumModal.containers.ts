import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"
import { PaymentPlansEntity } from "@foudroyer/interfaces"

const mapState = (state: RootState, props: { type?: PaymentPlansEntity }) => ({
  isOpen: state.payments.modal.isOpen,
  type: props.type || PaymentPlansEntity.indexation,
  isUpsell: state.payments.modal.isUpsell,
  isClosable: state.payments.modal.isClosable,
  cancellation_effective_date:
    state.payments?.payments[0]?.cancellation_effective_date,
})

const mapDispatch = (dispatch: any) => ({
  onClose: () => {
    dispatch(actions.payments.PaymentsOpenModal({ value: false }))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
