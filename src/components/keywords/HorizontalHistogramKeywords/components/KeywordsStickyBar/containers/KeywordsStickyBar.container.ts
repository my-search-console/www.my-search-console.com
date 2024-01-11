import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../../redux/actions"
import { RankingStatEntity } from "../../../../../../entities/RankingWebsiteEntity"
import { RootState } from "../../../../../../redux/store"

const mapState = (state: RootState) => ({
  isOpen: state.keywords.selectedKeywordsToDelete.size > 0,
  size: state.keywords.selectedKeywordsToDelete.size,
})

const mapDispatch = (dispatch: any) => ({
  onDelete() {
    dispatch(actions.keywords.$delete())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
