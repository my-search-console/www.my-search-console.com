import React from "react"
import logo from "../../assets/logo/logo.svg"
import animatedLogo from "../../assets/logo/logo-animated.svg"

export function Logo(props) {
  return (
    <img
      src={!props.animated ? logo : animatedLogo}
      {...props}
      alt="Logo Foudroyer"
    />
  )
}
