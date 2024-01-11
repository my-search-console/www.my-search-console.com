import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  value: state.indexation.filter.panel.fields.search_value,
})

const mapDispatch = (dispatch: any) => ({
  onChange: (name: string) => {
    dispatch(
      actions.indexation.filter.fields.update({
        type: "search_value",
        value: name,
      })
    )
  },
  onSearch: () => {
    dispatch(actions.indexation.filter.fields.$apply())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
