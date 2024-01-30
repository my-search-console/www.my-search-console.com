import { Menu } from "@headlessui/react"
import classNames from "classnames"
import React from "react"
import { FormattedMessage } from "../../../../../../../general/FormattedMessage/FormattedMessage"

export const Items: React.FC<{
  country: string
  onClick: () => void
}> = (props) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={classNames(
            active ? "bg-blue-50 text-blue-400" : "",
            "flex w-full min-w-fit items-center py-2 pl-4 text-left text-sm transition-all duration-300 ease-in-out"
          )}
          onClick={props.onClick}
        >
          <div className="flex w-full items-center pr-2">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
              {/* @ts-ignore */}
              <FormattedMessage id={`country/${props.country}`} />
            </p>
          </div>
        </button>
      )}
    </Menu.Item>
  )
}
