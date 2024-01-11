import React, { ReactNode } from "react"

export const SettingSection: React.FC<{
  title: ReactNode
  description: ReactNode
  children: any
}> = (props) => {
  return (
    <div className="mt-2 flex max-w-7xl flex-col justify-between rounded-lg border border-slate-100 p-4">
      <div className="font-display text-sm font-medium">{props.title}</div>
      <p className="max-w-3xl text-sm text-slate-500">{props.description}</p>
      <div className="mt-2">{props.children}</div>
    </div>
  )
}
