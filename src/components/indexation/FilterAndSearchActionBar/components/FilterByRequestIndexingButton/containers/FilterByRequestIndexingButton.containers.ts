import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../../redux/actions"
import { RootState } from "../../../../../../redux/store"

const mapState = (state: RootState) => ({
  active: !state.indexation.filter.panel.isOpen,
})

const mapDispatch = (dispatch: any) => ({
  onClick() {
    dispatch(actions.indexation.ToggleFilterPanel())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
