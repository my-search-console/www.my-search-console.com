import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  isOpen: state.analytics.histogramModal.isOpen,
  isFetching: state.analytics.histogramModal.isFetching,
  stats: state.analytics.histogramModal.stats,
  type: state.analytics.histogramModal.type,
})

const mapDispatch = (dispatch: any) => ({
  onClose: () => {
    dispatch(actions.analytics.RankingHistogramModalSetToggle({ value: false }))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
