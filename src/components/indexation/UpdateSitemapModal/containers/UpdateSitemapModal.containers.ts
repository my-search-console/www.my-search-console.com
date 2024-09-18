import { connect, ConnectedProps } from "react-redux"
import { SitemapEntity } from "../../../../entities/SitemapEntity"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  sitemap: state.websites.addSitemap.value,
  sitemaps: state.websites.addSitemap.sitemaps,
  fetching: state.websites.addSitemap.isFetching,
  isOpen: state.websites.addSitemap.isOpen,
})

const mapDispatch = (dispatch: any) => ({
  onChange: (sitemap: string) => {
    dispatch(actions.websites.updateSitemap({ value: sitemap }))
  },
  onSubmit: () => {
    dispatch(actions.websites.$saveSitemap())
  },
  onClose: () => {
    dispatch(actions.websites.setOpenSitemapModal({ value: false }))
  },
  onDelete: (id: SitemapEntity["id"]) => {
    dispatch(actions.websites.$SitemapsDelete({ id: id }))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
