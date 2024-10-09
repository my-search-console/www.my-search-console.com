import { WebsiteEntity } from "@foudroyer/interfaces"
import { Dialog } from "@headlessui/react"
import { ArrowDownTrayIcon, KeyIcon } from "@heroicons/react/20/solid"
import React from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ButtonPrimary, ButtonSecondary } from "../../uiii/Button/Button"
import { Modal } from "../../uiii/Modal/Modal"
import {
  connector,
  ContainerProps,
} from "./containers/IndexNowCheckModal.containers"

type Props = {
  isOpen: boolean
  isFetching: boolean
  website: WebsiteEntity | null
  onClose: () => void
  onCheck: (website: WebsiteEntity | null) => void
  onDownload: (website: WebsiteEntity | null) => void
}

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="max-w-md">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
          <KeyIcon className="h-6 w-6 text-pink-500" aria-hidden="true" />
        </div>
        <div className="mt-3  sm:mt-5">
          <Dialog.Title
            as="h3"
            className="font-display text-center text-base font-semibold leading-6 text-slate-900"
          >
            <FormattedMessage id="indexation/modal/index-now/need-key/title"></FormattedMessage>
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-slate-500">
              <FormattedMessage
                id="indexation/modal/index-now/need-key/description"
                values={{
                  // @ts-ignore
                  p: (value) => (
                    <p className="mt-2 text-left text-slate-500">{value}</p>
                  ),
                  // @ts-ignore
                  a: (value) => (
                    <a
                      href="https://blog.foudroyer.com/documentation/how-to-install-indexnow-key/"
                      target={"_blank"}
                      className="text-blue-500 underline"
                    >
                      {value}
                    </a>
                  ),
                }}
              />
            </p>
          </div>

          <div className="mt-4">
            <p className="text-sm font-display text-amber-500 bg-amber-50 p-4 rounded-md border border-amber-100">
              <FormattedMessage id="indexation/modal/index-now/need-key/warning-shopify" />
            </p>
          </div>
        </div>
        <div className="mt-5 flex gap-4 sm:mt-6">
          <ButtonPrimary
            fullWidth
            size="md"
            onClick={() => props.onDownload(props.website)}
          >
            <ArrowDownTrayIcon className="mr-1 h-5 w-5" />{" "}
            <FormattedMessage id="indexation/modal/index-now/need-key/download" />
          </ButtonPrimary>{" "}
          <ButtonSecondary
            fullWidth
            size="md"
            onClick={() => props.onCheck(props.website)}
          >
            <FormattedMessage id="indexation/modal/index-now/need-key/verify" />
          </ButtonSecondary>
        </div>
      </div>
    </Modal>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const IndexNowCheckModal = connector(Container)
