import React, { useEffect } from "react"
import {
  connector,
  ContainerProps,
} from "./containers/IndexationActivateSearchEngineModal.containers"
import { Modal } from "../../UI/Modal/Modal"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { Dialog } from "@headlessui/react"
import { ButtonPrimary } from "../../UI/Button/Button"
import { UserEntity } from "@foudroyer/interfaces"
import tutoVideo from "../../../assets/videos/activate-search-engine.mp4"
import { FoudroyerLink } from "../../general/FoudroyerLink/FoudroyerLink"

type Props = {
  isOpen: boolean
  lang: string
  user: UserEntity | null
  onClose: () => void
}

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} leavePaddingTop>
      <div className="relative max-w-xl overflow-hidden px-2 pb-2">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
          <ExclamationTriangleIcon
            className="h-6 w-6 text-yellow-700"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-center font-display text-base font-semibold leading-6 text-slate-900"
          >
            <FormattedMessage id="indexation/modal/activate-search-engine/title" />
          </Dialog.Title>
          <div className="mt-2">
            <p className="mb-6 text-justify text-sm text-slate-500">
              <FormattedMessage id="indexation/modal/activate-search-engine/description" />
            </p>
          </div>
        </div>
        <div className="mx-auto flex h-full max-w-2xl items-start px-2">
          <video
            src={tutoVideo}
            className="w-full rounded-lg ring-8 ring-blue-50"
            autoPlay
            muted
            loop
          ></video>
        </div>
        <div className="mt-3 sm:mt-5" onClick={props.onClose}>
          <FoudroyerLink to="/dashboard/">
            <ButtonPrimary fullWidth>
              <FormattedMessage id="indexation/modal/activate-search-engine/cta" />
            </ButtonPrimary>
          </FoudroyerLink>
        </div>
      </div>
    </Modal>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const IndexationActivateSearchEngineModalModal = connector(Container)
