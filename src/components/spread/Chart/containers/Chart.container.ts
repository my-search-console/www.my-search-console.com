import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  stats: state.spread.stats,
  orderBy: state.analytics.orderBy,
  isFetching: state.spread.isFetching,
  isRealUserData: state.spread.isRealUserData,
  type: state.spread.type,
  websites: state.spread.websites,
  dimensions: state.analytics.dimensions,
})

const mapDispatch = (dispatch: any) => ({
  onMount: () => {},
  onShow: () => {
    dispatch(actions.spread.$fetchOrConnect())
  },
  onDownload: () => {
    dispatch(actions.spread.$download())
  },
  onFilter(params: { from: string; to: string }) {
    dispatch(actions.spread.$SubmitCalendar(params))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
