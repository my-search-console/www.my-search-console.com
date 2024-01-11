import { ArrowDownTrayIcon, ArrowPathIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"
import React from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { Loader } from "../../general/Loader/Loader"
import {
  ButtonPrimary,
  ButtonSecondary,
  SmallStyle,
} from "../../UI/Button/Button"
import {
  connector,
  ContainerProps,
} from "./containers/RefreshSitemapAndIndexation.containers"

type Props = {
  show: boolean
  isLoading: boolean
  onSubmit: () => void
  onChangeSitemap: () => void
}

export const Wrapper: React.FC<Props> = (props) => {
  if (!props.show) return <></>

  return (
    <div className={`relative rounded-md bg-blue-50 px-8 py-8`}>
      <div className="flex items-center justify-between font-display text-lg font-medium text-blue-400">
        <FormattedMessage id="sync/block/title" />
      </div>

      <div className={`mt-4 text-blue-400`}>
        <FormattedMessage id="sync/block/description" />
      </div>

      <div className="mt-8 flex flex-wrap md:space-x-2">
        <button
          className={classNames(
            "w-full justify-center border-transparent bg-blue-100  text-blue-500  hover:bg-blue-300 hover:text-blue-700 focus:ring-blue-600 focus:ring-offset-blue-50 md:ml-2  md:w-auto  md:flex-row md:justify-start",
            SmallStyle
          )}
          onClick={props.onSubmit}
        >
          <ArrowPathIcon className="mr-1 h-5 w-5" />
          <FormattedMessage id="sync/block/button/sync" />
        </button>

        <button
          className={classNames(
            "mt-2 flex w-full justify-center whitespace-nowrap border-2 border-dashed border-blue-300 text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50 md:mt-0  md:w-auto  md:justify-start md:bg-blue-50",
            SmallStyle
          )}
          onClick={props.onChangeSitemap}
        >
          <ArrowDownTrayIcon className="mr-1 h-5 w-5" />
          <FormattedMessage id="sync/block/button/change-sitemap" />
        </button>
      </div>
      {props.isLoading && <Loader />}
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const RefreshSitemapAndIndexation = connector(Container)
