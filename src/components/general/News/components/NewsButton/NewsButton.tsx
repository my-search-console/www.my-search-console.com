import React from "react"
import { ButtonSecondary } from "../../../../UI/Button/Button"
import { BellIcon } from "@heroicons/react/24/outline"
import { ContainerProps, connector } from "./containers/NewsButton.container"

export const Wrapper: React.FC<{ onClick: () => void }> = (props) => {
  return (
    <ButtonSecondary size="sm" onClick={props.onClick}>
      <BellIcon className="h-5 w-5" />
    </ButtonSecondary>
  )
}

const Connected: React.FC<ContainerProps> = (props) => <Wrapper {...props} />

export const NewsButton = connector(Connected)
