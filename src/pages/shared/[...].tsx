import React from "react"
import { RouteComponentProps } from "@reach/router"
import { PublicAnalyticsRoute } from "../../routes/public-analytics"

const AnalyticsPage: React.FC<RouteComponentProps> = (props) => {
  return <PublicAnalyticsRoute {...props} />
}

export default AnalyticsPage
