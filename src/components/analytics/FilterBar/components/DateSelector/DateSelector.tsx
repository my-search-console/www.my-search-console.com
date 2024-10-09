import { Menu, Transition } from "@headlessui/react"
import { useLocation } from "@reach/router"
import dayjs from "dayjs"
import React, { Fragment } from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { getSecondaryStyle } from "../../../../uiii/Button/Button"
import { ArrowSelector } from "../ArrowSelector/ArrowSelector"
import { connector, ContainerProps } from "./containers/DateSelector.container"
import { DateSelectorItem } from "./DateSelectorItem"

function displayFilter(props: {
  period: string | null
  date: string | null
  from: string | null
  to: string | null
  isPremium: boolean
}) {
  const period = props.period === "" ? "7d" : props.period || "7d"

  if (period === "month") {
    if (props.from) return <p>{dayjs(props.from).format("MMMM YYYY")}</p>
    return <FormattedMessage id="analytics/filters/month-to-date" />
  }

  if (period === "day") {
    return `${dayjs(props.from).format("DD MMM YYYY")}`
  }

  if (props.from && props.from === props.to) {
    return `${dayjs(props.from).format("DD MMM YYYY")}`
  }

  if (props.from && props.to) {
    return `${dayjs(props.from).format("DD MMM")} → ${dayjs(props.to).format(
      "DD MMM"
    )}`
  }

  if (["7d", "30d"].includes(period)) {
    return (
      // @ts-ignore
      <FormattedMessage id={`analytics/filters/${period}`} />
    )
  }
}

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const url = new URL(useLocation().href)
  const date = url.searchParams.get("date")
  const period = url.searchParams.get("period")
  const to = url.searchParams.get("to")
  const from = url.searchParams.get("from")

  return (
    <Menu as="div" className="relative z-10 inline-block">
      <div className="flex items-center gap-2">
        <ArrowSelector />
        <Menu.Button
          type="button"
          className={getSecondaryStyle({ size: "sm" })}
        >
          {displayFilter({
            period,
            date,
            from,
            to,
            isPremium: props.isPremium,
          })}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-30 mt-2 w-56 origin-top-right rounded-md bg-white font-display font-medium shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <DateSelectorItem
              onSetDate={props.onSetDate}
              period="7d"
              date={null}
              formattedMessage="analytics/filters/7d"
            />

            <DateSelectorItem
              onSetDate={props.onSetDate}
              period="30d"
              date={null}
              formattedMessage="analytics/filters/30d"
            />

            <hr className="my-2 border-slate-100"></hr>

            <DateSelectorItem
              onSetDate={props.onSetDate}
              period="month"
              date={dayjs()
                .startOf("month")
                .subtract(1, "month")
                .format("YYYY-MM-DD")}
              formattedMessage="analytics/filters/last-month"
            />

            <DateSelectorItem
              onSetDate={props.onOpenCalendar}
              period={"30d"}
              date={null}
              formattedMessage="analytics/filters/calendar"
            />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const DateSelector = connector(Container)
