import { Dialog } from "@headlessui/react"
import {
  ArrowTopRightOnSquareIcon,
  HandRaisedIcon,
} from "@heroicons/react/20/solid"
import { useLocation } from "@reach/router"
import React from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ButtonPrimary } from "../../ui/Button/Button"
import { Modal } from "../../ui/Modal/Modal"
import {
  connector,
  ContainerProps,
} from "./containers/SupportUsModal.containers"

type Props = {
  onClose: () => void
}

export const Wrapper: React.FC<Props> = (props) => {
  const { href } = useLocation()

  return (
    <Modal isOpen={href.includes("#support-us-modal")} onClose={props.onClose}>
      <div className="relative max-w-md">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink-50">
          <HandRaisedIcon
            className="h-6 w-6 text-pink-400"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-center font-display text-base font-semibold leading-6 text-slate-900"
          >
            <FormattedMessage id="modal/support-us/title" />
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-slate-500">
              <FormattedMessage id="modal/support-us/description" />
            </p>
          </div>
        </div>

        <div className="mt-4">
          <a
            // @todo mettre la bonne url
            href="https://www.producthunt.com/products/foudroyer"
            target="_blank"
            onClick={props.onClose}
          >
            <ButtonPrimary fullWidth size="md">
              <FormattedMessage id="modal/support-us/button" />
              <ArrowTopRightOnSquareIcon className="ml-1 h-5 w-5" />
            </ButtonPrimary>
          </a>
        </div>
      </div>
    </Modal>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const SupportUsModal = connector(Container)
