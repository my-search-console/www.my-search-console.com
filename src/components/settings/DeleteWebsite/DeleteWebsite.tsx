import { PaymentPlansEntity } from "@foudroyer/interfaces"
import { TrashIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"
import React, { useState } from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { SmallStyle } from "../../ui/Button/Button"
import { SettingSection } from "../SettingSection/SettingSection"
import { connector, ContainerProps } from "./containers/DeleteWebsite.container"

export const Wrapper: React.FC<{
  isFetching: boolean
  plans: Set<PaymentPlansEntity>
  onDelete: () => void
}> = (props) => {
  const [clicked, setClicked] = useState(false)

  return (
    <SettingSection
      title={<FormattedMessage id="settings/danger/title" />}
      description={<FormattedMessage id="settings/danger/description" />}
    >
      <div className="flex gap-2">
        <button
          className={classNames(
            SmallStyle,
            "shadow-btn border border-red-100 bg-red-50 text-red-400 shadow-red-100 hover:bg-red-100 hover:text-red-500"
          )}
          onClick={() => {
            if (clicked) {
              props.onDelete()
              return setClicked(false)
            }

            setClicked(true)
          }}
        >
          <TrashIcon className="mr-1 h-4 w-4" />
          {clicked && (
            <FormattedMessage id="settings/danger/delete-website/validation" />
          )}
          {!clicked && <FormattedMessage id="settings/danger/delete-website" />}
        </button>
      </div>
    </SettingSection>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const DeleteWebsite = connector(Container)
