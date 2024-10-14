import React from "react"

import BingSvg from "../../../assets/socials/bing.svg"
import GoogleSvg from "../../../assets/socials/google.svg"
import NaverSvg from "../../../assets/socials/naver.svg"
import YandexSvg from "../../../assets/socials/yandex.svg"

export const GoogleLogo = (props) => {
  return <img src={GoogleSvg} {...props} />
}

export const YandexLogo = (props) => {
  return <img src={YandexSvg} {...props} />
}

export const BingLogo = (props) => {
  return <img src={BingSvg} {...props} />
}

export const NaverLogo = (props) => {
  return <img src={NaverSvg} {...props} />
}
