import { WebsiteEntity } from "@foudroyer/interfaces"
import React from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ButtonSecondary } from "../../ui/Button/Button"
import { SettingSection } from "../SettingSection/SettingSection"
import {
  connector,
  ContainerProps,
} from "./containers/GoogleKeyUpdate.container"

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
