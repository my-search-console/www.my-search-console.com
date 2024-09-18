import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../../redux/actions"
import { RootState } from "../../../../../../redux/store"

const mapState = (state: RootState, props: { hideLabel?: boolean }) => ({
  hideLabel: props.hideLabel,
})

const mapDispatch = (dispatch: any) => ({
  onClick: () => {
    dispatch(actions.websites.$openSitemapModal())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
