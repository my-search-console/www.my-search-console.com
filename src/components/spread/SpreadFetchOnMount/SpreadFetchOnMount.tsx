import React, { useEffect } from "react"
import {
  connector,
  ContainerProps,
} from "./containers/SpreadFetchOnMount.container"

export const Wrapper: React.FC<ContainerProps> = (props) => {
  useEffect(() => {
    props.onMount()
  }, [])

  return <></>
}

export const SpreadFetchOnMount = connector(Wrapper)
