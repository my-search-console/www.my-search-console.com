import React, { Fragment } from "react"
import { Transition } from "@headlessui/react"
import CheckCircleIcon from "@heroicons/react/20/solid/CheckCircleIcon"
import InformationCircleIcon from "@heroicons/react/20/solid/InformationCircleIcon"
import XCircleIcon from "@heroicons/react/20/solid/XCircleIcon"
import ExclamationIcon from "@heroicons/react/20/solid/ExclamationTriangleIcon"
import XIcon from "@heroicons/react/20/solid/XMarkIcon"
import { connector, ContainerProps } from "./containers/Notifications.container"
import { NotificationEntity } from "../../../entities/NotificationEntity"
import { FormattedMessage } from "../FormattedMessage/FormattedMessage"
import { ButtonPrimary, ButtonSecondary } from "../../UI/Button/Button"
import classNames from "classnames"

const Notification: React.FC<{
  onRemove: () => any
  type: NotificationEntity["type"]
  onValidate?: Function
  message: NotificationEntity["message"]
}> = (props) => {
  return (
    <Transition
      appear={true}
      show
      as={Fragment}
      enter="transform ease-out duration-300 transition-all"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition-all ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        onClick={props.onRemove}
        className={classNames(
          "pointer-events-auto max-w-sm overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-slate-200",
          props.type === "success" ? "" : "w-full"
        )}
      >
        <div className="p-4 pr-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {props.type === "success" && (
                <CheckCircleIcon
                  className="h-6 w-6 text-emerald-400"
                  aria-hidden="true"
                />
              )}
              {props.type === "info" && (
                <InformationCircleIcon
                  className="h-6 w-6 text-blue-400"
                  aria-hidden="true"
                />
              )}
              {props.type === "error" && (
                <XCircleIcon
                  className="h-6 w-6 text-red-400"
                  aria-hidden="true"
                />
              )}
              {props.type === "warning" && (
                <ExclamationIcon
                  className="h-6 w-6 text-pink-400"
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="ml-2 flex-1">
              <p className="whitespace-nowrap font-display text-sm font-medium text-slate-900">
                {props.type === "success" && (
                  <FormattedMessage id="notifications/success" />
                )}
                {props.type === "error" && (
                  <FormattedMessage id="notifications/error" />
                )}
                {props.type === "warning" && (
                  <FormattedMessage id="notifications/warning" />
                )}
                {props.type === "info" && (
                  <FormattedMessage id="notifications/info" />
                )}
              </p>

              {props.type !== "success" && (
                <p className="mt-1 text-sm text-slate-500">
                  <FormattedMessage id={props.message} />
                </p>
              )}

              {props.onValidate && (
                <div className="mt-4 flex space-x-2">
                  <ButtonPrimary
                    size="sm"
                    onClick={() => {
                      if (props.onValidate) {
                        props.onValidate()
                        props.onRemove()
                      }
                    }}
                  >
                    <FormattedMessage id="notifications/actions/validate" />
                  </ButtonPrimary>

                  <ButtonSecondary size="sm" onClick={() => props.onRemove()}>
                    <FormattedMessage id="notifications/actions/decline" />
                  </ButtonSecondary>
                </div>
              )}
            </div>
            {props.type !== "success" && (
              <div className="ml-4 flex flex-shrink-0">
                <button className="inline-flex rounded-md bg-white text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Transition>
  )
}

export type NotificationsProps = {
  notifications: Array<NotificationEntity>
  onRemove?: Function
  test?: Function
}

export const Wrapper: React.FC<NotificationsProps> = ({
  notifications,
  onRemove = () => false,
}) => {
  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {notifications
            .filter(({ type }) => type !== "success")
            .map(({ type, message, id, onValidate }) => (
              <Notification
                key={id}
                type={type}
                message={message}
                onRemove={() => onRemove(id)}
                {...(onValidate ? { onValidate } : {})}
              />
            ))}
        </div>
      </div>

      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 z-50 flex justify-center px-4 py-6  sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4">
          {notifications
            .filter(({ type }) => type === "success")
            .map(({ type, message, id, onValidate }) => (
              <Notification
                key={id}
                type={type}
                message={message}
                onRemove={() => onRemove(id)}
                {...(onValidate ? { onValidate } : {})}
              />
            ))}
        </div>
      </div>
    </>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const Notifications = connector(Container)
