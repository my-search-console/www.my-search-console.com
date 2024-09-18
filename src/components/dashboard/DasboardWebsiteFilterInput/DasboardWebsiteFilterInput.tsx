import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import React from "react"
import { useIntl } from "react-intl"
import {
  connector,
  ContainerProps,
} from "./containers/DasboardWebsiteFilterInput.containers"

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const intl = useIntl()
  return (
    <div className="flex w-full">
      <div className="relative flex flex-grow items-stretch">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-slate-300"
            aria-hidden="true"
          />
        </div>

        <input
          type={"text"}
          name="website_name"
          autoComplete="off"
          className="block h-14 w-full rounded-md border-slate-100 pl-10 text-slate-900 placeholder-slate-500 focus:border-pink-300 focus:ring-pink-300"
          onChange={(e) => props.onChange(e.target.value)}
          value={props.value || ""}
          placeholder={intl.formatMessage({
            id: "pages/filter/input/placeholder",
          })}
        />
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const DasboardWebsiteFilterInput = connector(Container)
