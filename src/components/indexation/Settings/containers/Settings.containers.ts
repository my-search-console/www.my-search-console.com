import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  isOpen: state.indexation.isSettingsOpen,
})

const mapDispatch = (dispatch: any) => ({
  onToggle: () => {
    dispatch(actions.indexation.IndexationSettingsToggle({}))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
