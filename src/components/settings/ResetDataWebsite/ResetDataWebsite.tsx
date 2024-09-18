import { ArrowPathIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"
import React from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { SmallStyle } from "../../UI/Button/Button"
import { SettingSection } from "../SettingSection/SettingSection"
import {
  connector,
  ContainerProps,
} from "./containers/ResetDataWebsite.container"

export const Wrapper: React.FC<{
  onReset: () => void
}> = (props) => {
  return (
    <SettingSection
      title={<FormattedMessage id="websites/reset-data/settings/title" />}
      description={
        <FormattedMessage id="websites/reset-data/settings/description" />
      }
    >
      <div className="flex gap-2">
        <button
          className={classNames(
            SmallStyle,
            "shadow-btn border border-orange-100 bg-orange-50 text-orange-400 shadow-orange-100 hover:bg-orange-100 hover:text-orange-500"
          )}
          onClick={props.onReset}
        >
          <ArrowPathIcon className="mr-1 h-4 w-4" />
          <FormattedMessage id="websites/reset-data/settings/confirm" />
        </button>
      </div>
    </SettingSection>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const ResetDataWebsite = connector(Container)
