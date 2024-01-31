import {
  IndexationQueueStatus,
  PageEntity,
} from "@my-search-console/interfaces"
import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../../redux/actions"
import { RootState } from "../../../../../../redux/store"

const mapState = (state: RootState) => ({
  stats: state.indexation.indexationAuto.stats,
  isFetching: state.indexation.fetching,
  status: state.indexation.indexationAuto.filter.status,
})

const mapDispatch = (dispatch: any) => ({
  onToggleFilter: (status: IndexationQueueStatus | null) => {
    dispatch(actions.indexation.$IndexationAutoFilter({ status }))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
