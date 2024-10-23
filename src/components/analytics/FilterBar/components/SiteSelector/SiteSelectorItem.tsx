import { Menu } from "@headlessui/react"
import classNames from "classnames"
import React from "react"
import { getFavicon } from "../../../../../utils/getFavicon"

export const SiteSelectorItem: React.FC<{
  onChangeWebsite: ({ websiteId }) => void
  websiteId: string
}> = (props) => {
  const favicon = getFavicon(props.websiteId)

  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={classNames(
            active ? "bg-pink-50 text-pink-400" : "",
            "flex w-full min-w-fit items-center px-4 py-2 pr-8 text-left text-sm transition-all duration-300 ease-in-out"
          )}
          onClick={() => {
            props.onChangeWebsite({ websiteId: props.websiteId })
          }}
        >
          <img src={favicon} className="mr-2 h-4 w-4" />
          <div className="flex w-full items-center whitespace-nowrap pr-2">
            {props.websiteId}
          </div>
        </button>
      )}
    </Menu.Item>
  )
}
