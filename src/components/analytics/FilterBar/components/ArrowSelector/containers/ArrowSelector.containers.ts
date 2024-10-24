import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../../redux/actions"
import { RootState } from "../../../../../../redux/store"

const mapState = (state: RootState) => ({})

const mapDispatch = (dispatch: any) => ({
  onNextPeriod: () => {
    dispatch(actions.analytics.$onNextPeriod())
  },
  onPreviousPeriod: () => {
    dispatch(actions.analytics.$onPreviousPeriod())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
