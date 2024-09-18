import {
  ArrowUturnLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid"
import classNames from "classnames"
import React, { useState } from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { getSecondaryStyle } from "../../UI/Button/Button"
import {
  connector,
  ContainerProps,
} from "./containers/SitemapSearchInput.container"

const Wrapper: React.FC<ContainerProps> = (props) => {
  const [search, setSearch] = useState("")

  return (
    <div>
      <div className="flex w-full mx-auto max-w-6xl">
        <form
          className="relative flex flex-grow items-stretch"
          onSubmit={(e) => {
            if (!props.isLoading) {
              props.onSubmit(search)
            }
            e.preventDefault()
          }}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-slate-400"
              aria-hidden="true"
            />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center p-2">
            <button
              type="submit"
              disabled={props.isLoading}
              className={classNames(
                getSecondaryStyle({
                  size: "sm",
                }),
                "h-full rounded px-4 font-display text-sm font-medium transition-all duration-300 ease-in-out hover:bg-pink-50 hover:text-pink-400"
              )}
            >
              <span className="hidden md:inline">
                <FormattedMessage id="sitemapy/input/submit" />
              </span>
              <ArrowUturnLeftIcon className="ml-2 inline-block h-4 w-4 -scale-y-100 transform" />
            </button>
          </div>
          <input
            type={"url"}
            required
            autoComplete="off"
            className="block h-14 w-full rounded-md border-slate-100 pl-10 text-slate-900 placeholder-slate-400 focus:border-pink-300 focus:ring-pink-300"
            placeholder={"https://www.foudroyer.com/sitemap.xml"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
    </div>
  )
}

export const SitemapSearchInput = connector(Wrapper)
