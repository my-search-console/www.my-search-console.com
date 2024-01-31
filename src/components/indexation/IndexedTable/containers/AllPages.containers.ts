import { PageEntity } from "@my-search-console/interfaces"
import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  pages: state.indexation.pages,
  isLoading: state.indexation.fetching,
  allLoadingStates: state.indexation.pagesInIndexingState,
})

const mapDispatch = (dispatch: any) => ({
  onIndex: (page: PageEntity) => {
    dispatch(actions.indexation.$index(page))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
