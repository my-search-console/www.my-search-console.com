import { UserEntity } from "@foudroyer/interfaces"
import { Dialog, RadioGroup } from "@headlessui/react"
import { PlusCircleIcon } from "@heroicons/react/20/solid"
import { InboxIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import React from "react"
import { getCrispUrl } from "../../../utils/crisp"
import { isUrlValidForFoudroyer } from "../../../utils/isUrlValidForFoudroyer"
import { ButtonPrimary, ButtonSecondary } from "../../UI/Button/Button"
import { Modal } from "../../UI/Modal/Modal"
import { FormattedMessage } from "../FormattedMessage/FormattedMessage"
import { FoudroyerLink } from "../FoudroyerLink/FoudroyerLink"
import { Loader } from "../Loader/Loader"
import {
  connector,
  ContainerProps,
} from "./containers/CreateWebsiteModal.containers"

type Props = {
  websites: { id: string }[]
  type: "google" | "bing" | "yandex"
  selected: string | null
  user: UserEntity
  isOpen: boolean
  isFetching: boolean
  isGlobalFetching: boolean
  onClose: () => void
  onSubmit: () => void
  onSelect: (id: string) => void
}

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} className="max-w-lg">
      <div className="mx-auto ">
        {props.isGlobalFetching && (
          <Loader
            additionnalText={
              <FormattedMessage id="modal/discover-tool/loading" />
            }
          />
        )}
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
          <FormattedMessage id={`modal/add-website/${props.type}/title`} />
        </Dialog.Title>
        <p className="mt-2 text-sm text-slate-500">
          <FormattedMessage
            id={`modal/add-website/${props.type}/description`}
          />
        </p>
        {props.type === "google" && (
          <FoudroyerLink
            className="w-fit text-sm text-blue-500 underline"
            target="_blank"
            to="https://blog.foudroyer.com/documentation/why-is-my-website-not-displayed-or-not-selectable"
          >
            <FormattedMessage id="modal/add-website/help" />
          </FoudroyerLink>
        )}
      </div>

      <div className="mt-4 overflow-auto rounded-md border border-slate-200">
        <RadioGroup
          value={props.selected}
          onChange={(element: string) => {
            props.onSelect(element)
          }}
        >
          <div
            className={classNames(
              "relative z-0 -space-y-px",
              props.isFetching && "h-48",
              !props.isFetching && props.websites.length > 0 && "max-h-96"
            )}
          >
            {props.isFetching && <Loader />}
            {!props.isFetching && props.websites.length === 0 && (
              <div className="p-4 text-center font-display text-sm text-slate-500">
                <InboxIcon className="mx-auto h-6 w-6" />
                <FormattedMessage id="modal/add-website/no-more-websites" />
              </div>
            )}

            {props.websites.map((plan, planIdx) => (
              <RadioGroup.Option
                key={plan.id}
                value={plan.id}
                className={({ checked }) =>
                  classNames(
                    planIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                    planIdx === props.websites.length - 1 ? "" : "border",
                    checked
                      ? "z-10 border-b-pink-100 border-t-pink-100 bg-pink-50"
                      : "border-b-gray-200 border-t-transparent",
                    "relative flex cursor-pointer flex-col border-l-0 border-r-0 p-3 focus:outline-none md:pl-4 md:pr-6"
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <span className="flex items-center text-sm">
                      <span
                        className={classNames(
                          checked
                            ? "border-transparent bg-pink-500"
                            : "border-gray-300 bg-white",
                          active ? "ring-2 ring-pink-500 ring-offset-2" : "",
                          "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border"
                        )}
                        aria-hidden="true"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      </span>
                      <RadioGroup.Label
                        as="span"
                        className={classNames(
                          checked ? "text-pink-500" : "text-gray-900",
                          "ml-3 font-medium",
                          isUrlValidForFoudroyer({ url: plan.id })
                            ? ""
                            : "cursor-not-allowed text-slate-300 line-through"
                        )}
                      >
                        {plan.id
                          .replace("sc-domain:", "")
                          .replace("google:", "")}
                      </RadioGroup.Label>
                    </span>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>

      <a
        target="_blank"
        className="mt-2 block text-center text-xs text-blue-500 underline"
        href={getCrispUrl(props.user)}
      >
        <FormattedMessage id="create-modal/need-help" />
      </a>

      <div className="mt-auto flex w-full justify-between">
        <ButtonSecondary size="md" onClick={props.onClose}>
          <FormattedMessage id="modal/add-website/close" />
        </ButtonSecondary>

        <ButtonPrimary
          disabled={!props.selected}
          size="md"
          onClick={props.onSubmit}
        >
          <FormattedMessage id="modal/add-website/add" />
        </ButtonPrimary>
      </div>
    </Modal>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const CreateWebsiteModal = connector(Container)
