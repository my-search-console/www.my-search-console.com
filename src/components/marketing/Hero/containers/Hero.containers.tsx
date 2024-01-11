import React, { ReactNode } from "react"
import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (
  state: RootState,
  props: {
    label?: ReactNode
    title: ReactNode
    description: string
    nbUsers: number
    hideUsers?: boolean
  }
) => ({
  ...props,
  authenticated: state.auth.authenticated,
})

const mapDispatch = (dispatch: any) => ({
  onAuthenticate: () => {
    dispatch(actions.auth.$authenticateWithGoogle())
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
