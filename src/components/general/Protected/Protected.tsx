import React, { ReactElement, useEffect } from "react"
import { connector, ContainerProps } from "./containers/Protected.containers"
import { Loader } from "../Loader/Loader"

type Props = {
  onMount: () => void
  showComponent: boolean
  children?: ReactElement
}

export const Wrapper: React.FC<Props> = (props) => {
  useEffect(() => {
    props.onMount()
  }, [])

  if (props.showComponent) return <>{props.children}</>

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader />
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const Protected = connector(Container)
