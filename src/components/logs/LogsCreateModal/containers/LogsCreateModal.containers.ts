import { LogsEntity } from "@foudroyer/interfaces"
import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  isFetching: state.logs.createOrUpdateForm.isFetching,
})

const mapDispatch = (dispatch: any) => ({
  onClose: () => {
    dispatch(actions.logs.$close())
  },
  onSubmit: (log: LogsEntity) => {
    dispatch(actions.logs.$create(log))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
