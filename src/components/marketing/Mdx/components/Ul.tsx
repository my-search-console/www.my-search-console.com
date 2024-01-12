import React from "react"

export const Ul = ({ children, id }) => (
  <div className="px-4 md:max-w-3xl container mx-auto">
    <ul
      className="mb-4 text-base list-disc md:text-lg"
      id={id}
    >
      {children}
    </ul>
  </div>
)

export const Li = ({ children, id }) => <li id={id} className="mb-4">{children}</li>
