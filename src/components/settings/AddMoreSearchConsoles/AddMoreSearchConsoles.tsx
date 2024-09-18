import React from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { SettingSection } from "../SettingSection/SettingSection"
import { AddUserToWebsiteInput } from "./components/AddUserToWebsiteInput/AddUserToWebsiteInput"
import { AddUserToWebsiteList } from "./components/AddUserToWebsiteList/AddUserToWebsiteList"
import {
  connector,
  ContainerProps,
} from "./containers/AddMoreSearchConsoles.container"

export const Wrapper: React.FC<{}> = () => {
  return (
    <SettingSection
      title={<FormattedMessage id="settings/multi-search-console/title" />}
      description={
        <FormattedMessage id="settings/multi-search-console/description" />
      }
    >
      <div>
        <AddUserToWebsiteList />
        <AddUserToWebsiteInput />
      </div>
    </SettingSection>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const AddMoreSearchConsoles = connector(Container)
