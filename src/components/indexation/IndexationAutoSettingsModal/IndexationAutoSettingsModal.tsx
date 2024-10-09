import { Dialog, Transition } from "@headlessui/react"
import { ArrowPathIcon } from "@heroicons/react/20/solid"
import { useLocation } from "@reach/router"
import classNames from "classnames"
import React, { Fragment } from "react"
import { ModalKeys } from "../../../entities/ModalEntity"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { Loader } from "../../general/Loader/Loader"
import { ButtonPrimary, ButtonSecondary } from "../../uiii/Button/Button"
import {
  connector,
  ContainerProps,
} from "./containers/IndexationAutoSettingsModal.containers"

type Props = ContainerProps

export const Wrapper: React.FC<Props> = (props) => {
  const { href } = useLocation()
  const url = new URL(href || "https://www.foudroyer.com")

  const isOpen = url.searchParams.has(ModalKeys["indexation-auto-modal"])

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        onClose={() => {
          props.onClose()
        }}
        className={`fixed inset-0 z-40 flex min-w-fit items-end justify-center p-4 sm:items-center`}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900 bg-opacity-90 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 sm:scale-90"
          enterTo="opacity-100 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 sm:scale-100"
          leaveTo="opacity-0 sm:scale-90"
        >
          <Dialog.Panel
            className={classNames(
              "relative z-10 mx-auto flex max-h-full flex-col overflow-auto rounded-md border border-slate-100 bg-white"
            )}
          >
            {props.submitting && <Loader />}

            <div className=" p-4 md:h-auto md:p-8 md:py-8">
              <div className="relative w-full max-w-2xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <ArrowPathIcon
                    className="h-5 w-5 text-blue-500"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 sm:mt-6">
                  <Dialog.Title
                    as="h3"
                    className="font-display text-base font-semibold leading-6 text-slate-900"
                  >
                    <FormattedMessage id="indexation/auto-settings-modal/title" />
                  </Dialog.Title>
                  <div className="">
                    <p className="text-sm text-slate-500">
                      <FormattedMessage id="indexation/auto-settings-modal/description" />
                    </p>
                  </div>

                  <fieldset className="mt-8">
                    <div className="space-y-5">
                      <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                          <input
                            id="auto"
                            name="auto"
                            type="checkbox"
                            checked={props.indexation_auto_activated}
                            onChange={(e) => {
                              props.onChange(
                                "indexation_auto_activated",
                                !props.indexation_auto_activated
                              )
                            }}
                            className="h-4 w-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <label
                            htmlFor="auto"
                            className="font-medium text-slate-900"
                          >
                            <FormattedMessage id="indexation/auto-settings-modal/auto/title" />
                          </label>
                          <p className="text-slate-500">
                            <FormattedMessage id="indexation/auto-settings-modal/auto/description" />
                          </p>
                        </div>
                      </div>
                      <div className="relative ml-6 flex items-start">
                        <div className="flex h-6 items-center">
                          <input
                            id="updates"
                            name="updates"
                            type="checkbox"
                            checked={
                              props.indexation_auto_update_pages_activated
                            }
                            onChange={(e) => {
                              props.onChange(
                                "indexation_auto_update_pages_activated",
                                !props.indexation_auto_update_pages_activated
                              )
                            }}
                            className="h-4 w-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <label
                            htmlFor="updates"
                            className="font-medium text-slate-900"
                          >
                            <FormattedMessage id="indexation/auto-settings-modal/auto-updated/title" />
                          </label>
                          <p className="text-slate-500">
                            <FormattedMessage id="indexation/auto-settings-modal/auto-updated/description" />
                          </p>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className="mt-8 flex items-center justify-between space-x-2">
                  <ButtonSecondary size="sm" onClick={props.onClose}>
                    <FormattedMessage id="indexation/auto-settings-modal/close" />
                  </ButtonSecondary>

                  <ButtonPrimary size="sm" onClick={props.onSave}>
                    <FormattedMessage id="indexation/auto-settings-modal/save" />
                  </ButtonPrimary>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const IndexationAutoSettingsModal = connector(Container)
