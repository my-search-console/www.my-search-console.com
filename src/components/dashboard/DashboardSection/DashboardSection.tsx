import React, { ReactElement, ReactNode } from "react"

export const DashboardSection: React.FC<{
  children: ReactElement
  title: ReactNode
  description: ReactNode
}> = (props) => (
  <div>
    <div>
      <div className="font-display text-xl">{props.title}</div>
      <div className="text-slate-400">{props.description}</div>
    </div>

    <div>{props.children}</div>
  </div>
)
