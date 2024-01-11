import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"
import { IndexationType } from "@foudroyer/interfaces"

const mapState = (state: RootState) => ({
  show: state.indexation.filter.panel.isOpen,
  from: state.indexation.filter.panel.fields.from,
  to: state.indexation.filter.panel.fields.to,
  searchValue: state.indexation.filter.panel.fields.search_value,
  searchRule: state.indexation.filter.panel.fields.search_rule,
  indexationState: state.indexation.filter.panel.fields.indexation_state,
  showIndexedPages: state.indexation.filter.panel.fields.show_indexed_pages,
  length: state.indexation.pagination.total,
  fetching: state.indexation.fetching
})

const mapDispatch = (dispatch: any) => ({
  onClose: () => {
    dispatch(actions.indexation.ToggleFilterPanel())
  },
  onChangeFrom: (value: Date | null) => {
    dispatch(actions.indexation.filter.fields.update({ type: "from", value }))
  },
  onChangeTo: (value: Date | null) => {
    dispatch(actions.indexation.filter.fields.update({ type: "to", value }))
  },
  onChangeSort: (value: "asc" | "desc") => {
    dispatch(actions.indexation.filter.fields.update({ type: "sort", value }))
  },
  onChangeSearchRule: (
    value: "contains" | "not-contains" | "ends_with" | "starts_with"
  ) => {
    dispatch(
      actions.indexation.filter.fields.update({ type: "search_rule", value })
    )
  },
  onChangeSearchValue: (value: string) => {
    dispatch(
      actions.indexation.filter.fields.update({ type: "search_value", value })
    )
  },
  onChangeIndexationState: (value: IndexationType | null) => {
    dispatch(
      actions.indexation.filter.fields.update({
        type: "indexation_state",
        value,
      })
    )
  },
  onChangeShowIndexedPages: (value: boolean) => {
    dispatch(
      actions.indexation.filter.fields.update({
        type: "show_indexed_pages",
        value,
      })
    )
  },
  onSave: () => {
    dispatch(actions.indexation.filter.fields.$apply())
  },
  onIndexAll: () => {
    dispatch(actions.indexation.$indexAll())
  },
  onReset: () => {
    dispatch(actions.indexation.filter.fields.$reset())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
