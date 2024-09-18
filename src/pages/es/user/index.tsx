import { RouteComponentProps } from "@reach/router"
import React from "react"
import { UserRoute } from "../../../routes/user"

const UserPage: React.FC<RouteComponentProps> = (props) => {
  return <UserRoute {...props} />
}

export default UserPage
