import React, { ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { FoudroyerLink } from "../../general/FoudroyerLink/FoudroyerLink"
import { ButtonPrimary, ButtonSecondary } from "../../ui/Button/Button"
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
      <Container className="flex flex-col items-center justify-center py-6 md:py-10 text-center relative">
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

        {!props.authenticated ? (
          <div className="flex gap-x-4 mt-4">
            <ButtonPrimary size="sm">
              <FormattedMessage id="landing/try" />
            </ButtonPrimary>
            <FoudroyerLink to="/#demo">
              <ButtonSecondary size="sm">See demo</ButtonSecondary>
            </FoudroyerLink>
          </div>
        ) : null}
      </Container>
    </div>
  )
}

export const ContainerRedux: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const Hero = connector(ContainerRedux)
