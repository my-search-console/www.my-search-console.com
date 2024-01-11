import React from "react"
import {
  connector,
  ContainerProps,
} from "./containers/UpdateSitemapModal.containers"
import ExclamationIcon from "@heroicons/react/20/solid/ExclamationCircleIcon"
import { ButtonPrimary } from "../../UI/Button/Button"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { Modal } from "../../UI/Modal/Modal"
import { Dialog } from "@headlessui/react"
import { ArrowPathIcon } from "@heroicons/react/20/solid"

type Props = {
  isOpen: boolean
  fetching: boolean
  sitemap: string | null
  onChange: (sitemap: string) => void
  onSubmit: () => void
  onClose: () => void
}

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="relative max-w-md overflow-hidden">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
          <ExclamationIcon
            className="h-6 w-6 text-pink-500"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="font-display text-base font-semibold leading-6 text-slate-900"
          >
            <FormattedMessage id="update-sitemap/title" />
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-slate-500">
              <FormattedMessage id="update-sitemap/description" />
            </p>
          </div>
        </div>
        <div>
          <label
            htmlFor="username"
            className="mt-4 block text-sm font-medium leading-6 text-slate-800"
          >
            <FormattedMessage id="update-sitemap/input/placeholder" />
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 sm:max-w-md">
              <input
                type="text"
                autoComplete="off"
                className="block flex-1 border-0 bg-transparent py-2.5 pl-3 text-slate-900 placeholder:text-slate-300 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="https://www.example.com/sitemap.xml"
                value={props.sitemap || ""}
                onChange={(e) => props.onChange(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <ButtonPrimary fullWidth size="md" onClick={props.onSubmit}>
            {props.fetching && (
              <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            <FormattedMessage id="update-sitemap/submit" />
          </ButtonPrimary>
        </div>
      </div>
    </Modal>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const UpdateSitemapModal = connector(Container)
