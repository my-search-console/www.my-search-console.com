import React from "react"
import {
  ContainerProps,
  connector,
} from "./containers/GoogleKeyUpdate.container"
import { SettingSection } from "../SettingSection/SettingSection"
import { ButtonSecondary } from "../../UI/Button/Button"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { WebsiteEntity } from "@foudroyer/interfaces"

export const Wrapper: React.FC<{
  website: WebsiteEntity | null
  onClick: (website: WebsiteEntity | null) => void
}> = (props) => {
  return (
    <SettingSection
      title={<FormattedMessage id="settings/google-key/title" />}
      description={<FormattedMessage id="settings/google-key/description" />}
    >
      <div className="flex gap-2">
        <ButtonSecondary size="sm" onClick={() => props.onClick(props.website)}>
          <FormattedMessage id="settings/google-key/cta" />
        </ButtonSecondary>
      </div>
    </SettingSection>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const GoogleKeyUpdate = connector(Container)
