import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  stats: state.spread.stats.global,
  selected: state.ranking.orderBy,
  isFetching: state.ranking.isFetching,
})

const mapDispatch = (dispatch: any) => ({
  onClick: (
    type: "clicks" | "impressions" | "position" | "click_through_rate"
  ) => {
    dispatch(actions.spread.$RankingStoreOrderBy(type))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
