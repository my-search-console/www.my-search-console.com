import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  payments: state.payments.payments,
})

const mapDispatch = (dispatch: any) => ({
  onPause(params: { why: string }) {
    dispatch(actions.payments.$pause(params))
  },

  onResume() {
    dispatch(actions.payments.$unpause())
  },

  onUnsubscribe(params: { why: string }) {
    dispatch(actions.payments.$unsubscribe(params))
  },

  onClose() {
    dispatch(actions.payments.$UnsubscribeCloseModal())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
