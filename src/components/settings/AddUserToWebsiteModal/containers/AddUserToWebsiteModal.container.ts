import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  plan: state.payments.actualIndexationPlan,
})

const mapDispatch = (dispatch: any) => ({
  onClose: () => dispatch(actions.websites.$WebsitesCloseAddUsersModal()),
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
