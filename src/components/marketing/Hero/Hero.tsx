import { StarIcon } from "@heroicons/react/20/solid"
import React, { ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { FoudroyerLink } from "../../general/FoudroyerLink/FoudroyerLink"
import { ButtonPrimary } from "../../UI/Button/Button"
import { Container } from "../../UI/Container"
import { connector, ContainerProps } from "./containers/Hero.containers"

const commenters = [
  {
    image:
      "https://senjaio.b-cdn.net/public/media/022MvnhvcIv4GKNSVxA0jgPy.jpeg?width=100&height=100",
  },
  {
    image:
      "https://senjaio.b-cdn.net/public/media/gK5esfpSIHhVecSvVs7qmDU4.jpeg?width=100&height=100",
  },
  {
    image:
      "https://senjaio.b-cdn.net/public/media/MITMFjhUfgdltHDLJTHslP8L.jpeg?width=100&height=100",
  },
  {
    image:
      "https://senjaio.b-cdn.net/public/media/ys6AdIrdb3dJvXE3kA8Rp16Y.jpeg?width=100&height=100",
  },
  {
    image:
      "https://senjaio.b-cdn.net/public/media/vy0Jhv98lP24mEeeoZYnSFs5.jpeg?width=100&height=100",
  },
]

const Customers = (props: { nbUsers: number }) => (
  <div className="mt-8 flex items-center">
    <div className="ml-4 flex -space-x-2">
      {commenters.map((commenter) => (
        <dd key={commenter.image}>
          <img
            className="h-10 w-10 rounded-full bg-slate-50 ring-2 ring-white"
            src={commenter.image}
            alt={""}
          />
        </dd>
      ))}
    </div>

    <div className="ml-4">
      <div className="flex items-center">
        <StarIcon className="h-5 w-5 text-yellow-400" />
        <StarIcon className="h-5 w-5 text-yellow-400" />
        <StarIcon className="h-5 w-5 text-yellow-400" />
        <StarIcon className="h-5 w-5 text-yellow-400" />
        <StarIcon className="h-5 w-5 text-yellow-400" />
      </div>
      <div className="text-slate-700">
        <FormattedMessage
          id="home/hero/used-by"
          values={{
            nbusers: props.nbUsers,
          }}
        />{" "}
      </div>
    </div>
  </div>
)

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

      <Container className="flex flex-col items-center justify-center  pb-10 pt-20 text-center">
        {props.label && (
          <p className="text-center font-display text-lg font-medium text-pink-400">
            {props.label}
          </p>
        )}
        <h1 className="mx-auto flex max-w-3xl flex-col font-display text-4xl font-semibold leading-tight tracking-tight text-slate-900 ">
          {props.title}
        </h1>

        {props.description && (
          <ReactMarkdown
            className={
              "mx-auto mt-4 max-w-3xl text-lg leading-normal tracking-tight text-slate-500"
            }
          >
            {props.description}
          </ReactMarkdown>
        )}

        <div className="mt-10 flex justify-center gap-x-6">
          {props.authenticated && (
            <div>
              <FoudroyerLink to={"/administration/"}>
                <ButtonPrimary>
                  <FormattedMessage id="landing/access" />
                </ButtonPrimary>
              </FoudroyerLink>
              {/* {!props.hideUsers && <Customers nbUsers={props.nbUsers} />} */}
            </div>
          )}

          {!props.authenticated && (
            <div className="">
              <ButtonPrimary onClick={props.onAuthenticate}>
                <FormattedMessage id="landing/try" />
              </ButtonPrimary>
              {/* <Customers nbUsers={props.nbUsers} /> */}
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export const ContainerRedux: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const Hero = connector(ContainerRedux)
