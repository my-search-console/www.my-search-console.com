import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({})

const mapDispatch = (dispatch: any) => ({
  onClose: () => {
    dispatch(actions.ranking.$AnalyticsCloseCalendar())
  },
  onSubmit: (props: { from: string; to: string }) => {
    dispatch(actions.ranking.$AnalyticsSubmitCalendar(props))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
