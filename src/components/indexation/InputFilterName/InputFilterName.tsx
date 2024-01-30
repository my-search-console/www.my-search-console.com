import React from "react"
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid"
import {
  connector,
  ContainerProps,
} from "./containers/InputFilterName.containers"
import { useIntl } from "react-intl"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import classNames from "classnames"
import { getSecondaryStyle } from "../../UI/Button/Button"

type Props = {
  value: string
  onChange: (str: string) => void
  onSearch: () => void
}

export const Wrapper: React.FC<Props> = (props) => {
  const intl = useIntl()
  return (
    <div className="flex w-full">
      <form
        className="relative flex flex-grow items-stretch"
        onSubmit={(e) => {
          e.preventDefault()
          props.onSearch()
        }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-slate-300"
            aria-hidden="true"
          />
        </div>
        <div
          className="absolute inset-y-0 right-0 flex items-center p-2"
          onClick={props.onSearch}
        >
          <button
            className={classNames(
              getSecondaryStyle({
                size: "sm",
              }),
              "h-full rounded px-4 font-display text-sm font-medium transition-all duration-300 ease-in-out hover:bg-blue-50 hover:text-blue-400"
            )}
          >
            <span className="hidden md:inline">
              <FormattedMessage id="indexation/filter/button/submit" />
            </span>
            <ArrowUturnLeftIcon className="ml-2 inline-block h-4 w-4 -scale-y-100 transform" />
          </button>
        </div>
        <input
          type={"text"}
          autoComplete="off"
          className="block h-14 w-full rounded-md border-slate-100 pl-10 text-slate-900 placeholder-slate-500 focus:border-blue-300 focus:ring-blue-300"
          placeholder={intl.formatMessage({
            id: "pages/filter/input/placeholder",
          })}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value || "")}
        />
      </form>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const InputFilterName = connector(Container)
