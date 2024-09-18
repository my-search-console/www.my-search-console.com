import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  isOpen: state.ranking.analyticsDiscoverModal.isOpen,
  isLoading: state.ranking.analyticsDiscoverModal.isFetching,
  plan: state.payments.plans,
})

const mapDispatch = (dispatch: any) => ({
  onAccept: () => {
    dispatch(actions.ranking.$ActivateAnalytics())
  },
  onClose: () => {
    dispatch(
      actions.ranking.AnalyticsSetAnalyticsDiscoverModalIsOpen({ value: false })
    )
  },
  onClickShowDemo: () => {
    dispatch(
      actions.ranking.AnalyticsSetAnalyticsDiscoverModalIsOpen({ value: false })
    )
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
