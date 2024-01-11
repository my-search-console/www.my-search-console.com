import React from "react"
import { RouteComponentProps } from "@reach/router"
import { IndexationRoute } from "../../../routes/indexation"

const PagesPage: React.FC<RouteComponentProps> = (props) => {
  return <IndexationRoute {...props} />
}

export default PagesPage
