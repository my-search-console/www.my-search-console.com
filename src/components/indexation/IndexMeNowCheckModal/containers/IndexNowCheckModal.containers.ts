import { WebsiteEntity } from "@my-search-console/interfaces"
import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  isFetching: state.websites.indexNowCheckModal.isFetching,
  isOpen: state.websites.indexNowCheckModal.isOpen,
  website: state.websites.indexNowCheckModal.website,
})

const mapDispatch = (dispatch: any) => ({
  onClose: () => {
    dispatch(
      actions.websites.WebsiteIndexNowModalSetOpen({
        value: false,
        website: null,
      })
    )
  },
  onCheck: (website: WebsiteEntity | null) => {
    dispatch(actions.websites.$WebsiteIndexNowCheckIfKeyIsInstalled(website))
  },
  onDownload: (website: WebsiteEntity | null) => {
    dispatch(actions.websites.$WebsiteIndexNowDownloadKeyFile(website))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
