import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  isFetching: state.spread.isFetching,
  isRealUserData: state.spread.isRealUserData,
})

const mapDispatch = (dispatch: any) => ({
  onClick: () => {
    dispatch(actions.spread.$fetchOrConnect())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
