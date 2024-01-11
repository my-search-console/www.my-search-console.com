import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  stats: state.spread.stats,
  orderBy: state.ranking.orderBy,
  isFetching: state.spread.isFetching,
  isRealUserData: state.spread.isRealUserData,
})

const mapDispatch = (dispatch: any) => ({
  onMount: () => {},
  onShow: () => {
    dispatch(actions.spread.$fetchRealData())
  },
  onFilter: (date: string) => {
    // dispatch(actions.ranking.$RankingSetOneDayDate({ date }))
  },
  onDownload: () => {
    dispatch(actions.spread.$download())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
