import { ArrowPathIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"
import React, { ReactElement, ReactNode } from "react"

export const BaseStyle =
  "inline-flex items-center px-6 h-12 font-display font-semibold text-sm transition duration-300 ease-in-out rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"

export const SmallStyle =
  "inline-flex items-center px-4 h-10 font-display font-semibold text-sm transition duration-300 ease-in-out rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"

export const XsStyle =
  "inline-flex items-center px-2 h-8 font-display font-semibold text-sm transition duration-300 ease-in-out rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"

export const BigStyle =
  "inline-flex items-center justify-center font-display px-8 h-14 text-lg font-semibold transition-all duration-300 transform rounded-md"

type ButtonProps = {
  onClick?: () => void
  className?: string
  type?: "button" | "submit"
  size?: "md" | "lg" | "sm" | "xs"
  fullWidth?: boolean
  children: ReactElement | ReactNode
  disabled?: boolean
  active?: boolean
  needsConfirmation?: boolean
  confirmationText?: ReactElement | ReactNode
  fetching?: boolean
}

export const ButtonPrimary: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  const style =
    props.size === "lg"
      ? BigStyle
      : props.size === "sm"
      ? SmallStyle
      : BaseStyle

  return (
    <div>
      <button
        onClick={props.fetching ? () => false : props.onClick}
        type={props.type || "button"}
        disabled={props.disabled || props.fetching}
        className={classNames(
          style,
          props.fullWidth ? "w-full justify-center" : "",
          props.fetching && "gap-1",
          "shadow-btn border border-slate-950 bg-slate-800 text-white shadow-slate-950  hover:bg-slate-800 focus:ring-pink-400 disabled:cursor-not-allowed disabled:border-0 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none",
          props.className
        )}
      >
        {props.fetching && <ArrowPathIcon className="h-5 w-5 animate-spin" />}
        {children}
      </button>
    </div>
  )
}

export const getSecondaryStyle = (
  props: Pick<ButtonProps, "fullWidth" | "size" | "active" | "disabled">
) => {
  const style =
    props.size === "lg"
      ? BigStyle
      : props.size === "sm"
      ? SmallStyle
      : props.size === "xs"
      ? XsStyle
      : BaseStyle

  return classNames(
    style,
    props.fullWidth ? "w-full justify-center" : "",
    props.active
      ? "bg-pink-50 text-pink-400 !border-pink-200 !shadow-none"
      : "text-slate-900 bg-white",
    "hover:bg-pink-50 hover:border-pink-200 hover:shadow-pink-200 hover:text-pink-400 focus:ring-pink-400 shadow-btn shadow-slate-200 border border-slate-200",
    "disabled:bg-slate-50 disabled:border-slate-100 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed"
  )
}

export const ButtonSecondary: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  const style = getSecondaryStyle({
    fullWidth: props.fullWidth,
    size: props.size,
    active: props.active,
    disabled: props.disabled,
  })

  return (
    <button
      type={props.type || "button"}
      disabled={props.disabled || props.fetching}
      onClick={props.fetching ? () => false : props.onClick}
      className={classNames(style, props.fetching && "gap-1")}
    >
      {props.fetching && <ArrowPathIcon className="h-5 w-5 animate-spin" />}
      {children}
    </button>
  )
}
