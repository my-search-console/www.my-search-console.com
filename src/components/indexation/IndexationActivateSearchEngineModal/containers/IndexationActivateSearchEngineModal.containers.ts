import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  isOpen: state.indexation.searchEngineModal.isOpen,
  lang: state.lang.lang,
  user: state.auth.user,
})

const mapDispatch = (dispatch: any) => ({
  onClose: () => {
    dispatch(
      actions.indexation.IndexationToggleSearchEngineModal({ value: false })
    )
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
