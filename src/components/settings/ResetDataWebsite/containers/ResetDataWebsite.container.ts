import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  isFetching: false,
  plans: state.payments.plans,
})

const mapDispatch = (dispatch: any) => ({
  onReset: () => {
    dispatch(actions.websites.$openResetConfirmationModale())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
