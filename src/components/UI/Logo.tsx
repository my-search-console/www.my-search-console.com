import React from "react"
import logo from "../../assets/logo/logo.svg"
import logoFace from "../../assets/logo/logo-face.svg"
import animatedLogo from "../../assets/logo/logo-animated.svg"

export function Logo(props) {
  return (
    <img
      src={!props.animated ? logo : animatedLogo}
      {...props}
      alt="Logo My Search Console"
    />
  )
}

export function LogoFace(props) {
  return <img src={logoFace} {...props} alt="Logo My Search Console" />
}
