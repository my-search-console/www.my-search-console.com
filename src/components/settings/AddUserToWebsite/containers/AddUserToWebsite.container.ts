import { WebsiteEntity } from "@foudroyer/interfaces"
import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  users: state.websites.users,
  website: state.websites.website,
})

const mapDispatch = (dispatch: any) => ({
  onMount() {
    dispatch(actions.websites.$fetchUsersWithRightsOnThisWebsite())
  },
  onClick: (website: WebsiteEntity | null) => {
    dispatch(actions.websites.setCredentialsIsOpen({ value: true, website }))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
