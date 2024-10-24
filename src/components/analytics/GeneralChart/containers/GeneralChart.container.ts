import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  stats: state.analytics.stats,
  orderBy: state.analytics.orderBy,
  isFetching: state.analytics.isFetching,
})

const mapDispatch = (dispatch: any) => ({
  onMount: () => {},
  onFilter: (date: string) => {
    dispatch(actions.analytics.$RankingSetOneDayDate({ date }))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
