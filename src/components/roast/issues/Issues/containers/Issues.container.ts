import { connect, ConnectedProps } from "react-redux"
import { RootState } from "../../../../../redux/store"
import { IssueTypes } from "../../../../../entities/IssueEntity"

const mapState = (state: RootState, props: { type: IssueTypes }) => {
  const website = state.roast.website

  console.log(website)

  if (!website) return { issues: [] }

  return {
    issues: website[props.type],
  }
}

const mapDispatch = (dispatch: any) => ({})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
