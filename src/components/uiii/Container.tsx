import clsx from "clsx"
import React from "react"

export function Container({ className = "", ...props }) {
  return (
    <div className={clsx("mx-auto max-w-7xl px-4", className)} {...props} />
  )
}
