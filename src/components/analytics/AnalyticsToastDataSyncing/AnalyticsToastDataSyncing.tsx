import React from "react"
import {
  ContainerProps,
  connector,
} from "./containers/AnalyticsToastDataSyncing.container"
import { ClockIcon } from "@heroicons/react/20/solid"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"

export const Wrapper: React.FC<{
  isAnalyticsSyncDone: boolean
  isPremium: boolean
}> = (props) => {
  if (props.isPremium === false || props.isAnalyticsSyncDone === true)
    return <></>

  return (
    <div className="mt-4 rounded-md border border-amber-100 bg-amber-50 p-4">
      <div className="flex flex-col items-center md:flex-row">
        <div className="flex w-full items-start">
          <div className="mt-0.5">
            <ClockIcon className="h-5 w-5 text-amber-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-amber-600">
              <FormattedMessage id="analytics/toast/sync/content" />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const AnalyticsToastDataSyncing = connector(Container)
