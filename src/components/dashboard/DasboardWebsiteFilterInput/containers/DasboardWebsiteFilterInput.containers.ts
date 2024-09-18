import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  value: state.websites.filter,
})

const mapDispatch = (dispatch: any) => ({
  onChange: (name: string) => {
    dispatch(actions.websites.WebsitesFilter({ value: name }))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
