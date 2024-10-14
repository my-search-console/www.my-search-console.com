import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  showComponent: state.auth.initialised,
})

const mapDispatch = (dispatch: any) => ({
  onMount: () => {
    dispatch(actions.auth.$isAuthenticatedOrRedirect())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
