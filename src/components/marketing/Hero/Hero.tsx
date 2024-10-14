import React, { ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import { Container } from "../../ui/Container"
import { connector, ContainerProps } from "./containers/Hero.containers"

export const Wrapper: React.FC<{
  label?: ReactNode
  title: ReactNode
  description: string
  nbUsers: number
  authenticated: boolean
  onAuthenticate: () => void
  hideUsers?: boolean
}> = (props) => {
  return (
    <div className="relative">
      <div
        style={{
          animationDelay: "300ms",
        }}
        className="absolute right-20 top-20 hidden h-20 w-20 animate-bounce  rounded-full bg-pink-50 lg:block"
      ></div>
      <div className="absolute left-20 top-28 hidden h-20 w-20 animate-bounce  rounded-xl bg-blue-50 delay-300 lg:block"></div>

      <Container className="flex flex-col items-center justify-center py-6 md:py-10 text-center">
        {props.label && (
          <p className="text-center font-display md:text-lg font-medium text-slate-500">
            {props.label}
          </p>
        )}
        <h1 className="mx-auto flex max-w-6xl flex-col font-display text-2xl md:text-5xl font-semibold leading-tight tracking-tight text-slate-900 ">
          {props.title}
        </h1>

        {props.description && (
          <ReactMarkdown
            className={
              "mx-auto mt-4 max-w-3xl md:text-lg leading-normal tracking-tight text-slate-900"
            }
          >
            {props.description}
          </ReactMarkdown>
        )}
      </Container>
    </div>
  )
}

export const ContainerRedux: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const Hero = connector(ContainerRedux)
