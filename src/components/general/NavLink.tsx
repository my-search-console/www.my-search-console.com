import clsx from "clsx"
import React, { ReactNode } from "react"
import { FoudroyerLink } from "./FoudroyerLink/FoudroyerLink"

export const NavLink: React.FC<{
  href: string
  children: any
  disabled?: boolean
  isActive?: boolean
  target?: string
  badge?: ReactNode
}> = (props) => {
  return (
    <FoudroyerLink
      to={props.href}
      target={props.target}
      className={clsx(
        "inline-flex h-10 items-center rounded-md px-4 font-display text-sm font-semibold transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2",
        props.disabled && "text-slate-400",
        !props.disabled && "hover:bg-pink-50 hover:text-pink-400",
        props.isActive && "bg-pink-50 text-pink-400"
      )}
    >
      {props.children}
      {props.badge && (
        <span className="ml-2 inline-flex items-center rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800">
          {props.badge}
        </span>
      )}
    </FoudroyerLink>
  )
}
