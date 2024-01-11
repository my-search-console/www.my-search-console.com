import React from "react"
import { RouteComponentProps, Router } from "@reach/router"
import { DashboardRoute } from "../../../../routes/roast/dashboard"
import { RobotsRoute } from "../../../../routes/roast/robots"
import { ServerRoute } from "../../../../routes/roast/server"
import { SitemapRoute } from "../../../../routes/roast/sitemap"

const DashboardPage: React.FC<RouteComponentProps> = (props) => {
  return (
    <Router>
      <RobotsRoute path="/fr/roast/dashboard/:id/robots/" />
      <ServerRoute path="/fr/roast/dashboard/:id/server/" />
      <SitemapRoute path="/fr/roast/dashboard/:id/sitemap/" />
      <DashboardRoute path="/fr/roast/dashboard/" {...props} />
    </Router>
  )
}

export default DashboardPage
