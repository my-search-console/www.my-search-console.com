import {
  HashtagIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/20/solid"
import clsx from "clsx"
import React, { useEffect } from "react"
import { getFavicon } from "../../../utils/getFavicon"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { FoudroyerLink } from "../../general/FoudroyerLink/FoudroyerLink"
import { ItemLoading } from "../../indexation/IndexedTable/components/ItemLoading"
import { ButtonSecondary } from "../../uiii/Button/Button"
import { Tooltip } from "../../uiii/Tooltip"
import { DasboardWebsiteFilterInput } from "../DasboardWebsiteFilterInput/DasboardWebsiteFilterInput"
import { connector, ContainerProps } from "./containers/WebsitesList.containers"

type Props = ContainerProps

export const Wrapper: React.FC<Props> = (props) => {
  useEffect(() => {
    props.onDisplay()
  }, [])

  const websites = props.websites.filter((website) =>
    website.id.toLowerCase().includes(props.filter.toLowerCase())
  )

  return (
    <>
      {websites.length > 0 && (
        <div>
          <DasboardWebsiteFilterInput />
        </div>
      )}
      <div className="flex mt-2 flex-wrap gap-2">
        {props.fetching &&
          Array.from({ length: 10 }).map((value, index) => (
            <ItemLoading key={index} delay={index * 100} />
          ))}
        {!props.fetching &&
          websites.map((website, index) => (
            <div
              key={website.id}
              className={clsx(
                "relative w-full rounded-md border border-slate-100 p-2",
                ""
              )}
            >
              <div className="relative flex w-full justify-between">
                <div className="flex items-center md:w-1/4">
                  <div>
                    <div className="flex w-full items-center">
                      <img src={getFavicon(website.id)} className="h-4 w-4" />
                      <p className="ml-2 overflow-hidden truncate font-display text-sm font-medium text-slate-900">
                        {website.id}
                      </p>
                    </div>

                    {/* <div className="mt-2 space-x-1">
                      <button
                        onClick={() => props.onClickKeys({ website })}
                        className={clsx(
                          getSecondaryStyle({
                            size: "xs",
                            active: false,
                            disabled: false,
                            fullWidth: false,
                          }),
                          website.does_google_api_keys_have_errors &&
                            "!text-red-500"
                        )}
                      >
                        <KeyIcon className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => props.onClickSitemap({ website })}
                        className={clsx(
                          getSecondaryStyle({
                            size: "xs",
                            active: false,
                            disabled: false,
                            fullWidth: false,
                          }),
                          website.does_sitemaps_have_errors && "!text-red-500"
                        )}
                      >
                        <FolderIcon className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() =>
                          props.onClickUser({ websiteId: website.id })
                        }
                        className={clsx(
                          getSecondaryStyle({
                            size: "xs",
                            active: false,
                            disabled: false,
                            fullWidth: false,
                          })
                        )}
                      >
                        <UserPlusIcon className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => props.onDelete(website.id)}
                        className={clsx(
                          getSecondaryStyle({
                            size: "xs",
                            active: false,
                            disabled: false,
                            fullWidth: false,
                          }),
                          "!ml-4"
                        )}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div> */}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1">
                  <Tooltip
                    direction="bottom"
                    align="center"
                    label={<FormattedMessage id="navbar/analytics" />}
                  >
                    <FoudroyerLink to={`/analytics/${website.id}`}>
                      <ButtonSecondary size="sm">
                        <PresentationChartLineIcon className="h-5 w-5" />
                      </ButtonSecondary>
                    </FoudroyerLink>
                  </Tooltip>

                  <Tooltip
                    direction="bottom"
                    align="right"
                    label={<FormattedMessage id="navbar/keywords" />}
                  >
                    <FoudroyerLink to={`/keywords/${website.id}`}>
                      <ButtonSecondary size="sm">
                        <HashtagIcon className="h-5 w-5" />
                      </ButtonSecondary>
                    </FoudroyerLink>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const WebsitesList = connector(Container)
