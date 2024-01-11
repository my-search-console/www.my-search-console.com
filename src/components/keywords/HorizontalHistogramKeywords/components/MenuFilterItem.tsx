import { Menu } from "@headlessui/react"
import { RankingOrderByType } from "../../../../entities/RankingWebsiteEntity"
import classNames from "classnames"
import React from "react"
import { FormattedMessage } from "../../../general/FormattedMessage/FormattedMessage"

export const MenuFilterItem: React.FC<{
  onChangeView: (view: RankingOrderByType) => void
  type: RankingOrderByType
}> = (props) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={classNames(
            active ? "bg-pink-100 text-pink-500" : "",
            "block w-full px-4 py-2 text-left text-sm transition-all duration-300 ease-in-out"
          )}
          onClick={() => props.onChangeView(props.type)}
        >
          <FormattedMessage id={`analytics/histogram/filter/${props.type}`} />
        </button>
      )}
    </Menu.Item>
  )
}
