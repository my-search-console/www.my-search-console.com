import {
  BoltIcon,
  Cog8ToothIcon,
  PresentationChartBarIcon,
  HashtagIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline"
import { useLocation } from "@reach/router"
import clsx from "clsx"
import React, { ReactNode } from "react"
import { FoudroyerLink } from "../FoudroyerLink/FoudroyerLink"
import { ContainerProps, connector } from "./containers/MobileNavbar.container"

const Item: React.FC<{
  children: ReactNode
  to: string
  name: string
}> = (props) => {
  const location = useLocation()

  const isActive = location.pathname.includes(props.to)

  return (
    <div className="flex w-full items-center justify-center py-1 md:p-1">
      <FoudroyerLink
        to={props.to}
        className={clsx(
          "flex h-full w-full items-center justify-center rounded duration-300 ease-in-out hover:bg-pink-50 hover:text-pink-500",
          isActive && " bg-pink-50 text-pink-500"
        )}
      >
        {props.children}
      </FoudroyerLink>
    </div>
  )
}

export const Wrapper: React.FC<{
  activeWebsite: string | null
}> = (props) => {
  return (
    <div
      className={clsx(
        "fixed bottom-0 left-0 right-0 z-10 w-full transform px-2 pb-3 duration-150 ease-in-out md:hidden"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-2xl flex-row rounded-md border border-slate-100 bg-white px-1 md:px-0">
        <Item to={"/indexation/" + props.activeWebsite} name="Indexation">
          <BoltIcon className="h-7 w-7" />
        </Item>

        <Item to={"/analytics/" + props.activeWebsite} name="Analytics">
          <PresentationChartBarIcon className="h7 w-7" />
        </Item>

        <Item to={"/keywords/" + props.activeWebsite} name="Keywords">
          <HashtagIcon className="h-7 w-7" />
        </Item>

        <Item to={"/opportunities/" + props.activeWebsite} name="Settings">
          <LightBulbIcon className="h-7 w-7" />
        </Item>

        <Item to={"/settings/" + props.activeWebsite} name="Settings">
          <Cog8ToothIcon className="h-7 w-7" />
        </Item>
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const MobileNavbar = connector(Container)
