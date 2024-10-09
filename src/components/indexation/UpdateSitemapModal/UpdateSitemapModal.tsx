import { Dialog } from "@headlessui/react"
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  FolderIcon,
  InboxIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid"
import React from "react"
import { SitemapEntity } from "../../../entities/SitemapEntity"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ButtonPrimary, ButtonSecondary } from "../../ui/Button/Button"
import { Modal } from "../../ui/Modal/Modal"
import {
  connector,
  ContainerProps,
} from "./containers/UpdateSitemapModal.containers"

import { USER_AGENT } from "@foudroyer/interfaces"
import clsx from "clsx"
import dayjs from "dayjs"
import { useIntl } from "react-intl"
import { CrawlResponse } from "../../../interfaces/ISitemapsService"
import { universalFormatNumber } from "../../../utils/bigNumberFormatter"
import { UpdateSitemapButton } from "../../settings/UpdateSitemap/UpdateSitemap"

type Props = {
  isOpen: boolean
  fetching: boolean
  sitemap: string | null
  sitemaps: SitemapEntity[]
  onChange: (sitemap: string) => void
  onDelete: (id: SitemapEntity["id"]) => void
  onSubmit: () => void
  onClose: () => void
}

const SitemapWithChildren: React.FC<CrawlResponse & { depth: number }> = (
  props
) => {
  const intl = useIntl()

  return (
    <>
      <div
        className={clsx("flex mt-2 items-center justify-between rounded-md")}
        style={{
          marginLeft: `${(props.depth + 1) * 24}px`,
        }}
      >
        <div className="flex items-center font-display">
          <div className="">
            <div className="flex ">
              <div className="mr-1 mt-1">
                {props.statusCode === 200 && props.numberTotalOfPages > 0 && (
                  <CheckCircleIcon className="h-4 w-4 text-emerald-400" />
                )}

                {(props.statusCode !== 200 ||
                  props.numberTotalOfPages === 0) && (
                  <ExclamationTriangleIcon className="h-4 w-4 text-red-400" />
                )}
              </div>
              <div>
                <a
                  target="_blank"
                  href={props.url}
                  className="truncate block font-display text-sm font-medium underline"
                >
                  {props.url}
                </a>

                {props.statusCode !== 200 && (
                  <div className="text-red-500 text-xs">
                    <FormattedMessage
                      id="sitemapy/results/error/code"
                      values={{ d: props.statusCode }}
                    />
                  </div>
                )}

                {props.statusCode === 200 && props.numberTotalOfPages === 0 && (
                  <div className="text-red-500 text-xs">
                    <FormattedMessage id="sitemapy/results/error/no-pages" />
                  </div>
                )}

                {props.numberTotalOfPages > 0 && props.statusCode === 200 && (
                  <div className="font-display text-slate-500 text-xs">
                    {universalFormatNumber({
                      num: props.numberTotalOfPages,
                      locale: intl.locale,
                    })}{" "}
                    pages in the sitemap
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {props.sitemaps.map((sitemap, index) => (
        <SitemapWithChildren key={index} {...sitemap} depth={props.depth + 1} />
      ))}
    </>
  )
}

const SitemapsList: React.FC<{
  sitemaps: SitemapEntity[]
  onDelete: (id: SitemapEntity["id"]) => void
}> = (props) => {
  const intl = useIntl()

  return (
    <ul
      role="list"
      className="mt-2 divide-y divide-slate-200 rounded-md border border-slate-200"
    >
      {props.sitemaps.length === 0 && (
        <div className="p-4 text-center font-display text-sm text-slate-500">
          <InboxIcon className="mx-auto h-6 w-6" />
          <FormattedMessage id="modal/add-website/no-more-websites" />
        </div>
      )}

      {props.sitemaps.map((sitemap, index) => (
        <li key={sitemap.url} className="px-4 py-4 pl-3">
          <div className="">
            <div className="flex">
              <div className="mr-2">
                {sitemap.synced_error_message && (
                  <ExclamationTriangleIcon className="h-4 w-4 text-red-400" />
                )}

                {!sitemap.synced_error_message && (
                  <CheckCircleIcon className="h-4 w-4 text-emerald-400" />
                )}
              </div>
              <div>
                <a
                  href={sitemap.url}
                  target="_blank"
                  className="truncate leading-none font-display block w-full text-sm font-medium underline"
                >
                  {sitemap.url}
                </a>
                <p className="inline-block font-display text-xs leading-none text-slate-500">
                  {sitemap.tree?.numberTotalOfPages > 0 && (
                    <span>
                      {universalFormatNumber({
                        num: sitemap.tree?.numberTotalOfPages,
                        locale: intl.locale,
                      })}{" "}
                      pages in the sitemap
                      <span className="px-2">•</span>
                    </span>
                  )}
                  <span>Synced {dayjs(sitemap.synced_at).fromNow()}</span>
                </p>
                {sitemap.synced_error_message && (
                  <div className="flex items-center font-display text-xs text-red-400">
                    <FormattedMessage
                      id={"sitemap/check/error"}
                      values={{
                        d: sitemap.synced_error_message,
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex-shrink-0 ml-auto">
                <button
                  onClick={() => props.onDelete(sitemap.id)}
                  type="button"
                  className="inline-flex items-center rounded-full p-1 text-sm font-semibold leading-6 text-slate-400 transition-all duration-300 ease-in-out hover:bg-pink-50 hover:text-pink-400"
                >
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {sitemap?.tree?.sitemaps.map((sitemap) => (
              <SitemapWithChildren {...sitemap} depth={0} />
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <Modal
      fetching={props.fetching}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <div className="relative w-full max-w-2xl">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
          <FolderIcon className="h-6 w-6 text-pink-500" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="font-display text-base font-semibold leading-6 text-slate-900"
          >
            <FormattedMessage id="update-sitemap/title" />
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-slate-500">
              <FormattedMessage id="update-sitemap/description" />
            </p>
          </div>

          <div className="mt-2 rounded border border-orange-100 bg-orange-50 p-4 text-left text-orange-500">
            <p className="text-xs">
              <FormattedMessage id="sitemap/firewall" />
            </p>

            <p className="mt-2 font-display text-xs">{USER_AGENT}</p>
            <p className="mt-2 font-display text-xs">IP: 51.222.31.19</p>
          </div>
        </div>

        <div>
          <div>
            <label
              htmlFor="add-sitemap"
              className="mt-4 block font-display text-sm font-medium leading-6 text-slate-800"
            >
              <FormattedMessage id="update-sitemap/input/placeholder" />
            </label>
            <div className="mt-2 flex w-full items-center">
              <div className="shadow-btn flex w-full rounded-md border border-slate-200 shadow-slate-200  focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                <input
                  type="text"
                  name="add-sitemap"
                  autoComplete="off"
                  className="block flex-1 border-0 bg-transparent py-2 pl-3 text-slate-900 placeholder:text-slate-500 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="https://www.example.com/sitemap.xml"
                  value={props.sitemap || ""}
                  onChange={(e) => props.onChange(e.target.value)}
                />
              </div>

              <ButtonPrimary
                size="sm"
                className="ml-2 flex-shrink-0"
                onClick={props.onSubmit}
              >
                <PaperAirplaneIcon className="h-4 w-4" />
              </ButtonPrimary>
            </div>
          </div>

          <SitemapsList sitemaps={props.sitemaps} onDelete={props.onDelete} />

          <div className="mt-6 border-t border-slate-100 pt-6">
            <div className="font-display text-sm font-medium">
              <FormattedMessage id="update-sitemap/sync/title" />
            </div>
            <div className="text-sm text-slate-500">
              <FormattedMessage id="update-sitemap/sync/description" />
            </div>
            <div className="mt-2">
              <UpdateSitemapButton showLabel />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <ButtonSecondary fullWidth size="md" onClick={props.onClose}>
            <FormattedMessage id="update-sitemap/close" />
          </ButtonSecondary>
        </div>
      </div>
    </Modal>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const UpdateSitemapModal = connector(Container)
