import React from "react"

import { Dialog } from "@headlessui/react"
import { ArrowPathIcon } from "@heroicons/react/20/solid"
import { useLocation } from "@reach/router"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ButtonPrimary, ButtonSecondary } from "../../ui/Button/Button"
import { Modal } from "../../ui/Modal/Modal"
import {
  connector,
  ContainerProps,
} from "./containers/ResetWebsiteModal.containers"

type Props = {
  onClose: () => void
  onConfirm: () => void
  fetching: boolean
}

export const Wrapper: React.FC<Props> = (props) => {
  const location = useLocation()
  const isOpen = Boolean(location?.href?.includes("reset-website"))

  return (
    <Modal
      isOpen={isOpen}
      onClose={props.onClose}
      className="max-w-4xl"
      leavePaddingTop
    >
      <div className="max-w-2xl">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
          <ArrowPathIcon className="h-6 w-6 text-pink-500" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="font-display text-base font-semibold leading-6 text-slate-900"
          >
            <FormattedMessage id="websites/reset-data/modale/title" />
          </Dialog.Title>
          <div className="">
            <p className="text-sm text-slate-500">
              <FormattedMessage id="websites/reset-data/modale/description" />
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center space-x-2">
          <ButtonSecondary size="sm" onClick={props.onClose}>
            <FormattedMessage id="websites/reset-data/modale/cancel" />
          </ButtonSecondary>
          <ButtonPrimary
            size="sm"
            onClick={props.onConfirm}
            fetching={props.fetching}
          >
            <FormattedMessage id="websites/reset-data/modale/confirm" />
          </ButtonPrimary>
        </div>
      </div>
    </Modal>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const ResetWebsiteModal = connector(Container)
