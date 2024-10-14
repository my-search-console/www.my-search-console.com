import React, { ReactNode } from "react"

import { Loader } from "../../general/Loader/Loader"

export const LeaderboardCard: React.FC<{
  children: ReactNode
  title: ReactNode
  description: ReactNode
  fetching: boolean
}> = (props) => {
  return (
    <div className="border relative border-slate-100 rounded-md">
      {props.fetching && <Loader />}

      <div className="p-4">
        <div className="font-display text-xl text-slate-900">{props.title}</div>

        <p className="text-sm text-slate-500 leading-snug">
          {props.description}
        </p>
      </div>
      <div className="relative w-full">{props.children}</div>
    </div>
  )
}
