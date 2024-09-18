import { Menu } from "@headlessui/react"
import { LockClosedIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"
import React from "react"
import { ITranslations } from "../../../../../interfaces/ITranslations"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"

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
            active ? "bg-pink-100 text-pink-500" : "",
            "flex w-full items-center  px-4 py-2 text-left text-sm transition-all duration-300 ease-in-out"
          )}
          onClick={() => {
            props.onSetDate({ period: props.period, date: props.date })
          }}
        >
          {props.locked && (
            <LockClosedIcon className="h-4 w-4 text-pink-500 mr-2" />
          )}
          <FormattedMessage id={props.formattedMessage} />
        </button>
      )}
    </Menu.Item>
  )
}
