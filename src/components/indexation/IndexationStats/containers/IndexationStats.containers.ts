import { PageEntity } from "@my-search-console/interfaces"
import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  filterIndexationState: state.indexation.filter.panel.applied.indexation_state,
  stats: state.indexation.stats,
  isFetching: state.indexation.fetching,
})

const mapDispatch = (dispatch: any) => ({
  onToggleFilter: (type: PageEntity["indexation_state"] | null) => {
    dispatch(actions.indexation.$toggleFilter(type))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
