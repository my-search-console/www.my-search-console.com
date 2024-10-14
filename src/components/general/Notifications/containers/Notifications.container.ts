import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  notifications: state.notifications.notifications,
})

const mapDispatch = (dispatch: any) => ({
  onRemove: (id: number) => dispatch(actions.notifications.remove({ id })),
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
