import { Dialog } from "@headlessui/react"
import { ArrowRightIcon, PlusCircleIcon } from "@heroicons/react/20/solid"
import { useLocation } from "@reach/router"
import dayjs from "dayjs"
import React, { useState } from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ButtonPrimary, ButtonSecondary } from "../../UI/Button/Button"
import { Modal } from "../../UI/Modal/Modal"
import {
  connector,
  ContainerProps,
} from "./containers/AnalyticsCalendarModal.containers"

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const { href } = useLocation()
  const isOpen = href.includes("calendar")
  const [from, setFrom] = useState(
    dayjs().subtract(1, "month").subtract(4, "days").format("YYYY-MM-DD")
  )
  const [to, setTo] = useState(dayjs().subtract(4, "days").format("YYYY-MM-DD"))

  return (
    <Modal isOpen={isOpen} onClose={props.onClose} className="!p-0">
      <div className="max-w-3xl">
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
          <FormattedMessage id="analytics/calendar-modal/title" />
        </Dialog.Title>
        <p className="mt-2 text-sm text-slate-500">
          <FormattedMessage id="analytics/calendar-modal/description" />
        </p>

        <form
          className="mt-10"
          onSubmit={(e) => {
            e.preventDefault()
            props.onSubmit({ from, to })
          }}
        >
          <div className="sm:grid relative grid-cols-2 gap-8 mt-8">
            <div className="relative">
              <label
                htmlFor="from"
                className="sm:absolute top-0 sm:transform -translate-y-full font-display text-sm font-medium"
              >
                <FormattedMessage id="analytics/calendar-modal/from" />
              </label>
              <input
                type="date"
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                min={dayjs().subtract(16, "month").format("YYYY-MM-DD")}
                className="w-full rounded-md border-slate-300 text-base font-display"
              />
            </div>

            <div className="absolute pointer-events-none sm:flex hidden inset-0 items-center justify-center">
              <ArrowRightIcon className="h-6 w-6 text-slate-900" />
            </div>

            <div className="relative mt-4 sm:mt-0">
              <label
                htmlFor="to"
                className="sm:absolute top-0 sm:transform -translate-y-full font-display text-sm font-medium"
              >
                <FormattedMessage id="analytics/calendar-modal/to" />
              </label>
              <input
                type="date"
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                min={from}
                max={dayjs().format("YYYY-MM-DD")}
                className="w-full rounded-md border-slate-300 text-base font-display"
              />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <ButtonSecondary onClick={props.onClose}>
              <FormattedMessage id="analytics/calendar-modal/cancel" />
            </ButtonSecondary>
            <ButtonPrimary type="submit">
              <FormattedMessage id="analytics/calendar-modal/submit" />
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export const AnalyticsCalendarModal = connector(Wrapper)
