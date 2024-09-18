import React from "react"
import ReactMarkdown from "react-markdown"
import { Container } from "../../UI/Container"

export const Text: React.FC<{
  value: any
}> = (props) => {
  return (
    <Container>
      <ReactMarkdown
        components={{
          p: (value) => (
            <p
              className="mx-auto max-w-3xl text-lg leading-8 text-slate-500"
              {...value}
            />
          ),
        }}
      >
        {props.value}
      </ReactMarkdown>
    </Container>
  )
}
