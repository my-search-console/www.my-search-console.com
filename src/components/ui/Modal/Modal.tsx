import { Dialog, Transition } from "@headlessui/react"
import classNames from "classnames"
import React, { Fragment } from "react"
import { Loader } from "../../general/Loader/Loader"

type Props = {
  isOpen: boolean
  className?: string
  onClose: () => void
  children: any
  isConstrainted?: boolean
  leavePaddingTop?: boolean
  isClosable?: boolean
  fetching?: boolean
}

export const Modal: React.FC<Props> = (props) => {
  return (
    <Transition.Root show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        onClose={() => {
          if (props.isClosable === false) return
          props.onClose()
        }}
        className={`fixed inset-0 z-40 flex min-w-fit items-end justify-center p-4 sm:items-center ${
          props.leavePaddingTop ? "pt-24" : ""
        }`}
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
              "relative z-10 mx-auto flex max-h-full flex-col overflow-auto rounded-md border border-slate-100 bg-white",
              props.className
            )}
          >
            {props.fetching && <Loader />}
            <div className=" p-4 md:h-auto md:p-8 md:py-8">
              {props.children}
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}
