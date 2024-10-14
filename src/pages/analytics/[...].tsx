import { RouteComponentProps } from "@reach/router"
import React from "react"
import { AnalyticsRoute } from "../../routes/analytics"

const AnalyticsPage: React.FC<RouteComponentProps> = (props) => {
  return <AnalyticsRoute {...props} />
}

export default AnalyticsPage

export async function getServerData() {
  return {
    props: {},
  }
}
