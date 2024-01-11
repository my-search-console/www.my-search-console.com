import { Transition } from "@headlessui/react"
import React from "react"
import { ITranslations } from "../../../interfaces/ITranslations"
import { FormattedMessage } from "../FormattedMessage/FormattedMessage"
import { connector, ContainerProps } from "./containers/CTA.container"

type Props = {
  onCancel?: Function
  onSubmit?: Function
  title: ITranslations["keys"]
  isOpen: boolean
  isLoading: boolean
  description?: ITranslations["keys"]
  label?: {
    submit?: string
    cancel?: string
  }
}

export const CTAWrapper: React.FC<Props> = ({
  isOpen,
  onCancel = () => false,
  onSubmit = () => false,
  isLoading,
  label,
  title,
  description,
}) => (
  <>
    <Transition
      show={isOpen}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-slate-500 opacity-75"></div>
      </div>
    </Transition>

    <Transition
      show={isOpen}
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enterTo="opacity-100 translate-y-0 sm:scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
          {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          ></span>
          &#8203;
          <div
            className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                {/* <!-- Heroicon name: exclamation --> */}
                <svg
                  className="h-6 w-6 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <div
                  className="text-lg font-medium leading-6 text-slate-900"
                  id="modal-headline"
                >
                  <FormattedMessage id={title} />
                </div>
                {description && (
                  <div className="mt-2">
                    <p className="text-sm text-slate-500">
                      <FormattedMessage id={description} />
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
              <button
                type="button"
                onClick={() => (!isLoading ? onSubmit() : false)}
                className={`relative inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto sm:text-sm ${
                  isLoading
                    ? "cursor-not-allowed bg-blue-300 pl-10"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isLoading && (
                  <svg
                    className="absolute left-4 -ml-1 mr-3 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                <FormattedMessage id="indexing/confirm/submit" />
              </button>
              <button
                type="button"
                onClick={() => onCancel()}
                className="mt-3 inline-flex w-full justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-base font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
              >
                <FormattedMessage id="indexing/confirm/cancel" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </>
)

export const CTAContainer: React.FC<ContainerProps> = (props) => (
  <CTAWrapper {...props} />
)

export const CTA = connector(CTAContainer)
