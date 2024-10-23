import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  isFetching: state.spread.isFetching,
  isAuthenticated: state.auth.authenticated,
})

const mapDispatch = (dispatch: any) => ({
  onClick: () => {
    dispatch(actions.spread.$fetchOrConnect())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
