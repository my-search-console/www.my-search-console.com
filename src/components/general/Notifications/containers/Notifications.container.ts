import { connect, ConnectedProps } from "react-redux"
import { RootState } from "../../../../redux/store"
import { actions } from "../../../../redux/actions"

const mapState = (state: RootState) => ({
  notifications: state.notifications.notifications,
})

const mapDispatch = (dispatch: any) => ({
  onRemove: (id: number) => dispatch(actions.notifications.remove({ id })),
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
