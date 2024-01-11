import React, { ReactNode } from "react"

export const Code: React.FC<{ children: ReactNode }> = (props) => (
  <div className="relative mt-2 w-full rounded-md border border-slate-100 bg-slate-50 p-4 text-left font-mono text-xs">
    {props.children}
  </div>
)
