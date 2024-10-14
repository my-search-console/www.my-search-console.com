import React from "react"
import { Loader } from "../Loader/Loader"
import {
  connector,
  ContainerProps,
} from "./containers/FullPageLoader.containers"

export const Wrapper: React.FC<{ show: boolean }> = (props) => {
  return props.show ? (
    <div className="fixed inset-0 z-40 flex h-full w-full items-center justify-center bg-slate-900 bg-opacity-90">
      <Loader />
    </div>
  ) : (
    <></>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const FullPageLoader = connector(Container)
