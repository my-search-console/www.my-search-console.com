import React from "react"
import { RouteComponentProps } from "@reach/router"
import { OpportunitiesRoute } from "../../routes/opportunities"

const OpportunitiesPage: React.FC<RouteComponentProps> = (props) => {
  return <OpportunitiesRoute {...props} />
}

export default OpportunitiesPage
