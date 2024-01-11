import React, { useEffect } from "react"
import {
  connector,
  ContainerProps,
} from "./containers/AnalyticsLoadPublicData.containers"

type Props = {
  onMount: () => void
}

export const Wrapper: React.FC<Props> = (props) => {
  useEffect(() => {
    props.onMount()
  }, [])

  return <></>
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const AnalyticsLoadPublicData = connector(Container)
