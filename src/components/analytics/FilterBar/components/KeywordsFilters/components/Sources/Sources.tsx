import { Fragment, useEffect } from "react"
import { Menu, Transition } from "@headlessui/react"
import React from "react"
import classNames from "classnames"
import { getSecondaryStyle } from "../../../../../../UI/Button/Button"
import {
  ChevronDownIcon,
  NoSymbolIcon,
  RssIcon,
} from "@heroicons/react/20/solid"
import { ContainerProps, connector } from "./containers/Sources.container"

import { useIntl } from "react-intl"
import { SourceYandexButton } from "../../../../../../general/SourceButtons/SourceButtons"
import {
  BingLogo,
  GoogleLogo,
  YandexLogo,
} from "../../../../../../general/SourceLogo/SourceLogo"
import { FormattedMessage } from "../../../../../../general/FormattedMessage/FormattedMessage"

const getLogoFromSource = (source: "google" | "bing" | "yandex" | null) => {
  if (source === "google") return <GoogleLogo className="h-3 w-3" />
  if (source === "bing") return <BingLogo className="h-3 w-3" />
  if (source === "yandex") return <YandexLogo className="h-3 w-3" />

  return <RssIcon className="h-4 w-4" />
}

export const Wrapper: React.FC<{
  onChange: (params: { source: "google" | "bing" | "yandex" | null }) => void
  active: "google" | "bing" | "yandex" | null
  yandexActivated: boolean
  bingActivated: boolean
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
        <div className="ml-2 flex max-w-xs items-center space-x-1 whitespace-nowrap font-display text-sm font-medium capitalize md:flex">
          {getLogoFromSource(props.active)}
          <span className="hidden sm:inline">{props.active || "Source"}</span>
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
        <Menu.Items className="site-selector-scroll-mobile md:site-selector-scroll-desktop absolute right-0 z-10 mt-2 w-fit origin-top-left rounded-md bg-white font-display font-medium shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-pink-50 text-pink-400" : "",
                    "flex w-full min-w-fit items-center py-2 pl-4 text-left text-sm transition-all duration-300 ease-in-out"
                  )}
                  onClick={() => props.onChange({ source: "google" })}
                >
                  <div className="flex w-full items-center space-x-1 pr-2">
                    {getLogoFromSource("google")}
                    <p className="overflow-hidden text-ellipsis">Google</p>
                  </div>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-pink-50 text-pink-400" : "",
                    "flex w-full min-w-fit items-center py-2 pl-4 text-left text-sm transition-all duration-300 ease-in-out",
                    !props.yandexActivated && "cursor-not-allowed opacity-20"
                  )}
                  disabled={!props.yandexActivated}
                  onClick={() => props.onChange({ source: "yandex" })}
                >
                  <div className="flex w-full items-center space-x-1 pr-2">
                    {getLogoFromSource("yandex")}
                    <p className="overflow-hidden text-ellipsis">Yandex</p>
                  </div>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-pink-50 text-pink-400" : "",
                    "flex w-full min-w-fit items-center py-2 pl-4 text-left text-sm transition-all duration-300 ease-in-out",
                    !props.bingActivated && "cursor-not-allowed opacity-20"
                  )}
                  disabled={!props.bingActivated}
                  onClick={() => props.onChange({ source: "bing" })}
                >
                  <div className="flex w-full items-center space-x-1 pr-2">
                    {getLogoFromSource("bing")}
                    <p className="overflow-hidden text-ellipsis">Bing</p>
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
                  onClick={() => props.onChange({ source: null })}
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

export const Sources = connector(Container)
