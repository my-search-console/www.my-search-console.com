import { PageEntity } from "@foudroyer/interfaces"
import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../redux/actions"
import { RootState } from "../../../../../redux/store"

const mapState = (state: RootState) => ({})

const mapDispatch = (dispatch: any) => ({
  onEmptyFilter: () => {
    dispatch(actions.indexation.$filterByName({ name: "" }))
  },
  onSyncSiteMap: () => {
    dispatch(actions.websites.$refreshSitemapAndIndexation())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
