import { connect, ConnectedProps } from "react-redux"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  user: state.auth.user,
})

const mapDispatch = {}

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
