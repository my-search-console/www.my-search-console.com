import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../../redux/actions"
import { RootState } from "../../../../../../redux/store"

const mapState = (state: RootState) => ({
  length: state.indexation.pagination.total,
  fetching: state.indexation.fetching,
  view: state.indexation.view,
  isFilterApplied:
    state.indexation.filter.panel.applied.indexation_state !== null ||
    state.indexation.filter.panel.applied.search_value !== null,
})

const mapDispatch = (dispatch: any) => ({
  onIndexAll: () => {
    dispatch(actions.indexation.$indexAll())
  },
  onCheckAll: () => {
    dispatch(actions.indexation.$checkAll())
  },
  onToggleView: (view: "auto" | "indexation" | "report") => {
    dispatch(actions.indexation.$IndexationSwitchView(view))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
