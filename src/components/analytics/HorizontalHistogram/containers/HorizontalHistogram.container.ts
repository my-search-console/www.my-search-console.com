import { connect, ConnectedProps } from "react-redux"
import { RankingOrderByType } from "../../../../entities/RankingWebsiteEntity"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState, props: { hideActions?: boolean }) => ({
  stats: state.ranking.stats,
  isFetching: state.ranking.isFetching,
  view: state.ranking.histogramView,
  hideActions: props.hideActions,
})

const mapDispatch = (dispatch: any) => ({
  onFilter(params: {
    type: "query" | "country" | "device" | "source" | "date" | "page"
    value: string
  }) {
    dispatch(actions.ranking.$RankingStoreFilter(params))
  },
  onShowMore(props: {
    type: "device" | "query" | "country" | "source" | "page"
  }) {
    dispatch(actions.ranking.$openAndfetchByHistogram(props))
  },
  onChangeView(view: RankingOrderByType) {
    dispatch(actions.ranking.RankingSetHistogramView({ value: view }))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
