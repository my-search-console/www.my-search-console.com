import { InformationCircleIcon } from "@heroicons/react/20/solid"
import React from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"

export const AnalyticsToastMaintenance: React.FC = () => {
  return (
    <div className="mt-4 rounded-md border border-blue-100 bg-blue-50 px-4 py-10">
      <div className="flex flex-col items-center md:flex-row">
        <div className="flex w-full items-start">
          <div className="mt-0.5 flex-shrink-0">
            <InformationCircleIcon
              className="h-5 w-5 text-blue-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-blue-800">
              <FormattedMessage id="analytics/toast/maintenance" />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
