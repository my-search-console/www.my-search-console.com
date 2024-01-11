import React from "react"
import { RouteComponentProps } from "@reach/router"
import { SettingsRoute } from "../../../routes/settings"

const SettingsPage: React.FC<RouteComponentProps> = (props) => {
  return <SettingsRoute {...props} />
}

export default SettingsPage
