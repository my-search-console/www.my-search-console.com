import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (
  state: RootState,
  props: { breadcrumb?: Array<{ url: string; label: string }> }
) => ({
  ...props,
  authenticated: state.auth.authenticated,
  isFetching: state.auth.isFetching,
  user: state.auth.user,
})

const mapDispatch = (dispatch: any) => ({
  onLogin() {
    dispatch(actions.auth.$goToAuthentication())
  },
  onLogout() {
    dispatch(actions.auth.$logout())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
