import React from "react"

export const H1 = ({ children, id }) => (
  <h1
    id={id}
    className="mx-auto max-w-3xl px-4 md:px-0 font-display mt-6 text-4xl font-bold tracking-tight"
  >
    {children}
  </h1>
)

export const H2 = props => (
  <h2
    id={props.id}
    className={`md:max-w-3xl mx-auto md:px-0 font-display px-4 mt-8 md:text-4xl text-3xl font-extrabold tracking-tight`}
  >
    {props.children}
  </h2>
)

export const H3 = ({ children, id }) => (
  <h3
    id={id}
    className="mx-auto md:max-w-3xl px-4 md:px-0 font-display mt-8 md:text-3xl text-2xl font-extrabold tracking-tight"
  >
    {children}
  </h3>
)

export const H4 = ({ children, id }) => (
  <h4
    id={id}
    className="mx-auto md:max-w-3xl md:px-0 font-display mt-8 md:text-3xl text-2xl font-bold tracking-tight"
  >
    {children}
  </h4>
)

export const H5 = ({ children, id }) => (
  <h5
    id={id}
    className="mx-auto md:max-w-3xl md:px-0 px-4 font-display mt-8 md:text-2xl text-xl font-bold tracking-tight"
  >
    {children}
  </h5>
)

export const H6 = ({ children, id }) => (
  <h6
    id={id}
    className="mx-auto md:max-w-3xl md:px-0 font-display px-4 mt-8 text-xl font-bold tracking-tight"
  >
    {children}
  </h6>
)
