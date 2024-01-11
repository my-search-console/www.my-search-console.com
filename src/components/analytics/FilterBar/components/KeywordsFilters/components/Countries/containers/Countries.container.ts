import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../../../../redux/actions"
import { RootState } from "../../../../../../../../redux/store"

const mapState = (state: RootState) => ({
  fetching: state.websites.fetching,
  activeCountry: state.keywords.filters.country,
})

const mapDispatch = (dispatch: any) => ({
  onChangeCountry: (params: { country: string }) => {
    dispatch(actions.keywords.$KeywordsSetFiltersCountry(params))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
