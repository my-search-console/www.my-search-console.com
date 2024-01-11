import React from "react"
import { TrashIcon } from "@heroicons/react/24/outline"
import {
  connector,
  ContainerProps,
} from "./containers/KeywordsStickyBar.container"
import { Transition } from "@headlessui/react"

type Props = {
  isOpen: boolean
  size: number
  onDelete: () => void
}

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <Transition
      show={props.isOpen}
      enterFrom="opacity-0 -translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 -translate-y-1"
      className="sticky top-[70px] z-20 -mt-10 h-10 transform transition-all duration-300 ease-in-out sm:-mt-12 sm:h-12"
    >
      <div className="mx-auto flex w-fit justify-center overflow-hidden rounded-lg border border-slate-100 bg-white shadow">
        <div className="px-4 py-2 font-display text-sm ">
          {props.size} mot(s)-clé(s) sélectionné(s)
        </div>
        <button
          onClick={props.onDelete}
          className="block border-l border-slate-100 px-3 transition-all duration-300 ease-in-out hover:bg-red-50 hover:text-red-500"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </Transition>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const KeywordsStickyBar = connector(Container)
