import React from "react"

import wrapWithProvider from "./wrap-root-element"
import wrapWithIntl from "./wrap-page-element"

export const wrapRootElement = wrapWithProvider
export const wrapPageElement = wrapWithIntl

export const onPreRenderHTML = (props) => {
  const headComponents = props.getHeadComponents().map((component) => {
    if (component.props?.["data-identity"] === "gatsby-global-css") {
      return <link rel="stylesheet" href={component.props["data-href"]}></link>
    }

    return component
  })

  headComponents.sort((x, y) => {
    if (x.key === "gatsby-image-style") return -1
    return 0
  })

  props.replaceHeadComponents(headComponents)
}
