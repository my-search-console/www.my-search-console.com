import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  websites: state.spread.websites,
  fetching: state.spread.isFetching,
})

const mapDispatch = (dispatch: any) => ({
  goAnalytics: (id: string) => dispatch(actions.spread.$SpreadGoAnalytics(id)),
  onMount: () => dispatch(actions.spread.$fetch()),
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
