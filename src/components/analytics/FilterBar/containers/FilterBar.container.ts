import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState, props: { readonly?: boolean }) => ({})

const mapDispatch = (dispatch: any) => ({
  onFilter(params: {
    type: "source" | "date" | "query" | "country" | "device" | "page"
    value: string
  }) {
    dispatch(actions.analytics.$RankingStoreFilter(params))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
