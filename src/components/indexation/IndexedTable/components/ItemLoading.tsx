import classNames from "classnames"
import React from "react"

export const ItemLoading: React.FC<{
  delay: number
  dark?: boolean
  className?: string
}> = (props) => (
  <div
    className={classNames(
      `h-14 w-full animate-pulse rounded-md ${
        props.dark ? "bg-slate-300" : "bg-slate-200"
      }`,
      props.className
    )}
    style={{
      animationDuration: "700ms",
      animationDelay: `${props.delay}ms`,
    }}
  ></div>
)
