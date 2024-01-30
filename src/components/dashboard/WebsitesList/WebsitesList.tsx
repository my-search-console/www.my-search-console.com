import React, { useEffect } from "react"
import { connector, ContainerProps } from "./containers/WebsitesList.containers"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { WebsiteEntity } from "@foudroyer/interfaces/dist/entities/WebsiteEntity"
import { Tooltip } from "../../UI/Tooltip"
import {
  SourceBingButton,
  SourceGoogleButton,
  SourceNaverButton,
  SourceYandexButton,
} from "../../general/SourceButtons/SourceButtons"
import { Switch } from "@headlessui/react"
import classNames from "classnames"
import {
  ButtonPrimary,
  ButtonSecondary,
  getSecondaryStyle,
} from "../../UI/Button/Button"
import { IndexationSearchEngines } from "../../../entities/SearchEngineEntity"
import { IndexationSourceType } from "@foudroyer/interfaces"
import { BoltIcon } from "@heroicons/react/20/solid"
import { bigNumberFormatter } from "../../../utils/bigNumberFormatter"
import { ItemLoading } from "../../indexation/IndexedTable/components/ItemLoading"

type Props = {
  websites: WebsiteEntity[]
  fetching: boolean
  onDisplay: () => void
  onToggleAutoIndexing: (params: { website: WebsiteEntity }) => void
  onToggleSource: (params: {
    website: WebsiteEntity
    source: IndexationSearchEngines
  }) => void
  onAddWebsite: () => void
  onBoost: (params: { website: WebsiteEntity }) => void
  onSeeDetails: (params: { website: WebsiteEntity }) => void
}

function calcultateQuota(website: WebsiteEntity) {
  if (!website || !website.google_api_keys) return "0"
  if (website.google_api_keys.length === 0 && website.index_now_installed) {
    return "10k+"
  }
  return bigNumberFormatter(website.google_api_keys.length * 200, 1)
}

