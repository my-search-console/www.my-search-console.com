import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"
import React, { Fragment } from "react"
import { getSecondaryStyle } from "../../../../../../ui/Button/Button"
import { connector, ContainerProps } from "./containers/Devices.container"

import {
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  NoSymbolIcon,
} from "@heroicons/react/20/solid"
import { FormattedMessage } from "../../../../../../general/FormattedMessage/FormattedMessage"

const getLogoFromDevice = (device: "desktop" | "tablet" | "mobile" | null) => {
  if (device === "desktop") return <ComputerDesktopIcon className="h-4 w-4" />
  if (device === "mobile") return <DevicePhoneMobileIcon className="h-4 w-4" />
  if (device === "tablet") return <DeviceTabletIcon className="h-4 w-4" />

  return <FunnelIcon className="h-4 w-4" />
}

export const Wrapper: React.FC<{
  onChange: (params: { device: "desktop" | "tablet" | "mobile" | null }) => void
  device: "desktop" | "tablet" | "mobile" | null
}> = (props) => {
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
        <div className="ml-2 flex max-w-xs items-center space-x-1 whitespace-nowrap font-display text-sm font-medium capitalize md:flex">
          {getLogoFromDevice(props.device)}
          <span className="hidden sm:inline">{props.device || "Device"}</span>
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
        <Menu.Items className="site-selector-scroll-mobile md:site-selector-scroll-desktop absolute right-0 z-10 mt-2 w-full min-w-fit origin-top-left rounded-md bg-white font-display font-medium shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:max-w-sm">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-pink-50 text-pink-400" : "",
                    "flex w-full min-w-fit items-center py-2 pl-4 text-left text-sm transition-all duration-300 ease-in-out"
                  )}
                  onClick={() => props.onChange({ device: "desktop" })}
                >
                  <div className="flex w-full items-center  space-x-1 pr-2">
                    <ComputerDesktopIcon className="h-4 w-4" />
                    <p className="overflow-hidden">Desktop</p>
                  </div>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-pink-50 text-pink-400" : "",
                    "flex w-full min-w-fit items-center py-2 pl-4 text-left text-sm transition-all duration-300 ease-in-out"
                  )}
                  onClick={() => props.onChange({ device: "mobile" })}
                >
                  <div className="flex w-full items-center  space-x-1 pr-2">
                    <DevicePhoneMobileIcon className="h-4 w-4" />
                    <p className="overflow-hidden">Mobile</p>
                  </div>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-pink-50 text-pink-400" : "",
                    "flex w-full min-w-fit items-center py-2 pl-4 text-left text-sm transition-all duration-300 ease-in-out"
                  )}
                  onClick={() => props.onChange({ device: "tablet" })}
                >
                  <div className="flex w-full items-center  space-x-1 pr-2">
                    <DeviceTabletIcon className="h-4 w-4" />
                    <p className="overflow-hidden">Tablet</p>
                  </div>
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-pink-50 text-pink-400" : "",
                    "flex w-full min-w-fit items-center px-4 py-2 text-left text-sm transition-all duration-300 ease-in-out"
                  )}
                  onClick={() => props.onChange({ device: null })}
                >
                  <div className="flex w-full items-center space-x-1 whitespace-nowrap pr-2">
                    <NoSymbolIcon className="h-4 w-4" />
                    <p className="overflow-hidden">
                      <FormattedMessage id="keywords/filter/no-filter" />
                    </p>
                  </div>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const Devices = connector(Container)
