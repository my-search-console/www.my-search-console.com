import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  websites: state.websites.createWebsiteModal.domains,
  fetching: state.websites.fetching,
})

const mapDispatch = (dispatch: any) => ({
  onMount: () => {
    dispatch(actions.websites.$CreateWebsiteFetchGoogleDomains())
  },
  onAdd: (params: { id: string }) => {
    dispatch(actions.websites.$CreateWebsite(params))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
