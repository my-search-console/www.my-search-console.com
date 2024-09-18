import { PlusIcon } from "@heroicons/react/20/solid"
import React from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { ButtonSecondary } from "../../../../UI/Button/Button"
import {
  connector,
  ContainerProps,
} from "./containers/AddUserToWebsiteInput.container"

type Props = {
  onAdd: () => void
}

const Wrapper: React.FC<Props> = (props) => {
  return (
    <ButtonSecondary size="sm" onClick={props.onAdd}>
      <PlusIcon className="mr-1 h-5 w-5" />
      <FormattedMessage id="settings/multi-search-console/button" />
    </ButtonSecondary>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const AddUserToWebsiteInput = connector(Container)
