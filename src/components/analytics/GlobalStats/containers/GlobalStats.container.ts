import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  stats: state.analytics.stats.global,
  selected: state.analytics.orderBy,
  isFetching: state.analytics.isFetching,
})

const mapDispatch = (dispatch: any) => ({
  onClick: (
    type: "clicks" | "impressions" | "position" | "click_through_rate"
  ) => {
    dispatch(actions.analytics.$RankingStoreOrderBy(type))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
