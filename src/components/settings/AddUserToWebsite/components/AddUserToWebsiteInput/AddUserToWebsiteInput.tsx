import React, { useRef } from "react"
import { useIntl } from "react-intl"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { ButtonSecondary } from "../../../../ui/Button/Button"
import {
  connector,
  ContainerProps,
} from "./containers/AddUserToWebsiteInput.container"

type Props = {
  onAdd: (email: string) => void
}

const Wrapper: React.FC<Props> = (props) => {
  const input = useRef<HTMLInputElement>(null)
  const intl = useIntl()

  return (
    <form
      className="mt-6 flex max-w-3xl"
      onSubmit={(e) => {
        e.preventDefault()

        if (input.current?.value) {
          props.onAdd(input.current?.value || "")
          input.current.value = ""
        }
      }}
    >
      <input
        type="email"
        name="email"
        id="email"
        className="block w-full rounded-md border border-slate-200 py-1.5 text-slate-900  shadow-slate-200  placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-pink-400 sm:text-sm sm:leading-6"
        placeholder={intl.formatMessage({
          id: "settings/add-user/input/placeholder",
        })}
        ref={input}
      />
      <div className="ml-1 flex-shrink-0">
        <ButtonSecondary type="submit" size="sm">
          <FormattedMessage id="settings/add-user/input/button" />
        </ButtonSecondary>
      </div>
    </form>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const AddUserToWebsiteInput = connector(Container)
