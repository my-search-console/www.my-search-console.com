import { Fragment, useEffect } from "react"
import { Menu, Transition } from "@headlessui/react"
import React from "react"
import classNames from "classnames"
import { getSecondaryStyle } from "../../../../../../UI/Button/Button"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { ContainerProps, connector } from "./containers/Countries.container"
import { FormattedMessage } from "../../../../../../general/FormattedMessage/FormattedMessage"
import { countries } from "../../../../../../../constants/countries"
import { useIntl } from "react-intl"
import { Items } from "./components/Items"

export const Wrapper: React.FC<{
  onChangeCountry: (params: { country: string }) => void
  fetching: boolean
  activeCountry: string | null
}> = (props) => {
  const intl = useIntl()

  return (
    <Menu as="div" className="ml-2 w-full sm:relative sm:w-auto">
      <Menu.Button
        type="button"
        className={classNames(
          getSecondaryStyle({ size: "sm" }),
          "bg-white",
          "!px-2"
        )}
      >
        <div className="ml-2  max-w-xs whitespace-nowrap font-display text-sm font-medium md:hidden">
          {
            intl
              .formatMessage({
                id: `country/${props.activeCountry || "unknown"}`,
              })
              .split(" ")[0]
          }
        </div>
        <div className="ml-2 hidden max-w-xs whitespace-nowrap font-display text-sm font-medium md:flex">
          <FormattedMessage
            // @ts-ignore
            id={`country/${props.activeCountry || "unknown"}`}
          />
        </div>

        <div className="ml-1">
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="site-selector-scroll-mobile md:site-selector-scroll-desktop absolute right-0 z-10 mt-2 w-full origin-top-left rounded-md bg-white font-display font-medium shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:min-w-fit sm:max-w-sm">
          <div className="py-1">
            {!props.fetching &&
              countries.map((country) => {
                return (
                  <Items
                    key={country}
                    country={country}
                    onClick={() => props.onChangeCountry({ country })}
                  />
                )
              })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const Countries = connector(Container)
