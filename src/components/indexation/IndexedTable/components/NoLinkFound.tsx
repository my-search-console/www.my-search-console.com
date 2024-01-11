import {
  ArrowPathIcon,
  MagnifyingGlassCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/20/solid"
import classNames from "classnames"
import React from "react"
import { SmallStyle } from "../../../UI/Button/Button"
import { ContainerProps, connector } from "./containers/NoLinkFound.containers"
import { FormattedMessage } from "../../../general/FormattedMessage/FormattedMessage"

const Wrapper: React.FC<{
  onEmptyFilter: () => void
  onSyncSiteMap: () => void
}> = (props) => {
  return (
    <div
      className={`relative rounded-md border border-blue-100 bg-blue-50 px-8 py-8`}
    >
      <div className="flex items-center justify-between font-display text-lg font-medium text-blue-400">
        <p className="flex items-center">
          <MagnifyingGlassCircleIcon className="mr-1 h-6 w-6" />
          <FormattedMessage id="indexation/link-not-found/title" />
        </p>
      </div>

      <div className={`mt-4 text-blue-400`}>
        <p>
          <FormattedMessage
            id="indexation/link-not-found/description"
            values={{
              // @ts-ignore
              br: () => <br />,
            }}
          />
        </p>
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const NoLinkFound = connector(Container)
