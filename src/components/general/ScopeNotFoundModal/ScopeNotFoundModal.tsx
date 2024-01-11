import React from "react"
import {
  connector,
  ContainerProps,
} from "./containers/ScopeNotFoundModal.containers"
import { ButtonPrimary } from "../../UI/Button/Button"
import { FormattedMessage } from "../FormattedMessage/FormattedMessage"
import { Modal } from "../../UI/Modal/Modal"
import { Dialog } from "@headlessui/react"
import {
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid"
import { useLocation } from "@reach/router"
import Illustration from "./assets/scope-not-found.mp4"

type Props = {
  onClose: () => void
}

export const Wrapper: React.FC<Props> = (props) => {
  const location = useLocation()

  const isOpen = location.href?.includes("scope-not-found") || false

  return (
    <Modal isOpen={isOpen} onClose={props.onClose}>
      <div className="relative max-w-md">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink-50">
          <ExclamationTriangleIcon
            className="h-6 w-6 text-pink-400"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-center font-display text-base font-semibold leading-6 text-slate-900"
          >
            <FormattedMessage id="modal/source-not-found/title" />
          </Dialog.Title>
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
          <ButtonPrimary fullWidth size="md" onClick={props.onClose}>
            <FormattedMessage id="modal/source-not-found/submit" />
          </ButtonPrimary>
        </div>
      </div>
    </Modal>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const ScopeNotFoundModal = connector(Container)
