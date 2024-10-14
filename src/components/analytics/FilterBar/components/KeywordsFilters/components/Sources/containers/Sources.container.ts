import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../../../../redux/actions"
import { RootState } from "../../../../../../../../redux/store"

const mapState = (state: RootState) => ({
  fetching: state.websites.fetching,
  active: state.keywords.filters.source,
  bingActivated: Boolean(
    state.websites.map.get(state.websites.activeWebsite || "")?.bing_domain
  ),
  yandexActivated: Boolean(
    state.websites.map.get(state.websites.activeWebsite || "")?.yandex_domain
  ),
})

const mapDispatch = (dispatch: any) => ({
  onChange: (params: { source: "google" | "bing" | "yandex" | null }) => {
    dispatch(actions.keywords.$KeywordsSetFiltersSource(params))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
