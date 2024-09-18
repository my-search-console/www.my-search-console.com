import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  view: state.indexation.view,
})

const mapDispatch = (dispatch: any) => ({
  onChange(view: "indexation" | "auto" | "report") {
    dispatch(actions.indexation.$IndexationSwitchView(view))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
