import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  stats: state.ranking.stats,
  orderBy: state.ranking.orderBy,
  isFetching: state.ranking.isFetching,
})

const mapDispatch = (dispatch: any) => ({
  onMount: () => {},
  onFilter: (date: string) => {
    dispatch(actions.ranking.$RankingSetOneDayDate({ date }))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
