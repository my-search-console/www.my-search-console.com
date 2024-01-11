import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../../redux/actions"
import { RootState } from "../../../../../../redux/store"

const mapState = (state: RootState) => ({
  stats: state.indexation.indexationReport.stats,
  isFetching: state.indexation.fetching,
  isIndexed: state.indexation.indexationReport.filter.isIndexed,
})

const mapDispatch = (dispatch: any) => ({
  onFilter: (isIndexed: boolean | null) => {
    dispatch(actions.indexation.$IndexationReportFilter({ status: isIndexed }))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
