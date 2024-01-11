import React from "react"
import { RouteComponentProps } from "@reach/router"
import { SpreadRoute } from "../../routes/spread"

const SpreadPage: React.FC<RouteComponentProps> = (props) => {
  return <SpreadRoute {...props} />
}

export default SpreadPage
