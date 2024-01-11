import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../../redux/actions"
import { RootState } from "../../../../../../redux/store"

const mapState = (state: RootState, props: { uniqueChartId?: string }) => ({
  graph: state.indexation.indexationReport.graph,
  isFetching: state.indexation.fetching,
  isPremium: state.payments.plans.size > 0,
  noTotalFromQueue: state.indexation.indexationReport.stats.total === 0,
  uniqueChartId: props.uniqueChartId,
})

const mapDispatch = (dispatch: any) => ({
  onOpenPremiumModal: () =>
    dispatch(
      actions.payments.$PaymentsOpenModal({
        value: true,
        type: "indexation",
        source: "indexation/report",
      })
    ),
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
