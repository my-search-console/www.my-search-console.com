import { WebsiteEntity } from "@foudroyer/interfaces/dist/entities/WebsiteEntity"
import { Cog6ToothIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"
import React, { useEffect } from "react"
import { IndexationSearchEngines } from "../../../entities/SearchEngineEntity"
import { bigNumberFormatter } from "../../../utils/bigNumberFormatter"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { FoudroyerLink } from "../../general/FoudroyerLink/FoudroyerLink"
import {
  SourceBingButton,
  SourceGoogleButton,
  SourceNaverButton,
  SourceYandexButton,
} from "../../general/SourceButtons/SourceButtons"
import { ItemLoading } from "../../indexation/IndexedTable/components/ItemLoading"
import { ButtonSecondary, getSecondaryStyle } from "../../uiii/Button/Button"
import { connector, ContainerProps } from "./containers/WebsitesList.containers"

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
      <div className="flex flex-wrap gap-4">
        {props.fetching &&
          Array.from({ length: 10 }).map((value, index) => (
            <ItemLoading key={index} delay={index * 100} />
          ))}
        {!props.fetching &&
          props.websites.map((website, index) => (
            <div
              key={website.id}
              className="w-full rounded-md border border-slate-100"
            >
              <div className="flex w-full justify-between border-b border-slate-100 py-4">
                <div className="ml-2 flex w-full items-center">
                  <img src={website.image} className="h-5 w-5" />
                  <p className="ml-2 overflow-hidden truncate font-display font-medium text-slate-900">
                    {website.id}
                  </p>
                </div>

                <div>
                  <FoudroyerLink
                    to={`/settings/${website.id}`}
                    className={classNames(
                      "mr-2 block rounded-full p-2 text-slate-400 hover:bg-pink-50 hover:text-pink-400"
                    )}
                  >
                    <Cog6ToothIcon className="h-5 w-5" />
                  </FoudroyerLink>
                </div>
              </div>

              {/* <div className="">
                <div className="flex w-full justify-between">
                  <div className="md:w-1/4">
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
                    <div className="flex gap-2 md:flex">
                      <Tooltip
                        label={
                          <FormattedMessage
                            id={`indexation/filter-bar/search-engine/google/${
                              website.indexation_auto_activated_sources?.includes(
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
                          isActive={website.indexation_auto_activated_sources?.includes(
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
                          isActive={website.indexation_auto_activated_sources?.includes(
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
                          isActive={website.indexation_auto_activated_sources?.includes(
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
                          isActive={website.indexation_auto_activated_sources?.includes(
                            "naver"
                          )}
                        />
                      </Tooltip>
                    </div>
                  </div>
                  <div className="relative hidden flex-wrap items-center gap-2 md:flex">
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
              </div> */}

              <div className="grid grid-cols-4">
                <div className="relative w-full border-r border-slate-100 pt-[100%]">
                  <div className="absolute top-0 ml-2 mt-2 font-display text-xs text-slate-700">
                    Indexation
                  </div>
                  <div className="absolute inset-0 flex">
                    <div className="m-auto text-center font-display">
                      <div
                        onClick={() => props.onSeeDetails({ website })}
                        className="cursor-pointer hover:text-pink-400"
                      >
                        <div className="text-3xl">
                          {calcultateQuota(website)}
                        </div>
                        <div className="text-sm">
                          <FormattedMessage id="dashboard/website/quota" />
                        </div>
                      </div>
                      <p className="">
                        <span
                          onClick={() => props.onBoost({ website })}
                          className={classNames(
                            getSecondaryStyle({ size: "sm" }),
                            "!h-auto cursor-pointer !px-2 !py-1 font-display text-xs"
                          )}
                        >
                          <FormattedMessage id="dashboard/buttons/boost" />
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-0 mb-2 ml-2 space-x-1 font-display text-xs text-slate-700">
                    <SourceGoogleButton
                      small
                      onClick={function (): void {
                        throw new Error("Function not implemented.")
                      }}
                      isActive={false}
                    />
                    <SourceBingButton
                      small
                      onClick={function (): void {
                        throw new Error("Function not implemented.")
                      }}
                      isActive={false}
                    />
                    <SourceYandexButton
                      small
                      onClick={function (): void {
                        throw new Error("Function not implemented.")
                      }}
                      isActive={false}
                    />
                    <SourceNaverButton
                      small
                      onClick={function (): void {
                        throw new Error("Function not implemented.")
                      }}
                      isActive={false}
                    />
                  </div>
                </div>

                <div className="relative w-full border-r border-slate-100 pt-[100%]">
                  <div className="absolute top-0 ml-2 mt-2 font-display text-xs text-slate-700">
                    Analytics
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <FoudroyerLink to={`/analytics/${website.id}`}>
                      <ButtonSecondary size="sm">
                        Aller voir les analytics
                      </ButtonSecondary>
                    </FoudroyerLink>
                  </div>
                </div>

                <div className="relative w-full border-r border-slate-100 pt-[100%]">
                  <div className="absolute top-0 ml-2 mt-2 font-display text-xs text-slate-700">
                    Keywords
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <FoudroyerLink to={`/keywords/${website.id}`}>
                      <ButtonSecondary size="sm">
                        Aller voir les mots-clés
                      </ButtonSecondary>
                    </FoudroyerLink>
                  </div>
                </div>

                <div className="relative w-full border-r border-slate-100 pt-[100%]">
                  <div className="absolute top-0 ml-2 mt-2 font-display text-xs text-slate-700">
                    Opportunités
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <FoudroyerLink to={`/opportunities/${website.id}`}>
                      <ButtonSecondary size="sm">
                        Aller voir les opportunités
                      </ButtonSecondary>
                    </FoudroyerLink>
                  </div>
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
