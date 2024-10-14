import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  isOpen: state.ranking.histogramModal.isOpen,
  isFetching: state.ranking.histogramModal.isFetching,
  stats: state.ranking.histogramModal.stats,
  type: state.ranking.histogramModal.type,
})

const mapDispatch = (dispatch: any) => ({
  onClose: () => {
    dispatch(actions.ranking.RankingHistogramModalSetToggle({ value: false }))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
