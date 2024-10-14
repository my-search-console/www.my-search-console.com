import React, { ReactNode } from "react"

type Props = {
  title: ReactNode
  description: ReactNode
}

export const HelperBlock: React.FC<Props> = (props) => {
  return (
    <div className="rounded-md border border-slate-100 p-4">
      <div className="font-display text-sm">{props.title}</div>
      <p className="text-sm text-slate-500">{props.description}</p>
    </div>
  )
}
