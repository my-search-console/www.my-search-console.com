import React from "react"
import {
  ContainerProps,
  connector,
} from "./containers/ConnectService.container"
import GoogleLogo from "../../../assets/socials/google.svg"
import BingLogo from "../../../assets/socials/bing.svg"
import YandexLogo from "../../../assets/socials/yandex.svg"
import { SettingSection } from "../SettingSection/SettingSection"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import {
  SourceBingButton,
  SourceGoogleButton,
  SourceYandexButton,
} from "../../general/SourceButtons/SourceButtons"

export const Wrapper: React.FC<{
  connectedWithGoogle: boolean
  connectedWithBing: boolean
  connectedWithYandex: boolean
  onClick: (source: "yandex" | "bing") => void
}> = (props) => {
  return (
    <SettingSection
      title={<FormattedMessage id="settings/connect-sources/title" />}
      description={
        <FormattedMessage id="settings/connect-sources/description" />
      }
    >
      <div className="flex gap-2">
        <SourceGoogleButton
          onClick={() => false}
          isActive={props.connectedWithGoogle}
        />
        <SourceBingButton
          onClick={() => props.onClick("bing")}
          isActive={props.connectedWithBing}
        />
        <SourceYandexButton
          onClick={() => props.onClick("yandex")}
          isActive={props.connectedWithYandex}
        />
      </div>
    </SettingSection>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const ConnectService = connector(Container)
