import { connect, ConnectedProps } from "react-redux"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  signedUpAt: state.auth.user?.created_at,
  plans: state.payments.plans,
})

const mapDispatch = (dispatch: any) => ({})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
