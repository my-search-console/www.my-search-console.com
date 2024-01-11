import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../redux/actions"
import { RootState } from "../../../../../redux/store"
import { RoastWithReportEntity } from "../../../../../entities/RoastEntity"
import { IssueTypes } from "../../../../../entities/IssueEntity"

const mapState = (state: RootState) => ({
  websites: state.roast.entities.map((id) =>
    state.roast.map.get(id)
  ) as RoastWithReportEntity[],
  fetching: state.roast.fetching,
})

const mapDispatch = (dispatch: any) => ({
  onDisplay: () => {
    dispatch(actions.roast.$fetchAll())
  },
  onSelect: (params: { websiteId: string; issueType: IssueTypes }) => {
    dispatch(actions.roast.$changeWebsite(params))
  },
  onRoast: () => dispatch(actions.roast.$roast()),
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
