import React from "react"
import * as Shortcodes from "./components"
import ReactMarkdown from "react-markdown"

const components = {
  code: props => <Shortcodes.Code {...props} />,
  p: props => <Shortcodes.Text {...props} />,
  ul: props => <Shortcodes.Ul {...props} />,
  a: props => <Shortcodes.A {...props} />,
  ol: props => <Shortcodes.Ol {...props} />,
  li: props => <Shortcodes.Li {...props} />,
  h1: props => <Shortcodes.H1 {...props} />,
  h2: props => <Shortcodes.H2 {...props} />,
  h3: props => <Shortcodes.H3 {...props} />,
  h4: props => <Shortcodes.H4 {...props} />,
  h5: props => <Shortcodes.H5 {...props} />,
  h6: props => <Shortcodes.H6 {...props} />,
  hr: props => <Shortcodes.Separator {...props} />,
}

export const Mdx = ({ children }) => {
  return (
    <div className="text-slate-900 text-base md:text-lg">
      <ReactMarkdown components={{ ...Shortcodes, ...components }}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
