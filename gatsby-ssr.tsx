import React from "react"

import wrapWithIntl from "./wrap-page-element"
import wrapWithProvider from "./wrap-root-element"

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

export const onRenderBody = ({ setHeadComponents }) => {
  const scriptProps = {
    async: true,
    defer: true,
    "data-domain": "foudroyer.com",
    src: `https://plausible.foudroyer.com/js/script.js`,
  }

  return setHeadComponents([
    <link
      key="gatsby-plugin-plausible-preconnect"
      rel="preconnect"
      href={scriptProps.src}
    />,
    <script key="gatsby-plugin-plausible-script" {...scriptProps}></script>,

    <script
      key="gatsby-plugin-plausible-custom-events"
      dangerouslySetInnerHTML={{
        __html: `
          window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) };
          `,
      }}
    />,
  ])
}
