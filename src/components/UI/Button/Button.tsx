import classNames from "classnames"
import React, { ReactElement, ReactNode, useEffect } from "react"

export const BaseStyle =
  "inline-flex items-center px-6 h-12 font-display font-semibold text-sm transition duration-300 ease-in-out rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"

export const SmallStyle =
  "inline-flex items-center px-4 h-10 font-display font-semibold text-sm transition duration-300 ease-in-out rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"

export const BigStyle =
  "inline-flex items-center justify-center font-display px-8 h-14 text-lg font-semibold transition-all duration-300 transform rounded-md"

type ButtonProps = {
  onClick?: () => void
  className?: string
  size?: "md" | "lg" | "sm"
  fullWidth?: boolean
  children: ReactElement | ReactNode
  disabled?: boolean
  active?: boolean
  needsConfirmation?: boolean
  confirmationText?: ReactElement | ReactNode
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
        onClick={props.onClick}
        type="button"
        disabled={props.disabled}
        className={classNames(
          style,
          props.fullWidth ? "w-full justify-center" : "",
          "border border-slate-950 bg-slate-900 text-white shadow-slate-950  hover:bg-slate-800 focus:ring-blue-400 disabled:cursor-not-allowed disabled:border-0 disabled:bg-slate-50 disabled:text-slate-300 disabled:shadow-none",
          props.className
        )}
      >
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
      : BaseStyle

  return classNames(
    style,
    props.fullWidth ? "w-full justify-center" : "",
    props.active
      ? "bg-blue-50 text-blue-400 border-blue-200 shadow-blue-200"
      : "text-slate-900 bg-white",
    "hover:bg-blue-50 hover:border-blue-200 hover:shadow-blue-200 hover:text-blue-400 focus:ring-blue-400 shadow-slate-200 border border-slate-200"
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
      type="button"
      disabled={props.disabled}
      onClick={props.onClick}
      className={classNames(style, props.className)}
    >
      {children}
    </button>
  )
}
