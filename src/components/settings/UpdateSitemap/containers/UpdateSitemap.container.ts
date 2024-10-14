import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState, props: { showLabel?: boolean }) => ({
  sitemapUpdatedAt:
    state.websites.map.get(
      state.websites.activeWebsite ?? state.websites.entities[0]
    )?.sitemap_updated_at || null,

  sitemapUrl:
    state.websites.map.get(
      state.websites.activeWebsite ?? state.websites.entities[0]
    )?.sitemap || null,
  isFetching: state.websites.addSitemap.isFetching,
  showLabel: props.showLabel,
})

const mapDispatch = (dispatch: any) => ({
  onClick: () => {
    dispatch(actions.websites.$openSitemapModal())
  },
  onSyncSitemap: () => {
    dispatch(actions.websites.$refreshSitemapAndIndexation())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
