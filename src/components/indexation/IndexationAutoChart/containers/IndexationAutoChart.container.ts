import { connect, ConnectedProps } from "react-redux"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  graph: state.indexation.indexationAuto.graph,
  isFetching: state.indexation.fetching,
  noTotalFromQueue: state.indexation.indexationAuto.stats.total === 0,
})

const mapDispatch = (dispatch: any) => ({})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
