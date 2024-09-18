import { ArrowPathIcon, CircleStackIcon } from "@heroicons/react/20/solid"
import React from "react"
import { ButtonPrimary } from "../../UI/Button/Button"
import {
  connector,
  ContainerProps,
} from "./containers/LeaderboardShowMyDataButton.container"

export const Wrapper: React.FC<ContainerProps> = (props) => {
  if (!props.isRealUserData) {
    return (
      <div className="mb-4 mt-4 flex items-center justify-center">
        <ButtonPrimary disabled={props.isFetching} onClick={props.onClick}>
          {props.isFetching && (
            <ArrowPathIcon className="h-5 w-5 animate-spin" />
          )}
          {!props.isFetching && <CircleStackIcon className="h-5 w-5" />}
          <span className="ml-1">Show my data</span>
        </ButtonPrimary>
      </div>
    )
  }

  return <></>
}

export const LeaderboardShowMyDataButton = connector(Wrapper)
