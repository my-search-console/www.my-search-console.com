import { Switch } from "@headlessui/react"
import classNames from "classnames"
import React from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { SettingSection } from "../SettingSection/SettingSection"
import {
  connector,
  ContainerProps,
} from "./containers/MakeWebsitePublic.container"

export const Wrapper: React.FC<{
  onToggle: () => void
  isPublic: boolean
  websiteId: string
}> = (props) => {
  return (
    <SettingSection
      title={<FormattedMessage id="settings/analytics/public/title" />}
      description={
        <FormattedMessage id="settings/analytics/public/description" />
      }
    >
      <div className=" flex items-center space-x-2 text-left">
        <Switch.Group as="div" className="flex items-center justify-between">
          <Switch
            checked={props.isPublic}
            onClick={props.onToggle}
            className={classNames(
              props.isPublic ? "bg-emerald-500" : "bg-slate-200",
              "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            )}
          >
            <span
              aria-hidden="true"
              className={classNames(
                props.isPublic ? "translate-x-5" : "translate-x-0",
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              )}
            />
          </Switch>
        </Switch.Group>

        {props.isPublic && (
          <div className="rounded border border-slate-100 bg-slate-50 p-1 px-2 text-sm text-slate-500">
            https://www.foudroyer.com/shared/{props.websiteId}
          </div>
        )}
      </div>
    </SettingSection>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const MakeWebsitePublic = connector(Container)
