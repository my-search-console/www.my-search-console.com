import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../../redux/actions"
import { RootState } from "../../../../../../redux/store"

const mapState = (state: RootState) => ({
  users: state.websites.users,
})

const mapDispatch = (dispatch: any) => ({
  onMount: () => {
    dispatch(actions.websites.$fetchUsersWithRightsOnThisWebsite())
  },
  onDelete: (email: string) => {
    dispatch(actions.websites.$removeUserOnThisWebsite({ email }))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
