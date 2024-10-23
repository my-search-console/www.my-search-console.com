import clsx from "clsx"
import React from "react"

export const PageHeading: React.FC<{
  title: any
  description: any
  isBorder?: boolean
}> = (props) => {
  return (
    <div
      className={clsx(
        " mx-auto w-full max-w-7xl space-y-20 px-6 pt-8",
        props.isBorder && "border-t border-slate-100"
      )}
    >
      <section id="product-marketing" className="scroll-mt-28">
        <h2 className="font-display text-xl font-bold text-slate-900">
          {props.title}
        </h2>

        <p className="mt-3 max-w-2xl text-sm text-slate-500">
          {props.description}
        </p>
      </section>
    </div>
  )
}
