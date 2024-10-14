import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => {
  return {
    isPublic: Boolean(state.websites.website?.is_public),
    websiteId: state.websites.website?.id || "",
  }
}

const mapDispatch = (dispatch: any) => ({
  onToggle() {
    dispatch(actions.websites.$WebsiteIsPublicToggle())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
