import React from "react"
import { RouteComponentProps } from "@reach/router"
import { AnalyticsRoute } from "../../routes/analytics"

const AnalyticsPage: React.FC<RouteComponentProps> = (props) => {
  return <AnalyticsRoute {...props} />
}

export default AnalyticsPage
