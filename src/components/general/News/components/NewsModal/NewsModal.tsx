import React from "react"
import { connector, ContainerProps } from "./containers/NewsModal.containers"
import { Modal } from "../../../../UI/Modal/Modal"
import { Dialog } from "@headlessui/react"
import { BellIcon } from "@heroicons/react/20/solid"
import { useLocation } from "@reach/router"
import { FormattedMessage } from "../../../FormattedMessage/FormattedMessage"
import dayjs from "dayjs"
import { useIntl } from "react-intl"

type Props = {
  onClose: () => void
}

export const Wrapper: React.FC<Props> = (props) => {
  const { hash } = useLocation()
  const intl = useIntl()

  return (
    <Modal isOpen={hash.includes("news-modal")} onClose={props.onClose}>
      <div className="relative max-w-md overflow-hidden">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
          <BellIcon className="h-6 w-6 text-pink-500" aria-hidden="true" />
        </div>
        <div className="mt-3">
          <div className="text-center font-display text-xs text-pink-400">
            {new Intl.DateTimeFormat(intl.locale, {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date("2024-12-26"))}
          </div>
          <Dialog.Title
            as="h3"
            className="text-center font-display  text-base font-semibold leading-6 text-slate-900"
          >
            <FormattedMessage id="news/manual/title" />
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-slate-500">
              <FormattedMessage id="news/manual/description" />
            </p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const NewsModal = connector(Container)
