import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../../redux/actions"
import { RootState } from "../../../../../../redux/store"
import {
  PaymentPlansEntity,
  WebsiteEntity,
} from "@my-search-console/interfaces"

const mapState = (state: RootState, props: { readonly?: boolean }) => ({
  isPremium: Boolean(
    state.websites.map.get(state.websites.activeWebsite ?? "")?.is_premium
  ),
  websites: state.websites.entities.map((id) =>
    state.websites.map.get(id)
  ) as WebsiteEntity[],
  fetching: state.websites.fetching,
  active: state.websites.map.get(state.websites.activeWebsite || "") || null,
  readonly: props.readonly || false,
  plans: state.payments.plans,
})

const mapDispatch = (dispatch: any) => ({
  onMount() {
    dispatch(actions.websites.$syncWebsiteAndCheckEverything())
  },
  onChangeWebsite(params: { websiteId: string }) {
    dispatch(actions.websites.$changeWebsite(params))
  },
  onCreateWebsite() {
    dispatch(actions.websites.$WebsiteCreateModal())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
