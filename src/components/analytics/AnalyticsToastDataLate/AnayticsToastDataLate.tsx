import { InformationCircleIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"
import React, { useEffect } from "react"
import { useIntl } from "react-intl"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { SmallStyle } from "../../UI/Button/Button"
import {
  connector,
  ContainerProps,
} from "./containers/AnalyticsToastDataLate.container"

export const Wrapper: React.FC<{
  toastAccepted: boolean
  onAccept: () => void
  onCreate: () => void
}> = (props) => {
  useEffect(() => {
    props.onCreate()
  }, [])

  const userLocale = useIntl().locale

  if (props.toastAccepted === true) return <></>
  return (
    <div className="mt-4 rounded-md border border-blue-100 bg-blue-50 p-4">
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
              <FormattedMessage id="analytics/toast/late/content" />
            </p>
          </div>
        </div>
        <div className="mt-4 flex w-full items-center justify-end pl-3 md:mt-0 md:w-max md:flex-row">
          <a
            href={`https://blog.foudroyer.com/${
              userLocale === "en" ? "" : userLocale + "/"
            }documentation/why-do-our-data-have-a-4-day-delay/`}
            target="_blank"
            type="button"
            className={classNames(
              "w-max whitespace-nowrap border-2 border-dashed border-blue-300 text-blue-500 hover:bg-blue-100  focus:ring-blue-600  focus:ring-offset-blue-50 md:bg-blue-50",
              SmallStyle
            )}
          >
            <FormattedMessage id="analytics/toast/late/more" />
          </a>
          <button
            type="button"
            className={classNames(
              "ml-2 w-max border-transparent bg-blue-200 text-blue-500 hover:bg-blue-300 hover:text-blue-700  focus:ring-blue-600  focus:ring-offset-blue-50 md:flex-row",
              SmallStyle
            )}
            onClick={() => {
              props.onAccept()
            }}
          >
            <FormattedMessage id="analytics/toast/late/understood" />
          </button>
        </div>
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const AnalyticsToastDataLate = connector(Container)
