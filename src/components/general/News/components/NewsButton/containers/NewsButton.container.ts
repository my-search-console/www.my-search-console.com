import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../../redux/actions"
import { RootState } from "../../../../../../redux/store"

const mapState = (state: RootState) => ({
  lastTimeOpenNewsModal: state.modal.lastTimeOpenNewsModal,
})

const mapDispatch = (dispatch: any) => ({
  onMount() {
    dispatch(actions.modal.$NewsFetchLastTimeSeenModal())
  },
  onClick() {
    dispatch(actions.modal.$openNewsModal())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
