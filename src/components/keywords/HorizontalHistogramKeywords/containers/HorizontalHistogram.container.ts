import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  stats: state.keywords.keywords,
  isFetching: state.keywords.isFetching,
  showTrash: state.keywords.selectedKeywordsToDelete.size > 0,
})

const mapDispatch = (dispatch: any) => ({
  onCreateKeyword() {
    return dispatch(
      actions.keywords.KeywordsSetAddKeywordsModalIsOpen({ value: true })
    )
  },
  onDelete() {
    return dispatch(actions.keywords.$delete())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
