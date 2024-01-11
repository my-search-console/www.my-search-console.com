import { Menu } from "@headlessui/react"
import classNames from "classnames"
import React from "react"

export const SiteSelectorItem: React.FC<{
  onChangeWebsite: ({ websiteId }) => void
  websiteId: string
  websiteFavicon: string | null
  isPremium: boolean
  disabled: boolean
}> = (props) => {
  const favicon = props.websiteFavicon || "/websites/no-favicon.svg"
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={classNames(
            active ? "bg-pink-50 text-pink-400" : "",
            "flex w-full min-w-fit items-center px-4 py-2 pr-8 text-left text-sm transition-all duration-300 ease-in-out",
            props.disabled && "pointer-events-none bg-slate-100 opacity-30"
          )}
          onClick={() => {
            props.onChangeWebsite({ websiteId: props.websiteId })
          }}
          disabled={props.disabled}
        >
          <img
            src={favicon}
            alt={`favicon de ${props.websiteId}`}
            className="mr-2 h-4 w-4"
          />
          <div className="flex w-full items-center whitespace-nowrap pr-2">
            {props.websiteId}
          </div>
        </button>
      )}
    </Menu.Item>
  )
}
