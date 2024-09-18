import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  fetching: state.websites.fetching,
})

const mapDispatch = (dispatch: any) => ({
  onConfirm() {
    dispatch(actions.websites.$resetWebsite())
  },

  onClose() {
    dispatch(actions.websites.$closeResetConfirmationModale())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
