import { IndexationSourceType, WebsiteEntity } from "@foudroyer/interfaces"
import React from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { SettingSection } from "../SettingSection/SettingSection"
import { IndexationSourceEngineButton } from "./components/IndexationSourceEnginesGoogle/IndexationSourceEngineButton"
import {
  connector,
  ContainerProps,
} from "./containers/IndexationSourceEnginesManager.container"

export const Wrapper: React.FC<{
  website: WebsiteEntity | null
  onClick: (website: WebsiteEntity | null) => void
}> = (props) => {
  return (
    <SettingSection
      title={<FormattedMessage id="indexation/search-engines/title" />}
      description={
        <FormattedMessage id="indexation/search-engines/description" />
      }
    >
      <div className="flex gap-2">
        <IndexationSourceEngineButton source={IndexationSourceType.google} />
        <IndexationSourceEngineButton source={IndexationSourceType.bing} />
        <IndexationSourceEngineButton source={IndexationSourceType.yandex} />
        <IndexationSourceEngineButton source={IndexationSourceType.naver} />
      </div>
    </SettingSection>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const IndexationSourceEnginesManager = connector(Container)
