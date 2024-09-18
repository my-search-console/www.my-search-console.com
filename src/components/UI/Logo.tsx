import React from "react"
import animatedLogo from "../../assets/logo/logo-animated.svg"
import logo from "../../assets/logo/logo.svg"

export function Logo(props) {
  return (
    <img
      src={!props.animated ? logo : animatedLogo}
      {...props}
      alt="Logo Foudroyer"
    />
  )
}
