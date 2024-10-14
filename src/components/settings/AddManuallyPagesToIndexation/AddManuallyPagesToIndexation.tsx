import { ArrowPathIcon } from "@heroicons/react/20/solid"
import React from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ButtonSecondary } from "../../ui/Button/Button"
import { SettingSection } from "../SettingSection/SettingSection"
import {
  connector,
  ContainerProps,
} from "./containers/AddManuallyPagesToIndexation.container"

export const Wrapper: React.FC<{
  onChange: (value: string) => void
  onSubmit: () => void
  value: string | null
  isFetching: boolean
}> = (props) => {
  return (
    <SettingSection
      title={<FormattedMessage id="settings/indexation/manualy/title" />}
      description={
        <FormattedMessage id="settings/indexation/manualy/description" />
      }
    >
      <textarea
        className="w-full rounded-md border-slate-200 bg-slate-50 placeholder:text-slate-400"
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value || ""}
        placeholder={`https://www.foudroyer.com/indexation\nhttps://www.foudroyer.com/analytics…`}
      />
      <ButtonSecondary size="sm" onClick={props.onSubmit}>
        {props.isFetching && (
          <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
        )}
        <FormattedMessage
          id="settings/indexation/manualy/save"
          values={{
            d: props.value?.split("\n").length,
          }}
        />
      </ButtonSecondary>
    </SettingSection>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const AddManuallyPagesToIndexation = connector(Container)
