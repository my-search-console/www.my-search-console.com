import React from "react"
export const ItemLoading: React.FC<{ delay: number; dark?: boolean }> = ({
  delay,
  dark,
}) => (
  <div
    className={`h-14 w-full animate-pulse rounded-md ${
      dark ? "bg-slate-300" : "bg-slate-200"
    }`}
    style={{
      animationDuration: "700ms",
      animationDelay: `${delay}ms`,
    }}
  ></div>
)
