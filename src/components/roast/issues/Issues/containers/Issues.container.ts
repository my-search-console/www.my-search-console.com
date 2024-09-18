import { connect, ConnectedProps } from "react-redux"
import { IssueTypes } from "../../../../../entities/IssueEntity"
import { RootState } from "../../../../../redux/store"

const mapState = (state: RootState, props: { type: IssueTypes }) => {
  const website = state.roast.website

  if (!website) return { issues: [] }

  return {
    issues: website[props.type],
  }
}

const mapDispatch = (dispatch: any) => ({})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
