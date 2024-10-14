import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  toastAccepted: state.ranking.analyticsToastDataLateAccepted,
})

const mapDispatch = (dispatch: any) => ({
  onAccept() {
    dispatch(actions.ranking.$RankingStoreAnalyticsToastDataLateAccepted())
  },
  onCreate() {
    dispatch(actions.ranking.$RankingFetchAnalyticsToastDataLateAccepted())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
