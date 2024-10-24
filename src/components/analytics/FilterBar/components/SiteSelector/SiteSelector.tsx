import { Menu, Transition } from "@headlessui/react"
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"
import React, { Fragment, useEffect } from "react"
import { getFavicon } from "../../../../../utils/getFavicon"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { FoudroyerLink } from "../../../../general/FoudroyerLink/FoudroyerLink"
import { getSecondaryStyle } from "../../../../ui/Button/Button"
import { connector, ContainerProps } from "./containers/SiteSelector.container"
import { SiteSelectorItem } from "./SiteSelectorItem"

export const Wrapper: React.FC<ContainerProps> = (props) => {
  useEffect(() => {
    props.onMount()
  }, [])

  const favicon = getFavicon(props.active?.id as string)

  return (
    <Menu as="div" className="ml-2 w-full sm:relative sm:w-auto">
      {props.fetching && (
        <Menu.Button
          type="button"
          className={classNames(getSecondaryStyle({ size: "sm" }), "bg-white")}
        >
          <span className="h-5 w-5 animate-pulse rounded-md bg-slate-200"></span>
          <span className="ml-2 h-5 w-32 animate-pulse rounded-md bg-slate-200"></span>
        </Menu.Button>
      )}
      {!props.fetching && props.active && (
        <Menu.Button
          type="button"
          className={classNames(getSecondaryStyle({ size: "sm" }), "bg-white")}
        >
          {<img src={favicon} className="h-4 w-4" />}

          <div className="ml-2 hidden max-w-xs whitespace-nowrap font-display text-sm font-medium md:flex">
            {props.active.id}
          </div>

          <div className="ml-1">
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        </Menu.Button>
      )}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="site-selector-scroll-mobile md:site-selector-scroll-desktop absolute left-0 z-10 mt-2 w-full min-w-fit origin-top-right rounded-md bg-white font-display font-medium shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:max-w-sm">
          <Menu.Item>
            <FoudroyerLink
              className={classNames(
                "mt-1 flex w-full items-center px-4 py-2 text-left text-sm transition-all duration-300 ease-in-out",
                "hover:bg-pink-50 hover:text-pink-400"
              )}
              to="/"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              <FormattedMessage id="general/site-selector/select-all" />
            </FoudroyerLink>
          </Menu.Item>

          <hr className="my-1 border-slate-100" />

          <div className="py-1">
            {!props.fetching &&
              props.websites.map((website, websiteIndex) => {
                return (
                  <SiteSelectorItem
                    key={website.id}
                    websiteId={website.id}
                    onChangeWebsite={props.onChangeWebsite}
                  />
                )
              })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export const SiteSelector = connector(Wrapper)
