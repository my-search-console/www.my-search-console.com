import { XMarkIcon } from "@heroicons/react/20/solid"
import { useLocation } from "@reach/router"
import React from "react"
import { formatUrl } from "../../../utils/formatUrl"
import { getWebsiteIdFromUrl } from "../../../utils/getWebsiteIdFromUrl"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { SettingsToggleButton } from "../../indexation/Settings/Settings"
import { DateSelector } from "./components/DateSelector/DateSelector"
import { KeywordsFilters } from "./components/KeywordsFilters/KeywordsFilters"
import { SiteSelector } from "./components/SiteSelector/SiteSelector"
import { SourceSelector } from "./components/SourceSelector/SourceSelector"
import { connector, ContainerProps } from "./containers/FilterBar.container"

function getFiltersFromUrl(href: string) {
  const url = new URL(href)
  const query = url.searchParams.get("query")
  const device = url.searchParams.get("device")
  const country = url.searchParams.get("country")
  const source = url.searchParams.get("source")
  const page = url.searchParams.get("page")

  return [
    { type: "query", value: query },
    { type: "country", value: country },
    { type: "device", value: device },
    { type: "source", value: source },
    { type: "page", value: page },
  ].filter(({ value }) => !!value) as {
    type: "source" | "date" | "query" | "country" | "device" | "page"
    value: string
  }[]
}

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const { href } = useLocation()
  const { feature } = getWebsiteIdFromUrl(href || "")
  const options = {
    showFilters: feature === "analytics" || feature === "shared",
    showSourceSelector: feature === "indexation",
    showDateSelector: feature === "analytics" || feature === "shared",
    showKeywordsFilters: feature === "keywords",
  }

  const filters = getFiltersFromUrl(href || "https://www.local.dev")

  return (
    <div className="sticky top-1 z-20">
      <div className="flex w-full items-center justify-center rounded-lg border border-slate-100 bg-white bg-opacity-80 py-2 backdrop-blur-sm">
        <SiteSelector />

        {options.showFilters && (
          <div className="no-scroll-bar -mb-1 mr-2 overflow-x-scroll">
            <div className="hidden md:block">
              <ul className="flex items-center gap-1 whitespace-nowrap px-2 font-display">
                {filters.map(({ value, type }) => {
                  return (
                    <li key={type}>
                      <button
                        type="button"
                        className="inline-flex h-10 items-center rounded-md bg-slate-50  px-4 pl-3 pr-1.5 font-display text-sm font-medium text-slate-900 transition duration-300 ease-in-out hover:bg-pink-100 hover:text-pink-500  focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                        onClick={() => props.onFilter({ value, type })}
                      >
                        <span>
                          {type === "country" ? (
                            // @ts-ignore
                            <FormattedMessage id={"country/" + value} />
                          ) : type === "page" ? (
                            formatUrl(value)
                          ) : (
                            value
                          )}
                        </span>

                        <XMarkIcon
                          className="ml-1 h-4 w-4"
                          aria-hidden="true"
                        />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )}

        <div className="ml-auto flex flex-shrink-0 items-center pr-2">
          {options.showSourceSelector && <SourceSelector />}
          {options.showDateSelector && <DateSelector />}
          {options.showKeywordsFilters && <KeywordsFilters />}
          {feature === "indexation" && <SettingsToggleButton />}
        </div>
      </div>

      {filters.length > 0 && (
        <div className="no-scroll-bar sticky top-0 -z-10 mt-1 flex h-fit w-full items-center overflow-x-scroll rounded-md border border-slate-100 bg-white bg-opacity-80 py-2 backdrop-blur-sm transition-all md:hidden">
          <ul className="flex h-full items-center gap-1 whitespace-nowrap px-2 font-display">
            {filters.map(({ value, type }) => {
              return (
                <li key={type}>
                  <button
                    type="button"
                    className="inline-flex h-10 items-center rounded-md bg-slate-50  px-4 pl-3 pr-1.5 font-display text-sm font-medium text-slate-900 transition duration-300 ease-in-out hover:bg-pink-100 hover:text-pink-500  focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    onClick={() => props.onFilter({ value, type })}
                  >
                    <span>
                      {type === "country" ? (
                        // @ts-ignore
                        <FormattedMessage id={"country/" + value} />
                      ) : (
                        value
                      )}
                    </span>
                    <XMarkIcon className="ml-1 h-4 w-4" aria-hidden="true" />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const FilterBar = connector(Container)
