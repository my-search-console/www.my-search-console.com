import React, { useEffect } from "react"
import { connector, ContainerProps } from "./containers/WebsitesList.containers"
import { FormattedMessage } from "../../../general/FormattedMessage/FormattedMessage"
import { WebsiteEntity } from "@foudroyer/interfaces/dist/entities/WebsiteEntity"
import { Tooltip } from "../../../UI/Tooltip"
import {
  SourceBingButton,
  SourceGoogleButton,
  SourceNaverButton,
  SourceYandexButton,
} from "../../../general/SourceButtons/SourceButtons"
import { Switch } from "@headlessui/react"
import logoSkate from "../../../../assets/logo/logo-skate.svg"
import classNames from "classnames"
import { ButtonPrimary, ButtonSecondary } from "../../../UI/Button/Button"
import { IndexationSearchEngines } from "../../../../entities/SearchEngineEntity"
import { IndexationSourceType } from "@foudroyer/interfaces"
import {
  ArrowPathIcon,
  BugAntIcon,
  ChartBarIcon,
  FolderOpenIcon,
  ServerIcon,
} from "@heroicons/react/20/solid"
import { bigNumberFormatter } from "../../../../utils/bigNumberFormatter"
import { ItemLoading } from "../../../indexation/IndexedTable/components/ItemLoading"
import { FoudroyerLink } from "../../../general/FoudroyerLink/FoudroyerLink"
import { UpdateSitemapButton } from "../../../settings/UpdateSitemap/UpdateSitemap"
import { RoastWithReportEntity } from "../../../../entities/RoastEntity"
import { IssueTypes } from "../../../../entities/IssueEntity"

type Props = {
  websites: RoastWithReportEntity[]
  fetching: boolean
  onDisplay: () => void
  onRoast: () => void
  onSelect: (params: { websiteId: string; issueType: IssueTypes }) => void
}

export const Wrapper: React.FC<Props> = (props) => {
  useEffect(() => {
    props.onDisplay()
  }, [])

  return (
    <div className="">
      <div className="mt-2" />
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-center font-display text-lg font-medium text-pink-400">
          <FormattedMessage id="roast/dashboard/hero/label" />
        </p>
        <h1 className="mx-auto flex flex-col font-display text-4xl font-semibold leading-tight tracking-tight text-slate-900 ">
          <FormattedMessage id="roast/dashboard/hero/title" />
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-normal tracking-tight text-slate-500">
          <FormattedMessage id="roast/dashboard/hero/description" />
        </p>
        <div className="mt-6 flex justify-center gap-x-6">
          <div className="relative">
            <div className="absolute -left-1/2 -top-1/2 -translate-y-4 transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="93"
                height="87"
                viewBox="0 0 93 87"
                className="-rotate-[30deg] scale-90 animate-pulse text-pink-500"
                fill="none"
              >
                <path
                  d="M25.9554 1.00004C23.9552 7.55618 18.0333 26.1941 27.178 31.2955C30.9831 33.4182 37.4089 34.177 41.5197 32.1989C50.3476 27.9509 48.8746 12.8851 37.5682 19.1685C31.2274 22.6923 30.411 31.8244 29.9219 38.2989C29.2011 47.8427 33.6274 54.7578 39.4806 61.7776C42.4531 65.3426 59.8901 78.6618 59.8867 77.2404"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M65.6532 82.9795C65.5987 81.5174 64.82 70.3364 65.0937 71.6883C65.452 73.4576 65.6387 75.32 66.2144 77.0336C66.8956 79.061 67.0552 81.2287 67.9548 83.1658C68.7443 84.8656 59.1439 82.6172 57.5966 81.8481"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>
              </svg>
            </div>

            <ButtonPrimary onClick={props.onRoast}>
              {props.websites.length === 0 ? (
                "Ready to be roasted"
              ) : (
                <FormattedMessage id="roast/dashboard/hero/button/label" />
              )}
            </ButtonPrimary>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
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
              <div className="grid w-full grid-cols-12">
                <div className="col-span-3 flex items-center pl-2">
                  <img src={website.favicon} className="h-4 w-4" />
                  <p className="ml-2 overflow-hidden truncate font-display text-sm font-medium text-slate-900">
                    {website.google_search_console_domain}
                  </p>
                </div>

                <div className="relative col-span-6 block">
                  {index === 0 && (
                    <div className="absolute -top-4 left-0 right-0 mx-auto flex -translate-y-full transform items-center justify-center whitespace-nowrap font-display text-xs">
                      <FormattedMessage id="roast/dashboard/list/buttons/label" />
                    </div>
                  )}
                  <div className="flex  justify-center gap-2 md:flex">
                    <Tooltip
                      label={
                        <FormattedMessage id="roast/dashboard/list/buttons/robots/label" />
                      }
                      direction={"bottom"}
                      align="center"
                    >
                      <ButtonSecondary
                        size="sm"
                        onClick={() =>
                          props.onSelect({
                            websiteId: website.id,
                            issueType: IssueTypes.robots,
                          })
                        }
                      >
                        <BugAntIcon
                          className={classNames(
                            "h-5 w-5",
                            website.robots.find(
                              ({ status }) => status === "dont-pass"
                            )
                              ? "text-red-500"
                              : "text-emerald-500"
                          )}
                        />
                      </ButtonSecondary>
                    </Tooltip>

                    <Tooltip
                      label={
                        <FormattedMessage id="roast/dashboard/list/buttons/server/label" />
                      }
                      direction={"bottom"}
                      align="center"
                    >
                      <ButtonSecondary
                        size="sm"
                        onClick={() =>
                          props.onSelect({
                            websiteId: website.id,
                            issueType: IssueTypes.server,
                          })
                        }
                      >
                        <ServerIcon
                          className={classNames(
                            "h-5 w-5",
                            website.server.find(
                              ({ status }) => status === "dont-pass"
                            )
                              ? "text-red-500"
                              : "text-emerald-500"
                          )}
                        />
                      </ButtonSecondary>
                    </Tooltip>

                    <Tooltip
                      label={
                        <FormattedMessage id="roast/dashboard/list/buttons/sitemap/label" />
                      }
                      direction={"bottom"}
                      align="center"
                    >
                      <ButtonSecondary
                        size="sm"
                        onClick={() =>
                          props.onSelect({
                            websiteId: website.id,
                            issueType: IssueTypes.sitemap,
                          })
                        }
                      >
                        <FolderOpenIcon
                          className={classNames(
                            "h-5 w-5",
                            website.sitemap.find(
                              ({ status }) => status == "dont-pass"
                            )
                              ? "text-red-500"
                              : "text-emerald-500"
                          )}
                        />
                      </ButtonSecondary>
                    </Tooltip>
                  </div>
                </div>

                <div className="col-span-3 flex justify-end"></div>
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
