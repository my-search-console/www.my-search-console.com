import { BoltIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import React from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { ButtonSecondary } from "../../../../ui/Button/Button"
import {
  connector,
  ContainerProps,
} from "./containers/SourceSelector.container"

type Props = ContainerProps

export const Wrapper: React.FC<Props> = (props) => (
  <div className="flex w-full items-center mr-1 justify-between">
    <div className="space-x-1">
      {props.isFilterApplied && (
        <ButtonSecondary
          size="sm"
          disabled={props.fetching}
          onClick={props.onCheckAll}
        >
          <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
          <FormattedMessage
            id="indexation/filter-bar/check-indexation-bulk"
            values={{
              d: props.length,
            }}
          />
        </ButtonSecondary>
      )}

      {props.isFilterApplied && (
        <ButtonSecondary
          size="sm"
          disabled={props.fetching}
          onClick={props.onIndexAll}
        >
          <BoltIcon className="mr-2 h-4 w-4" />
          <FormattedMessage
            id="indexation/filter-panel/save/buttons/index"
            values={{
              d: props.length,
            }}
          />
        </ButtonSecondary>
      )}
    </div>
  </div>
)

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const SourceSelector = connector(Container)
