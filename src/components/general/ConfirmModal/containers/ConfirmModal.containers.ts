import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({})

const mapDispatch = (dispatch: any) => ({
  onClose: () => {
    dispatch(actions.websites.$DeleteConfirmModalClose())
  },
  onConfirm(websiteId: string) {
    dispatch(actions.websites.$deleteWebsite(websiteId))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
