import React, { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { FormattedMessage } from "../FormattedMessage/FormattedMessage"
import { useLocation } from "@reach/router"
import {
  connector,
  ContainerProps,
} from "./containers/SelectLanguageModal.containers"
import languages from "../../../constants/languages.json"
import { normalizeUrl } from "../../../utils/normalizeUrl"
import { ButtonSecondary } from "../../UI/Button/Button"
import { Modal } from "../../UI/Modal/Modal"

export const Wrapper: React.FC<{}> = (props) => {
  const location = useLocation()

  const isOpen = location.href?.includes("change-lang-modal=open") || false

  return (
    <Modal isOpen={isOpen} onClose={() => window?.history.back()}>
      <div className="flex max-w-md flex-wrap gap-4">
        {languages.map((lang) => (
          <a
            href={normalizeUrl({
              url: location.pathname,
              locale: lang.id,
              removeLocaleIfExists: true,
            })}
            key={lang.id}
            className="w-1/4 grow cursor-pointer rounded bg-slate-50 py-5 font-display font-medium outline-none transition-all duration-300 ease-in-out hover:border-blue-100 hover:bg-blue-50 hover:text-blue-400 focus:ring-2"
          >
            <img
              className="mx-auto block h-7 w-7 rounded-full"
              src={`/flags/${lang.id}.svg`}
            />
            <div className="mt-2 px-2 text-center">{lang.label}</div>
          </a>
        ))}
      </div>

      <div className="mt-4">
        <ButtonSecondary onClick={() => window?.history.back()} fullWidth>
          Close
        </ButtonSecondary>
      </div>
    </Modal>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const SelectLanguageModal = connector(Container)
