import { ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import React from "react"
import { ButtonSecondary } from "../../UI/Button/Button"
import { FormattedMessage } from "../FormattedMessage/FormattedMessage"
import { Navbar } from "../Navbar/Navbar"
import { Seo } from "../Seo/Seo"
import Illustration from "./assets/scope-not-found.mp4"
import {
  connector,
  ContainerProps,
} from "./containers/ScopeNotFoundModal.containers"

type Props = {
  onLogin: () => void
}

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <>
      <Seo title={""} description={""} lang={"en"} langUrls={[]} />
      <Navbar />
      <div className="relative mx-auto mt-8 max-w-xl">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink-50">
          <ExclamationTriangleIcon
            className="h-6 w-6 text-pink-400"
            aria-hidden="true"
          />
        </div>

        <div className="mt-3 sm:mt-5">
          <div className="text-center font-display text-base font-semibold leading-6 text-slate-900">
            <FormattedMessage id="modal/source-not-found/title" />
          </div>
          <div className="mt-2">
            <p className="text-sm text-slate-500">
              <FormattedMessage id="google/auth/scope-not-found" />
            </p>
          </div>

          <video
            src={Illustration}
            className="mt-2 rounded-lg"
            autoPlay
            muted
            loop
          ></video>
        </div>

        <div className="mt-4">
          <ButtonSecondary fullWidth size="md" onClick={props.onLogin}>
            <FormattedMessage id="modal/source-not-found/submit" />
          </ButtonSecondary>
        </div>
      </div>
    </>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const ScopeNotFoundModal = connector(Container)
