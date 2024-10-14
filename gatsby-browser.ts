import "./src/styles/global.css"

import wrapWithIntl from "./wrap-page-element"
import wrapWithProvider from "./wrap-root-element"

export const wrapRootElement = wrapWithProvider
export const wrapPageElement = wrapWithIntl

export const shouldUpdateScroll = ({ routerProps }) => {
  const { disableScroll } = routerProps?.location?.state || {}
  const shouldUpdateScroll = !disableScroll
  return shouldUpdateScroll
}

export const onRouteUpdate = (props: {
  location: { pathname: string; href: string }
}) => {}
