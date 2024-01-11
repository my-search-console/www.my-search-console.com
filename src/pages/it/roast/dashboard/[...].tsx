import React from "react"
import { RouteComponentProps, Router } from "@reach/router"
import { DashboardRoute } from "../../../../routes/roast/dashboard"
import { RobotsRoute } from "../../../../routes/roast/robots"
import { ServerRoute } from "../../../../routes/roast/server"
import { SitemapRoute } from "../../../../routes/roast/sitemap"

const DashboardPage: React.FC<RouteComponentProps> = (props) => {
  return (
    <Router>
      <RobotsRoute path="/it/roast/dashboard/:id/robots/" />
      <ServerRoute path="/it/roast/dashboard/:id/server/" />
      <SitemapRoute path="/it/roast/dashboard/:id/sitemap/" />
      <DashboardRoute path="/it/roast/dashboard/" {...props} />
    </Router>
  )
}

export default DashboardPage
