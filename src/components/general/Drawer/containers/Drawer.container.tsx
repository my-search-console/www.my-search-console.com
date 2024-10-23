import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  user: state.auth.user,
  websiteId: state.websites.activeWebsite,
})

const mapDispatch = (dispatch: any) => ({
  onLoginWithGoogle: () => dispatch(actions.auth.$goToAuthentication()),
  onLogout: () => dispatch(actions.auth.$logout()),
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
