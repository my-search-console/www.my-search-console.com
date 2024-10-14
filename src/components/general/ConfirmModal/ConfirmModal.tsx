import { Dialog, Transition } from "@headlessui/react"
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import { useLocation } from "@reach/router"
import classNames from "classnames"
import React, { Fragment } from "react"
import { ModalKeys } from "../../../entities/ModalEntity"
import { ButtonPrimary, ButtonSecondary } from "../../ui/Button/Button"
import { FormattedMessage } from "../FormattedMessage/FormattedMessage"
import { connector, ContainerProps } from "./containers/ConfirmModal.containers"

type Props = ContainerProps

export const Wrapper: React.FC<Props> = (props) => {
  const { href } = useLocation()
  const url = new URL(href || "https://www.foudroyer.com")

  const isOpen = url.searchParams.has(
    ModalKeys["remove-website-confirmation-modal"]
  )

  const websiteId = url.searchParams.get(
    ModalKeys["remove-website-confirmation-modal"]
  )

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
            <div className=" p-4 md:h-auto md:p-8 md:py-8">
              <div className="relative w-full max-w-2xl">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <ExclamationTriangleIcon
                    className="h-6 w-6 text-red-500"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-6">
                  <Dialog.Title
                    as="h3"
                    className="font-display text-base font-semibold leading-6 text-slate-900"
                  >
                    <FormattedMessage
                      id="remove-website-confirm-modal/title"
                      values={{
                        w: (
                          <span className="text-red-500 underline">
                            {websiteId}
                          </span>
                        ),
                      }}
                    />
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-slate-500">
                      <FormattedMessage id="remove-website-confirm-modal/description" />
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center space-x-2">
                  <ButtonSecondary onClick={props.onClose}>
                    <FormattedMessage id="remove-website-confirm-modal/button/close" />
                  </ButtonSecondary>

                  <ButtonPrimary
                    onClick={() => props.onConfirm(websiteId as string)}
                  >
                    <FormattedMessage id="remove-website-confirm-modal/button/confirm" />
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

export const ConfirmModal = connector(Container)
