import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"
import { IndexationSearchEngines } from "../../../../entities/SearchEngineEntity"

const mapState = (state: RootState) => ({
  fetching: state.indexation.autoIndexationModal.isFetching,
  length: state.indexation.indexationAuto.queue.length,
})

const mapDispatch = (dispatch: any) => ({})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
