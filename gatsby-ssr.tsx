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

  /**
   * This sorting ensures that the Gatsby image styles are loaded before other styles.
   * By placing the Gatsby image styles first, we prevent layout shifts and improve
   * the initial render of images on the page, enhancing the user experience.
   *
   * If you not sort the gatsby-image-style component, it will cause a layout shift and sometimes
   * break the layout of the page.
   */
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
    "data-domain": "my-search-console.com",
    src: `https://plausible.my-search-console.com/js/script.outbound-links.js`,
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
