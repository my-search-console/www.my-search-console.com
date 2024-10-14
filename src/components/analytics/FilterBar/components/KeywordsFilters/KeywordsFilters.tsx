import React from "react"
import {
  connector,
  ContainerProps,
} from "./containers/KeywordsFilters.container"

import { Countries } from "./components/Countries/Countries"
import { Devices } from "./components/Devices/Devices"
import { Sources } from "./components/Sources/Sources"

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
