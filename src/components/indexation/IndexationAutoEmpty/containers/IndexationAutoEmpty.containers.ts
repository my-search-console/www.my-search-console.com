import { connect, ConnectedProps } from "react-redux"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  fetching: state.indexation.autoIndexationModal.isFetching,
  length: state.indexation.indexationAuto.queue.length,
})

const mapDispatch = (dispatch: any) => ({})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
