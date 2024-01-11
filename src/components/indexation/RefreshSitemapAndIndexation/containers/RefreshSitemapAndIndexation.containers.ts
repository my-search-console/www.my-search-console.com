import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  show: state.indexation.showSitemapToast,
  isLoading: state.websites.addSitemap.isFetching,
})

const mapDispatch = (dispatch: any) => ({
  onSubmit() {
    dispatch(actions.websites.$refreshSitemapAndIndexation())
  },
  onChangeSitemap() {
    dispatch(actions.websites.setOpenSitemapModal({ value: true }))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
