import React from "react"

export const As = ({ component, ...props }) => {
  return React.createElement(component || "div", props, props.children)
}
