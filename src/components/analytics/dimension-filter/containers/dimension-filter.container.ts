import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  clicks: state.analytics.dimensions.clicks,
  impressions: state.analytics.dimensions.impressions,
  position: state.analytics.dimensions.position,
  click_through_rate: state.analytics.dimensions.click_through_rate,
})

const mapDispatch = (dispatch: any) => ({
  onToggleDimension(params: {
    type: "clicks" | "impressions" | "position" | "click_through_rate"
    value?: string
  }) {
    dispatch(actions.analytics.AnalyticsToggleDimension(params))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
