import { WebsiteEntity } from "@my-search-console/interfaces"
import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../../redux/actions"
import { RootState } from "../../../../../../redux/store"

const mapState = (state: RootState, props: { readonly?: boolean }) => ({
  websites: state.websites.entities.map((id) =>
    state.websites.map.get(id)
  ) as WebsiteEntity[],
  fetching: state.websites.fetching,
  active: state.websites.map.get(state.websites.activeWebsite || "") || null,
})

const mapDispatch = (dispatch: any) => ({
  onMount() {
    dispatch(actions.websites.$syncWebsiteAndCheckEverything())
  },
  onChangeWebsite(params: { websiteId: string }) {
    dispatch(actions.websites.$changeWebsite(params))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
