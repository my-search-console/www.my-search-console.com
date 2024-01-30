import { Menu } from "@headlessui/react"
import classNames from "classnames"
import React from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { ITranslations } from "../../../../../interfaces/ITranslations"
import { LockClosedIcon } from "@heroicons/react/20/solid"

export const DateSelectorItem: React.FC<{
  onSetDate: (params: { period: string | null; date: string | null }) => void
  period: "7d" | "30d" | "month" | "year"
  date: string | null
  formattedMessage: ITranslations["keys"]
  locked?: boolean
}> = (props) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={classNames(
            active ? "bg-blue-100 text-blue-500" : "",
            "flex w-full items-center px-4 py-2 text-left text-sm transition-all duration-300 ease-in-out"
          )}
          onClick={() => {
            props.onSetDate({ period: props.period, date: props.date })
          }}
        >
          {props.locked && (
            <LockClosedIcon className="mr-2 h-4 w-4 text-blue-500" />
          )}
          <FormattedMessage id={props.formattedMessage} />
        </button>
      )}
    </Menu.Item>
  )
}
