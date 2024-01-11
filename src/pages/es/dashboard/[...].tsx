import React from "react"
import { RouteComponentProps } from "@reach/router"
import { DashboardRoute } from "../../../routes/dashboard"

const DashboardPage: React.FC<RouteComponentProps> = (props) => {
  return <DashboardRoute {...props} />
}

export default DashboardPage
