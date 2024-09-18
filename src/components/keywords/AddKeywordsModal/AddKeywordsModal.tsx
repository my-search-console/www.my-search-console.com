import { Dialog } from "@headlessui/react"
import React from "react"
import { ButtonPrimary, ButtonSecondary } from "../../UI/Button/Button"
import {
  connector,
  ContainerProps,
} from "./containers/AddKeywordsModal.containers"

import { ArrowUturnLeftIcon, PlusCircleIcon } from "@heroicons/react/20/solid"
import { useIntl } from "react-intl"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { Loader } from "../../general/Loader/Loader"
import { Modal } from "../../UI/Modal/Modal"
import { Keyword } from "./components/Keyword/Keyword"

type Props = {
  isOpen: boolean
  isFetching: boolean
  canSubmit: boolean
  selectedKeywordsToCreate: Array<string>
  keywordInput: string
  onClose: () => void
  onSubmit: () => void
  onChange: (newValue: string) => void
  onAddToSelectedKeywordsToCreate: () => void
  onRemoveFromSelectedKeywordsToCreate: (keyword: string) => void
}

export const Wrapper: React.FC<Props> = (props) => {
  const intl = useIntl()

  return (
    <Modal
      isOpen={props.isOpen}
      className="w-full max-w-xl"
      onClose={props.onClose}
    >
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
          <PlusCircleIcon
            className="h-6 w-6 text-pink-500"
            aria-hidden="true"
          />
        </div>
        <Dialog.Title
          as="h3"
          className="mt-4 w-full text-center font-display text-base font-semibold leading-6 text-slate-900"
        >
          <FormattedMessage id="keywords/add-keyword-modal/title" />
        </Dialog.Title>
        <p className="mt-2 text-sm text-slate-500">
          <FormattedMessage id="keywords/add-keyword-modal/description" />
        </p>
        <div className="mt-6 flex w-full">
          <form
            className="relative flex flex-grow items-stretch"
            onSubmit={(e) => {
              e.preventDefault()
              props.onAddToSelectedKeywordsToCreate()
            }}
          >
            <div className="absolute inset-y-0 right-0 flex items-center p-2">
              <button className="h-full rounded bg-slate-50 px-4 font-display transition-all duration-300 ease-in-out hover:bg-pink-50 hover:text-pink-400">
                <span className="hidden md:inline">
                  <FormattedMessage id="keywords/add-keyword-modal/input/add" />
                </span>
                <ArrowUturnLeftIcon className="ml-1 inline-block h-4 w-4 -scale-y-100 transform" />
              </button>
            </div>
            <input
              type={"text"}
              autoComplete="off"
              className="block h-14 w-full rounded-md border-slate-100 pl-4 text-sm text-slate-900 placeholder-slate-400 focus:border-pink-300 focus:ring-pink-300"
              placeholder={intl.formatMessage({
                id: "keywords/add-keyword-modal/input/placeholder",
              })}
              value={props.keywordInput}
              onChange={(e) => props.onChange(e.target.value || "")}
            />
          </form>
        </div>
      </div>

      <div className="mt-2">
        <ul className="flex flex-wrap gap-2">
          {props.selectedKeywordsToCreate.map((keyword) => {
            return (
              <li key={keyword}>
                <Keyword
                  onClick={() =>
                    props.onRemoveFromSelectedKeywordsToCreate(keyword)
                  }
                  keyword={keyword}
                />
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mt-6 flex w-full justify-between">
        <ButtonSecondary size="md" onClick={props.onClose}>
          <FormattedMessage id="keywords/add-keyword-modal/cta/cancel" />
        </ButtonSecondary>

        <ButtonPrimary
          disabled={!props.canSubmit}
          size="md"
          onClick={props.onSubmit}
        >
          <FormattedMessage id="keywords/add-keyword-modal/cta/submit" />
        </ButtonPrimary>
      </div>
      {props.isFetching && (
        <Loader
          additionnalText={
            <FormattedMessage id="keywords/add-keyword-modal/loader" />
          }
        />
      )}
    </Modal>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const AddKeywordsModal = connector(Container)
