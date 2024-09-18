import { LogsEntity } from "@foudroyer/interfaces"
import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (
  state: RootState,
  props: { log: LogsEntity; isLast?: boolean }
) => ({
  log: props.log,
  isFetching: state.logs.logsInFetchingState.has(props.log.id),
  isLast: props.isLast,
})

const mapDispatch = (dispatch: any) => ({
  onOpen() {
    dispatch(actions.logs.$open())
  },
  onSelect(log: LogsEntity) {
    dispatch(actions.logs.$open(log))
  },
  onDelete(id: string) {
    dispatch(actions.logs.$delete(id))
  },
  onSync(id: string) {
    dispatch(actions.logs.$sync(id))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
