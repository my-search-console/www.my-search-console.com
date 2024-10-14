import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (
  state: RootState,
  props: { langKey: string; children: any }
) => ({
  langKey: props.langKey,
  children: props.children,
})

const mapDispatch = (dispatch: any) => ({
  onMount: (lang: string) => {
    dispatch(actions.lang.store({ lang }))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
