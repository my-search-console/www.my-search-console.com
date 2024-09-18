import { UserToGoogleSearchConsoleWithEmailsEntity } from "@foudroyer/interfaces"
import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../../redux/actions"
import { RootState } from "../../../../../../redux/store"

const mapState = (state: RootState) => ({
  accounts: state.auth.googleSearchAccounts,
})

const mapDispatch = (dispatch: any) => ({
  onMount: () => {
    dispatch(actions.auth.$GoogleSearchAccountFetchParents())
  },
  onDelete: (id: UserToGoogleSearchConsoleWithEmailsEntity["id"]) => {
    dispatch(actions.auth.$GoogleSearchAccountDelete({ id }))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
