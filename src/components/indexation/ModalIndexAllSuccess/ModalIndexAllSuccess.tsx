import { Dialog } from "@headlessui/react"
import { ChartBarIcon, CheckIcon } from "@heroicons/react/20/solid"
import { useLocation } from "@reach/router"
import React from "react"
import { Confetti } from "../../general/Confetti/Confetti"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ButtonSecondary } from "../../uiii/Button/Button"
import { Modal } from "../../uiii/Modal/Modal"
import {
  connector,
  ContainerProps,
} from "./containers/ModalIndexAllSuccess.containers"

type Props = {
  onClose: () => void
}

export const Wrapper: React.FC<Props> = (props) => {
  const { hash } = useLocation()
  const isOpen = hash.includes("index-all-success")

  return (
    <>
      <Modal isOpen={isOpen} onClose={props.onClose}>
        <div className="relative max-w-md overflow-hidden">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <CheckIcon className="h-6 w-6 text-emerald-400" />
          </div>
          <div className="mt-3">
            <Dialog.Title
              as="h3"
              className="text-center font-display  text-base font-semibold leading-6 text-slate-900"
            >
              <FormattedMessage id="modal/index-all-success/title" />
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-slate-500">
                <FormattedMessage
                  id="modal/index-all-success/description"
                  values={{
                    button: () => (
                      <ChartBarIcon className="mx-1 inline h-4 w-4" />
                    ),
                  }}
                />
              </p>
            </div>
            <div className="mt-4 pb-2">
              <ButtonSecondary size="sm" fullWidth onClick={props.onClose}>
                <FormattedMessage id="modal/add-website/close" />
              </ButtonSecondary>
            </div>
          </div>
        </div>
      </Modal>

      <div className="relative z-50">
        <Confetti respawn={false} isOpen={isOpen} />
      </div>
    </>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const ModalIndexAllSuccess = connector(Container)
