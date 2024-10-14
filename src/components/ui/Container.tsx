import clsx from "clsx"
import React from "react"

export const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <div
      {...props}
      className={clsx("mx-auto max-w-7xl px-4", props?.className)}
    />
  )
}
