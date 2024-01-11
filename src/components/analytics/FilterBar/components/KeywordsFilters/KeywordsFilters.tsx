import React from "react"
import {
  ContainerProps,
  connector,
} from "./containers/KeywordsFilters.container"

import { Sources } from "./components/Sources/Sources"
import { Devices } from "./components/Devices/Devices"
import { Countries } from "./components/Countries/Countries"

export const Wrapper: React.FC<{}> = (props) => {
  return (
    <div className="flex items-center">
      <Devices />
      <Sources />
      <Countries />
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const KeywordsFilters = connector(Container)
