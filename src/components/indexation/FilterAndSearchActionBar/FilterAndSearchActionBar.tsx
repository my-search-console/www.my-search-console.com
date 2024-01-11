import React from "react"
import { InputFilterName } from "../InputFilterName/InputFilterName"
import {
  connector,
  ContainerProps,
} from "./containers/FilterAndSearchActionBar.containers"

type Props = {}

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <>
      <div className="flex h-full w-full space-x-2 font-display">
        <InputFilterName />
      </div>
    </>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const FilterAndSearchActionBar = connector(Container)
