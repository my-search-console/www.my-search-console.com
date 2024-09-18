import {
  ArrowTopRightOnSquareIcon,
  BoltIcon,
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid"
import React, { ReactNode } from "react"

import { IndexationType, PageEntity } from "@foudroyer/interfaces"
import { Transition } from "@headlessui/react"
import classNames from "classnames"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import BingLogo from "../../../assets/socials/bing.svg"
import GoogleLogo from "../../../assets/socials/google.svg"
import NaverLog from "../../../assets/socials/naver.svg"
import YandexLogo from "../../../assets/socials/yandex.svg"
import { formatUrl } from "../../../utils/formatUrl"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ButtonSecondary } from "../../UI/Button/Button"
import { Tooltip } from "../../UI/Tooltip"
import { ItemLoading } from "./components/ItemLoading"
import { NoLinkFound } from "./components/NoLinkFound"
import { connector, ContainerProps } from "./containers/AllPages.containers"

dayjs.extend(relativeTime)

type Props = {
  pages: PageEntity[]
  isLoading: boolean
  allLoadingStates: Map<
    string,
    {
      google?: "loading" | "finished"
      yandex?: "loading" | "finished"
      bing?: "loading" | "finished"
      finished?: boolean
    }
  >
  onIndex: (params: PageEntity) => void
}

export const ItemContainer: React.FC<{
  index: number
  children: ReactNode
}> = ({ children, index }) => (
  <div className="rounded-md border border-slate-100 bg-white">
    <div
      className={`group relative block h-14 transition-colors duration-300 ease-in-out ${
        index % 2 !== 0 ? "" : ""
      }`}
    >
      {children}
    </div>
  </div>
)

export const ItemPrimary: React.FC<{
  isInfoOpen?: boolean
  children: ReactNode
}> = (props) => (
  <div
    className={`flex h-full transform items-center overflow-hidden px-2 transition-all duration-300 ease-in-out ${
      !props.isInfoOpen && ""
    }`}
  >
    {props.children}
  </div>
)

export const ItemSecondary: React.FC<{
  isInfoOpen: boolean
  children: ReactNode
}> = (props) => (
  <div
    className={`absolute left-0 right-0 top-0 flex h-full w-full translate-y-full transform items-center space-x-2 rounded-md bg-white px-2 transition-all duration-300 ease-in-out ${
      !props.isInfoOpen && "group-hover:translate-y-0"
    }`}
  >
    {props.children}
  </div>
)

export const ItemInfosContainer: React.FC<{ children: ReactNode }> = (
  props
) => (
  <div className="rounded-b-md border-t border-slate-100 bg-white px-4 py-5 sm:p-0">
    <dl className="sm:divide-y sm:divide-slate-100">{props.children}</dl>
  </div>
)

const SourceIndexingLoader: React.FC<{ finished: boolean; logo: string }> = (
  props
) => (
  <Transition
    appear
    show
    className="translate-y-10 transform opacity-0 transition-all duration-300 ease-in-out"
    enterFrom="opacity-0 translate-y-10 rotate-6"
    enterTo="opacity-100 translate-y-0 rotate-0"
  >
    <div className="relative">
      <svg
        aria-hidden="true"
        className={classNames(
          "h-9 w-9 transition-all duration-300  ease-in-out md:h-10 md:w-10",
          props.finished
            ? " fill-transparent text-emerald-500"
            : " animate-spin fill-pink-500 text-slate-200"
        )}
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <img src={props.logo} className="absolute inset-0 m-auto h-4 w-4" />
    </div>
  </Transition>
)

