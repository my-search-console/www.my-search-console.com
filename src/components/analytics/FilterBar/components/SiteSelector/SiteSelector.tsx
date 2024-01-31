import { Fragment, useEffect } from "react"
import { Menu, Transition } from "@headlessui/react"
import React from "react"
import classNames from "classnames"
import {
  ButtonSecondary,
  getSecondaryStyle,
} from "../../../../UI/Button/Button"
import { ChevronDownIcon, Cog6ToothIcon } from "@heroicons/react/20/solid"
import { SiteSelectorItem } from "./SiteSelectorItem"
import { ContainerProps, connector } from "./containers/SiteSelector.container"
import { PlusIcon } from "@heroicons/react/20/solid"
import {
  PaymentPlansEntity,
  WebsiteEntity,
} from "@my-search-console/interfaces"

export const Wrapper: React.FC<{
  onMount: () => void
  onCreateWebsite: () => void
  onChangeWebsite: (params: { websiteId: string }) => void
  websites: WebsiteEntity[]
  active: WebsiteEntity | null
  fetching: boolean
  isPremium: boolean
  readonly: boolean
  plans: Set<PaymentPlansEntity>
}> = (props) => {
  useEffect(() => {
    props.onMount()
  }, [])

  const favicon = props.active?.image || "/websites/no-favicon.svg"

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
        <>
          <Menu.Button
            type="button"
            className={classNames(
              getSecondaryStyle({ size: "sm" }),
              "bg-white"
            )}
          >
            {<img src={favicon} className="h-4 w-4" />}

            <div className="ml-2 hidden max-w-xs whitespace-nowrap font-display text-sm font-medium md:flex">
              {props.active.id}
            </div>

            {!props.readonly && (
              <div className="ml-1">
                <ChevronDownIcon className="h-5 w-5" />
              </div>
            )}
          </Menu.Button>

          {/* <div className="ml-1 inline-block">
            <ButtonSecondary size="sm">
              <Cog6ToothIcon className="h-4 w-4" />
            </ButtonSecondary>
          </div> */}
        </>
      )}
      {!props.readonly && (
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
              <div
                className={classNames(
                  "mt-1 flex w-full cursor-pointer items-center px-4 py-2 text-left text-sm transition-all duration-300 ease-in-out",
                  "hover:bg-blue-50 hover:text-blue-400"
                )}
                onClick={props.onCreateWebsite}
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Add a new website
              </div>
            </Menu.Item>

            <hr className="my-1 border-slate-100" />

            <div className="py-1">
              {!props.fetching &&
                props.websites.map((website, websiteIndex) => {
                  return (
                    <SiteSelectorItem
                      key={website.id}
                      websiteId={website.id}
                      websiteFavicon={website.image}
                      onChangeWebsite={props.onChangeWebsite}
                      isPremium={false}
                      disabled={false}
                    />
                  )
                })}
            </div>
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const SiteSelector = connector(Container)
