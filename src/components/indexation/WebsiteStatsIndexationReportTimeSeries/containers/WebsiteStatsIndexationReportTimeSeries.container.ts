import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState, props: { uniqueChartId?: string }) => ({
  state: state.stats.indexationWebsiteReport.data,
  isFetching: state.stats.indexationWebsiteReport.isFetching,
})

const mapDispatch = (dispatch: any) => ({
  onMount() {
    dispatch(actions.stats.$StatsWebsiteIndexationStateFetch())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
