import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  ladder: state.spread.ladder,
  userId: state.auth.user?.id || null,
  isFetching: state.spread.isFetching,
})

const mapDispatch = (dispatch: any) => ({
  onMount() {
    dispatch(actions.spread.$fetchLadder())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
