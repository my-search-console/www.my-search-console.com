import { WebsiteEntity } from "@foudroyer/interfaces"
import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  value: state.websites.addCredentials.value,
  fetching: state.websites.addCredentials.isFetching,
  isOpen: state.websites.addCredentials.isOpen,
  keys: state.websites.addCredentials.website?.google_api_keys || [],
  plans: state.payments.plans,
  website: state.websites.addCredentials.website,
})

const mapDispatch = (dispatch: any) => ({
  onChange: (value: string) => {
    dispatch(actions.websites.updateCredentials({ value: value }))
  },
  onSubmit: (website: WebsiteEntity | null) => {
    dispatch(actions.websites.$saveCredentials(website))
  },
  onClose: () => {
    dispatch(
      actions.websites.setCredentialsIsOpen({ value: false, website: null })
    )
  },
  onRefresh: (id: string) => {
    dispatch(actions.indexation.$IndexationRefreshGoogleApiKey(id))
  },
  onDownload: (google_cloud_api_key: string) => {
    dispatch(
      actions.indexation.$IndexationDownloadGoogleApiKey({
        google_cloud_api_key,
      })
    )
  },
  onDelete: (params: { keyId: string; website: WebsiteEntity | null }) => {
    dispatch(actions.websites.$WebsiteRemoveGoogleApiKey(params))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