export const Wrapper: React.FC<Props> = (props) => {
  useEffect(() => {
    props.onDisplay()
  }, [])

  return (
    <div>
      <div className="flex flex-col items-center justify-center pb-12 pt-6 text-center">
        <p className="text-center font-display text-lg font-medium text-blue-400">
          <FormattedMessage id="dashboard/hero/label" />
        </p>
        <h1 className="mx-auto flex flex-col font-display text-4xl font-semibold leading-tight tracking-tight text-slate-900 ">
          <FormattedMessage id="dashboard/hero/title" />
        </h1>
        <p className="mx-auto mt-2 max-w-lg text-lg leading-normal tracking-tight text-slate-500">
          <FormattedMessage id="dashboard/hero/description" />
        </p>

        <div className="mt-4">
          <ButtonPrimary onClick={props.onAddWebsite}>
            <FormattedMessage id="analytics/button/add-website" />
          </ButtonPrimary>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {props.fetching &&
          Array.from({ length: 10 }).map((value, index) => (
            <ItemLoading key={index} delay={index * 100} />
          ))}
        {!props.fetching &&
          props.websites.map((website, index) => (
            <div
              key={website.id}
              className="w-full rounded-md border border-slate-100 p-2"
            >
              <div className="flex w-full justify-between">
                <div className="md:w-1/4">
                  <div className="flex w-full items-center">
                    <img src={website.image} className="h-4  w-4" />
                    <p className="ml-2 overflow-hidden truncate font-display text-sm font-medium text-slate-900">
                      {website.id}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="h-4 w-4">&nbsp;</div>
                    <p className="ml-2 flex items-center font-display text-xs font-medium text-slate-500">
                      <BoltIcon className="mr-1 h-3 w-3" />
                      <span className="mr-1">{calcultateQuota(website)}</span>
                      <FormattedMessage id="dashboard/website/quota" />
                      <span
                        onClick={() => props.onBoost({ website })}
                        className={classNames(
                          getSecondaryStyle({ size: "sm" }),
                          "ml-2 !h-auto cursor-pointer !px-1.5 !py-0.5 font-display text-xs"
                        )}
                      >
                        <FormattedMessage id="dashboard/buttons/boost" />
                      </span>
                    </p>
                  </div>
                </div>
                <div className="relative hidden md:block">
                  {index === 0 && (
                    <div className="absolute -top-4 left-0 right-0 mx-auto flex -translate-y-full transform items-center justify-center whitespace-nowrap font-display text-xs">
                      <FormattedMessage id="dashboard/label/search-engines" />
                    </div>
                  )}
                  <div className="flex gap-2 md:flex">
                    <Tooltip
                      label={
                        <FormattedMessage
                          id={`indexation/filter-bar/search-engine/google/${
                            website.indexation_auto_activated_sources.includes(
                              "google"
                            )
                              ? "de"
                              : ""
                          }activate`}
                        />
                      }
                      direction={"bottom"}
                      align="left"
                    >
                      <SourceGoogleButton
                        onClick={() =>
                          props.onToggleSource({
                            website: website,
                            source: IndexationSourceType.google,
                          })
                        }
                        isActive={website.indexation_auto_activated_sources.includes(
                          "google"
                        )}
                      />
                    </Tooltip>
                    <Tooltip
                      label={
                        <FormattedMessage
                          id={`indexation/filter-bar/search-engine/bing/activate`}
                        />
                      }
                      direction={"bottom"}
                      align="left"
                    >
                      <SourceBingButton
                        onClick={() =>
                          props.onToggleSource({
                            website: website,
                            source: IndexationSourceType.yandex,
                          })
                        }
                        isActive={website.indexation_auto_activated_sources.includes(
                          "yandex"
                        )}
                      />
                    </Tooltip>
                    <Tooltip
                      label={
                        <FormattedMessage
                          id={`indexation/filter-bar/search-engine/yandex/activate`}
                        />
                      }
                      direction={"bottom"}
                      align="left"
                    >
                      <SourceYandexButton
                        onClick={() =>
                          props.onToggleSource({
                            website: website,
                            source: IndexationSourceType.bing,
                          })
                        }
                        isActive={website.indexation_auto_activated_sources.includes(
                          "bing"
                        )}
                      />
                    </Tooltip>
                    <Tooltip
                      label={
                        <FormattedMessage
                          id={`indexation/filter-bar/search-engine/naver/activate`}
                        />
                      }
                      direction={"bottom"}
                      align="left"
                    >
                      <SourceNaverButton
                        onClick={() =>
                          props.onToggleSource({
                            website: website,
                            source: IndexationSourceType.naver,
                          })
                        }
                        isActive={website.indexation_auto_activated_sources.includes(
                          "naver"
                        )}
                      />
                    </Tooltip>
                  </div>
                </div>
                <div className="relative hidden flex-wrap items-center gap-2 md:flex">
                  {index === 0 && (
                    <div className="absolute -top-4 left-0 right-0 z-20 mx-auto flex -translate-y-full transform items-center justify-center whitespace-nowrap font-display text-xs">
                      <div className="flex items-center">
                        <span className="group relative cursor-pointer underline decoration-dotted">
                          <FormattedMessage id="dashboard/label/auto-indexing" />
                          <div className="pointer-events-none absolute left-0 top-5 z-10 flex w-60 -translate-x-6 transform items-center whitespace-break-spaces rounded border bg-white p-4 font-sans opacity-0 transition-all duration-300 ease-in-out hover:opacity-0 group-hover:opacity-100">
                            <FormattedMessage id="dashboard/label/auto-indexing/tooltip" />
                          </div>
                        </span>
                      </div>
                    </div>
                  )}
                  <Switch.Group
                    as="div"
                    className="flex items-center justify-between"
                  >
                    <Switch
                      checked={website.indexation_auto_activated}
                      onClick={() => props.onToggleAutoIndexing({ website })}
                      className={classNames(
                        website.indexation_auto_activated
                          ? "bg-emerald-500"
                          : "bg-slate-200",
                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          website.indexation_auto_activated
                            ? "translate-x-5"
                            : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                </div>
                <ButtonSecondary
                  size="sm"
                  onClick={() => props.onSeeDetails({ website })}
                >
                  <FormattedMessage id="dashboard/website/details" />
                </ButtonSecondary>
              </div>

              <div className="mt-4 flex flex-col gap-2 font-display md:hidden">
                <div className="relative flex flex-wrap items-center gap-2">
                  <p className="w-40 text-sm text-slate-900">
                    <FormattedMessage id="dashboard/website/select-search-engine" />
                  </p>
                  <div className="flex gap-2">
                    <Tooltip
                      label={
                        <FormattedMessage
                          id={`indexation/filter-bar/search-engine/google/activate`}
                        />
                      }
                      direction={"bottom"}
                      align="left"
                    >
                      <SourceGoogleButton
                        onClick={() =>
                          props.onToggleSource({
                            website: website,
                            source: IndexationSourceType.google,
                          })
                        }
                        isActive={website?.indexation_auto_activated_sources.includes(
                          "google"
                        )}
                      />
                    </Tooltip>
                    <Tooltip
                      label={
                        <FormattedMessage
                          id={`indexation/filter-bar/search-engine/google/activate`}
                        />
                      }
                      direction={"bottom"}
                      align="left"
                    >
                      <SourceBingButton
                        onClick={() =>
                          props.onToggleSource({
                            website: website,
                            source: IndexationSourceType.bing,
                          })
                        }
                        isActive={website?.indexation_auto_activated_sources.includes(
                          "bing"
                        )}
                      />
                    </Tooltip>
                    <Tooltip
                      label={
                        <FormattedMessage
                          id={`indexation/filter-bar/search-engine/google/activate`}
                        />
                      }
                      direction={"bottom"}
                      align="left"
                    >
                      <SourceYandexButton
                        onClick={() =>
                          props.onToggleSource({
                            website: website,
                            source: IndexationSourceType.yandex,
                          })
                        }
                        isActive={website?.indexation_auto_activated_sources.includes(
                          "yandex"
                        )}
                      />
                    </Tooltip>
                    <Tooltip
                      label={
                        <FormattedMessage
                          id={`indexation/filter-bar/search-engine/google/activate`}
                        />
                      }
                      direction={"bottom"}
                      align="left"
                    >
                      <SourceNaverButton
                        onClick={() =>
                          props.onToggleSource({
                            website: website,
                            source: IndexationSourceType.naver,
                          })
                        }
                        isActive={website?.indexation_auto_activated_sources.includes(
                          "naver"
                        )}
                      />
                    </Tooltip>
                  </div>
                </div>
                <div className="flex h-8 flex-wrap items-end gap-2">
                  <p className="w-40 text-sm text-slate-900">
                    <FormattedMessage id="dashboard/website/auto-index" />
                  </p>
                  <Switch.Group
                    as="div"
                    className="flex items-center justify-between"
                  >
                    <Switch
                      checked={website.indexation_auto_activated}
                      onClick={() => props.onToggleAutoIndexing({ website })}
                      className={classNames(
                        website.indexation_auto_activated
                          ? "bg-emerald-500"
                          : "bg-slate-200",
                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          website.indexation_auto_activated
                            ? "translate-x-5"
                            : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const WebsitesList = connector(Container)
