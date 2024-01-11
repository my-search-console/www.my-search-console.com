import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  plans: state.payments.plans,
  pagesInQueue: state.indexation.indexationAuto.stats.queue,
})

const mapDispatch = (dispatch: any) => ({
  onClick() {
    dispatch(actions.websites.setCredentialsIsOpen({ value: true }))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
