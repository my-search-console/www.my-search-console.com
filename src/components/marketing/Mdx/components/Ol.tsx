import React from "react"

export const Ol = ({ children, id }) => (
  <div className="px-4 md:max-w-3xl mx-auto container">
    <ol
      className="mb-4 text-base md:text-lg list-decimal list-inside text-slate-500"
      id={id}
    >
      {children}
    </ol>
  </div>
)
