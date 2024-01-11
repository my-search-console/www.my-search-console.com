import React, { ReactNode, useEffect } from "react"
import {
  connector,
  ContainerProps,
} from "./containers/StaticInitialization.container"

export type Props = {
  onMount?: Function
  children: ReactNode
}

export const Wrapper: React.FC<Props> = ({
  onMount = () => false,
  children,
}) => {
  useEffect(() => {
    setTimeout(() => onMount())
  }, [])

  return <>{children}</>
}

export const Container: React.FC<ContainerProps> = (props) => (
  <>
    <Wrapper {...props} />
  </>
)

export const StaticInitialization = connector(Container)
