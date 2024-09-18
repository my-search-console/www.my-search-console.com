import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  sources: state.spread.sources,
  fetching: state.spread.isFetching,
})

const mapDispatch = (dispatch: any) => ({
  onAuthenticate: (source: "bing" | "yandex") =>
    dispatch(actions.spread.$authenticate(source)),
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
