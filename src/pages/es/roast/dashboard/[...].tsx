import React from "react"
import { RouteComponentProps, Router } from "@reach/router"
import { DashboardRoute } from "../../../../routes/roast/dashboard"
import { RobotsRoute } from "../../../../routes/roast/robots"
import { ServerRoute } from "../../../../routes/roast/server"
import { SitemapRoute } from "../../../../routes/roast/sitemap"

const DashboardPage: React.FC<RouteComponentProps> = (props) => {
  return (
    <Router>
      <RobotsRoute path="/es/roast/dashboard/:id/robots/" />
      <ServerRoute path="/es/roast/dashboard/:id/server/" />
      <SitemapRoute path="/es/roast/dashboard/:id/sitemap/" />
      <DashboardRoute path="/es/roast/dashboard/" {...props} />
    </Router>
  )
}

export default DashboardPage
