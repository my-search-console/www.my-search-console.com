import React, { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const Cancel: React.FC<Props> = (props) => (
  <div className="absolute left-0 top-0 p-2">
    <div
      className={`group flex transform cursor-pointer items-center transition-all duration-300`}
    >
      <div className="relative z-10 rounded p-2 text-slate-400 transition-all duration-300 ease-in-out group-hover:bg-blue-50 group-hover:text-blue-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-7 w-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div className="-translate-x-8 transform p-2 text-sm font-semibold uppercase text-blue-400 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
        {props.children}
      </div>
    </div>
  </div>
)
