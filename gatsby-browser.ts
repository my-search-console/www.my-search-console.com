import "./src/styles/global.css"

import wrapWithProvider from "./wrap-root-element"
import wrapWithIntl from "./wrap-page-element"

export const wrapRootElement = wrapWithProvider
export const wrapPageElement = wrapWithIntl

export const shouldUpdateScroll = ({ routerProps }) => {
  const { disableScroll } = routerProps?.location?.state || {}
  const shouldUpdateScroll = !disableScroll
  return shouldUpdateScroll
}
