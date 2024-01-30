import { Menu } from "@headlessui/react"
import classNames from "classnames"
import React from "react"
import { FormattedMessage } from "../../../general/FormattedMessage/FormattedMessage"
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid"

export const MenuExportItem: React.FC<{
  type: "csv" | "png"
}> = (props) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={classNames(
            active ? "bg-blue-100 text-blue-500" : "",
            "flex w-full items-center px-4 py-2 text-sm transition-all duration-300 ease-in-out"
          )}
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
          <span className="ml-1">
            <FormattedMessage id={`analytics/histogram/export/${props.type}`} />
          </span>
        </button>
      )}
    </Menu.Item>
  )
}
