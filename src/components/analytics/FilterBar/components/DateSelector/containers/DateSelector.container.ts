import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../../redux/actions"
import { RootState } from "../../../../../../redux/store"

const mapState = (state: RootState) => {
  return {}
}

const mapDispatch = (dispatch: any) => ({
  onSetDate(params: { period: string | null; date: string | null }) {
    dispatch(
      actions.ranking.$RankingSetDate({
        period: params.period,
        date: params.date,
      })
    )
  },
  onOpenCalendar() {
    dispatch(actions.ranking.$AnalyticsOpenCalendar())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
