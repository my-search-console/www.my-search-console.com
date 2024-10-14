import { RouteComponentProps } from "@reach/router"
import React from "react"
import { AuthCallbackSendCode } from "../../../../components/general/AuthCallbackSendCode/AuthCallbackSendCode"

const AuthGoogleCallbackPage: React.FC<RouteComponentProps> = (props) => {
  return <AuthCallbackSendCode />
}

export default AuthGoogleCallbackPage
