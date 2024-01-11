import React from "react"
import { RouteComponentProps, Router } from "@reach/router"
import { DashboardRoute } from "../../../../routes/roast/dashboard"
import { RobotsRoute } from "../../../../routes/roast/robots"
import { ServerRoute } from "../../../../routes/roast/server"
import { SitemapRoute } from "../../../../routes/roast/sitemap"

const DashboardPage: React.FC<RouteComponentProps> = (props) => {
  return (
    <Router>
      <RobotsRoute path="/de/roast/dashboard/:id/robots/" />
      <ServerRoute path="/de/roast/dashboard/:id/server/" />
      <SitemapRoute path="/de/roast/dashboard/:id/sitemap/" />
      <DashboardRoute path="/de/roast/dashboard/" {...props} />
    </Router>
  )
}

export default DashboardPage