const Item: React.FC<{
  page: PageEntity
  index: number
  loadingState?: {
    google?: "loading" | "finished"
    yandex?: "loading" | "finished"
    bing?: "loading" | "finished"
    naver?: "loading" | "finished"
    finished?: boolean
  }
  onIndex: () => void
}> = (props) => {
  return (
    <div>
      <ItemContainer index={props.index}>
        {(!props.loadingState ||
          (props.loadingState && props.loadingState?.finished)) && (
          <ItemPrimary>
            <div className="flex min-w-0 flex-1 items-center">
              <Tooltip
                direction="right"
                label={
                  <div>
                    <FormattedMessage
                      // @ts-ignore
                      id={`indexation/state/${props.page.indexation_state}`}
                    />

                    {props.page.submitted_at && (
                      <div>
                        Submitted {dayjs(props.page.submitted_at).fromNow()}
                      </div>
                    )}

                    {props.page.request_indexing_at && (
                      <div>
                        Sent in the queue{" "}
                        {dayjs(props.page.request_indexing_at).fromNow()}
                      </div>
                    )}
                  </div>
                }
              >
                <div
                  className={classNames(
                    "flex items-center p-1",
                    props.page.indexation_state === IndexationType.INDEXED &&
                      "!text-emerald-400",

                    props.page.indexation_state ===
                      IndexationType.NOT_INDEXED && "!text-red-400",

                    props.page.indexation_state === IndexationType.INDEXING &&
                      "!text-slate-300",

                    props.page.indexation_state ===
                      IndexationType["checking-indexation-state"] &&
                      "!text-sky-400",

                    props.page.indexation_state === IndexationType.SUBMITTED &&
                      "!text-blue-300",

                    props.page.indexation_state ===
                      IndexationType["first-check-done-but-not-indexed"] &&
                      "!text-indigo-300",

                    "text-orange-300"
                  )}
                >
                  {(props.page.indexation_state === IndexationType.INDEXING ||
                    props.page.indexation_state ===
                      IndexationType.SUBMITTED) && (
                    <ClockIcon className="h-4 w-4 animate-pulse" />
                  )}

                  {props.page.indexation_state === IndexationType.INDEXED && (
                    <CheckCircleIcon className="h-4 w-4 " />
                  )}

                  {props.page.indexation_state !== IndexationType.INDEXED &&
                    props.page.indexation_state !== IndexationType.INDEXING &&
                    props.page.indexation_state !==
                      IndexationType.SUBMITTED && (
                      <XCircleIcon className="h-4 w-4 " />
                    )}
                </div>
              </Tooltip>
              <a
                target="_blank"
                href={props.page.url}
                className="block truncate pl-1 font-medium text-slate-900 hover:underline"
              >
                {formatUrl(props.page.url)}
              </a>

              {props.page.inspection_google_page && (
                <a
                  target="_blank"
                  href={props.page.inspection_google_page as string}
                  className="pl-1 font-medium text-slate-900 hover:underline"
                >
                  <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4" />
                </a>
              )}
            </div>

            {props.loadingState && props.loadingState.finished ? (
              <div className="space-x-2">
                <div
                  className={classNames(
                    "inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 font-display text-sm font-semibold text-white transition duration-300 ease-in-out"
                  )}
                >
                  <CheckIcon className="h-4 w-4" />
                </div>
              </div>
            ) : (
              <div className="space-x-2">
                <Tooltip label={"Index"} direction={"left"} align="left">
                  <ButtonSecondary size="sm" onClick={props.onIndex}>
                    <BoltIcon className="h-5 w-5" />
                  </ButtonSecondary>
                </Tooltip>
              </div>
            )}
          </ItemPrimary>
        )}

        {props.loadingState && !props.loadingState?.finished && (
          <ItemPrimary>
            <div className="flex w-full items-center justify-center space-x-2 md:space-x-8">
              {props.loadingState?.google && (
                <SourceIndexingLoader
                  finished={props.loadingState.google === "finished"}
                  logo={GoogleLogo}
                />
              )}
              {props.loadingState?.yandex && (
                <SourceIndexingLoader
                  finished={props.loadingState.yandex === "finished"}
                  logo={YandexLogo}
                />
              )}
              {props.loadingState?.bing && (
                <SourceIndexingLoader
                  finished={props.loadingState.bing === "finished"}
                  logo={BingLogo}
                />
              )}
              {props.loadingState?.naver && (
                <SourceIndexingLoader
                  finished={props.loadingState.naver === "finished"}
                  logo={NaverLog}
                />
              )}
            </div>
          </ItemPrimary>
        )}
      </ItemContainer>
    </div>
  )
}

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <div className="mt-2">
      <ul className="space-y-2">
        {!props.isLoading &&
          props.pages.length > 0 &&
          props.pages.map((page, index) => (
            <Item
              key={page.url}
              page={page}
              index={index}
              loadingState={props.allLoadingStates.get(page.url)}
              onIndex={() => props.onIndex(page)}
            />
          ))}

        {!props.isLoading && !props.pages.length && <NoLinkFound />}

        {props.isLoading &&
          Array.from({ length: 10 }).map((value, index) => (
            <ItemLoading key={index} delay={index * 100} />
          ))}
      </ul>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const AllPages = connector(Container)
