import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  stats: state.spread.stats,
  orderBy: state.ranking.orderBy,
  isFetching: state.spread.isFetching,
  isRealUserData: state.spread.isRealUserData,
  type: state.spread.type,
})

const mapDispatch = (dispatch: any) => ({
  onMount: () => {
    dispatch(actions.spread.$fetchIfConnected())
  },
  onShow: () => {
    dispatch(actions.spread.$fetchOrConnect())
  },
  onDownload: () => {
    dispatch(actions.spread.$download())
  },
  onFilter() {},
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
