import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../../redux/actions"
import { RootState } from "../../../../../../redux/store"

const mapState = (state: RootState) => ({})

const mapDispatch = (dispatch: any) => ({
  onNextPeriod: () => {
    dispatch(actions.ranking.$onNextPeriod())
  },
  onPreviousPeriod: () => {
    dispatch(actions.ranking.$onPreviousPeriod())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
