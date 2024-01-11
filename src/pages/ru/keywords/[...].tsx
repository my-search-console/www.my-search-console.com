import React from "react"
import { RouteComponentProps } from "@reach/router"
import { KeywordsRoute } from "../../../routes/keywords"

const KeywordsPage: React.FC<RouteComponentProps> = (props) => {
  return <KeywordsRoute {...props} />
}

export default KeywordsPage
