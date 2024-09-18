import React from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import {
  connector,
  ContainerProps,
} from "./containers/IndexationAutoEmpty.containers"

import { MagnifyingGlassCircleIcon } from "@heroicons/react/20/solid"

type Props = {
  length: number
  fetching: boolean
}

export const Wrapper: React.FC<Props> = (props) => {
  if (props.fetching || props.length > 0) return <></>

  return (
    <div
      className={`relative rounded-md border border-blue-100 bg-blue-50 p-4`}
    >
      <div className="flex items-center justify-between font-display text-sm font-medium text-blue-400">
        <p className="flex items-center">
          <MagnifyingGlassCircleIcon className="mr-1 h-6 w-6" />
          <FormattedMessage id="indexation/auto/empty/title" />
        </p>
      </div>

      <div className={`mt-2 text-sm text-blue-400`}>
        <FormattedMessage id="indexation/auto/empty/description" />
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const IndexationAutoEmpty = connector(Container)
