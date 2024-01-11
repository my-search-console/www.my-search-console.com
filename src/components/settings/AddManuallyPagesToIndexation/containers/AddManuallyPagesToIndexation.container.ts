import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  value: state.indexation.addManuallyPages.value,
  isFetching: state.indexation.addManuallyPages.isFetching,
})

const mapDispatch = (dispatch: any) => ({
  onChange(value: string) {
    dispatch(actions.indexation.IndexationAddManuallyPagesStoreValue({ value }))
  },
  onSubmit() {
    dispatch(actions.indexation.$IndexationAddManuallySubmit())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
