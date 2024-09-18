import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  isLoading: state.sitemaps.isLoading,
})

const mapDispatch = (dispatch: any) => ({
  onSubmit(url: string) {
    dispatch(actions.sitemaps.$fetch({ url }))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
