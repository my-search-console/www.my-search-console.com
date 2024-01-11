import classNames from "classnames"
import React from "react"
import { ButtonSecondary } from "../../UI/Button/Button"
import GoogleLogo from "../../../assets/socials/google.svg"
import YandexLogo from "../../../assets/socials/yandex.svg"
import BingLogo from "../../../assets/socials/bing.svg"
import NaverLogo from "../../../assets/socials/naver.svg"

type Props = {
  onClick: () => void
  isActive: boolean
}

const SourceButton: React.FC<
  Props & {
    logo: string
  }
> = (props) => (
  <ButtonSecondary size="sm" onClick={props.onClick}>
    <img
      src={props.logo}
      className={classNames("h-4 w-4", !props.isActive && "opacity-30")}
    />
  </ButtonSecondary>
)

export const SourceGoogleButton: React.FC<Props> = (props) => {
  return (
    <SourceButton
      onClick={props.onClick}
      logo={GoogleLogo}
      isActive={props.isActive}
    />
  )
}

export const SourceNaverButton: React.FC<Props> = (props) => {
  return (
    <SourceButton
      onClick={props.onClick}
      logo={NaverLogo}
      isActive={props.isActive}
    />
  )
}

export const SourceBingButton: React.FC<Props> = (props) => {
  return (
    <SourceButton
      onClick={props.onClick}
      logo={BingLogo}
      isActive={props.isActive}
    />
  )
}

export const SourceYandexButton: React.FC<Props> = (props) => {
  return (
    <SourceButton
      onClick={props.onClick}
      logo={YandexLogo}
      isActive={props.isActive}
    />
  )
}
