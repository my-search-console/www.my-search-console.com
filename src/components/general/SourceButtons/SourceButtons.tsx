import classNames from "classnames"
import React from "react"
import BingLogo from "../../../assets/socials/bing.svg"
import GoogleLogo from "../../../assets/socials/google.svg"
import NaverLogo from "../../../assets/socials/naver.svg"
import YandexLogo from "../../../assets/socials/yandex.svg"
import { ButtonSecondary } from "../../ui/Button/Button"

type Props = {
  onClick: () => void
  isActive: boolean
  small?: boolean
}

const SourceButton: React.FC<
  Props & {
    logo: string
  }
> = (props) => (
  <ButtonSecondary size={props.small ? "xs" : "sm"} onClick={props.onClick}>
    <img
      src={props.logo}
      className={classNames("h-4 w-4", !props.isActive && "opacity-30")}
    />
  </ButtonSecondary>
)

export const SourceGoogleButton: React.FC<Props> = (props) => {
  return <SourceButton logo={GoogleLogo} {...props} />
}

export const SourceNaverButton: React.FC<Props> = (props) => {
  return <SourceButton logo={NaverLogo} {...props} />
}

export const SourceBingButton: React.FC<Props> = (props) => {
  return <SourceButton logo={BingLogo} {...props} />
}

export const SourceYandexButton: React.FC<Props> = (props) => {
  return <SourceButton logo={YandexLogo} {...props} />
}
