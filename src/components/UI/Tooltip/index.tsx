import classNames from "classnames"
import React, { ReactNode, useEffect, useRef, useState } from "react"

export const Tooltip: React.FC<{
  direction: "top" | "left" | "bottom" | "right"
  align?: "left" | "right" | "center"
  label: string | number | ReactNode
  fluid?: boolean
  className?: string
  children: ReactNode
}> = (props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  const onEnter = () => setShow(true)
  const onLeave = () => setShow(false)

  useEffect(() => {
    ref.current?.addEventListener("mouseenter", onEnter)
    ref.current?.addEventListener("mouseleave", onLeave)

    return () => {
      ref.current?.removeEventListener("mouseenter", onEnter)
      ref.current?.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <div
      className={classNames(
        `group relative inline-block`,
        props.fluid ? "w-full" : ""
      )}
    >
      <div
        className={`absolute ${
          props.direction === "right"
            ? "-right-2 top-0 h-full translate-x-full"
            : ""
        } ${
          props.direction === "left"
            ? "-left-2 top-0 h-full -translate-x-full"
            : ""
        } ${props.direction === "top" ? "-top-2 -translate-y-full" : ""} ${
          props.direction === "bottom" ? "-bottom-1 translate-y-full" : ""
        } ${props.align === "right" ? "right-0" : ""} ${
          props.align === "center" ? "left-0 right-0 mx-auto" : ""
        } pointer-events-none font-display z-10 flex transform items-center justify-center opacity-0 transition-all duration-300 ease-in-out ${
          show ? "opacity-100 " : ""
        }`}
      >
        <div
          className={`${
            props.direction === "right"
              ? `${show ? "translate-x-0 " : "-translate-x-4"}`
              : ""
          } ${
            props.direction === "left"
              ? `${show ? "translate-x-0 " : "translate-x-4"}`
              : ""
          } ${
            props.direction === "top"
              ? `${show ? "translate-y-0 " : "translate-y-4"}`
              : ""
          } ${
            props.direction === "bottom"
              ? `${show ? "translate-y-0 " : "translate-y-4"}`
              : ""
          } hidden transform items-center justify-center whitespace-nowrap rounded-md bg-slate-900 bg-opacity-90 px-4 py-2 text-xs font-bold text-slate-100 transition-all duration-300 ease-in-out md:flex`}
        >
          {props.label}
        </div>
      </div>

      <div className={props.className} ref={ref}>
        {props.children}
      </div>
    </div>
  )
}
