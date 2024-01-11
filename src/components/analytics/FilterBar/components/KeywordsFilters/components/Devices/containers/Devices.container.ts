import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../../../../redux/actions"
import { RootState } from "../../../../../../../../redux/store"

const mapState = (state: RootState) => ({
  device: state.keywords.filters.device,
})

const mapDispatch = (dispatch: any) => ({
  onChange: (params: { device: "desktop" | "tablet" | "mobile" | null }) => {
    dispatch(actions.keywords.$KeywordsSetFiltersDevice(params))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
