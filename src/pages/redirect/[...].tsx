import { RouteComponentProps } from "@reach/router"
import React from "react"
import { RedirectPage } from "../../routes/redirect"

const RedirectRoute: React.FC<RouteComponentProps> = (props) => {
  return <RedirectPage {...props} />
}

export default RedirectRoute
