import { connect, ConnectedProps } from "react-redux"
import { RootState } from "../../../../../../redux/store"
import { actions } from "../../../../../../redux/actions"

const mapState = (state: RootState) => ({})

const mapDispatch = (dispatch: any) => ({
  onClick() {
    dispatch(actions.modal.$openNewsModal())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
