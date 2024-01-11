import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"
import { UserEntity } from "@foudroyer/interfaces"

const mapState = (state: RootState) => ({
  websites: state.websites.createWebsiteModal.domains,
  isOpen: state.websites.createWebsiteModal.isOpen,
  type: state.websites.createWebsiteModal.type,
  isFetching: state.websites.createWebsiteModal.isFetching,
  isGlobalFetching: state.websites.fetching,
  selected: state.websites.createWebsiteModal.selected,
  user: state.auth.user as UserEntity,
})

const mapDispatch = (dispatch: any) => ({
  onClose: () => {
    dispatch(actions.websites.WebsiteAddSourceModalSetIsOpen({ isOpen: false }))
  },
  onSubmit: () => {
    dispatch(actions.websites.$activate())
  },
  onSelect: (value: string) => {
    dispatch(actions.websites.WebsiteAddSourceModalSelect({ value }))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
