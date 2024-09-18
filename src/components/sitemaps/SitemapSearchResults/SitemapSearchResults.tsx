import {
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid"
import clsx from "clsx"
import React from "react"
import { useIntl } from "react-intl"
import { CrawlResponse } from "../../../interfaces/ISitemapsService"
import { universalFormatNumber } from "../../../utils/bigNumberFormatter"
import { formatUrl } from "../../../utils/formatUrl"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import {
  connector,
  ContainerProps,
} from "./containers/SitemapSearchResults.container"

const Sitemap: React.FC<CrawlResponse & { depth: number }> = (props) => {
  const intl = useIntl()

  return (
    <>
      <div
        className={clsx(
          "flex mt-2 items-center justify-between rounded-md border border-slate-100 px-4 pr-4 py-4"
        )}
        style={{
          marginLeft: `${props.depth * 24}px`,
        }}
      >
        <div className="flex items-center font-display">
          {props.statusCode === 200 && props.numberTotalOfPages > 0 && (
            <CheckCircleIcon className="mr-2 h-5 w-5 text-emerald-500" />
          )}

          {(props.statusCode !== 200 || props.numberTotalOfPages === 0) && (
            <XCircleIcon className="mr-2 h-5 w-5 text-red-500" />
          )}

          <div className="">
            <div className="flex items-center">
              <div>{formatUrl(props.url)}</div>
              <a target="_blank" href={props.url} className="ml-2">
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </a>
            </div>

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
          </div>
        </div>

        <div className="font-display">
          <div className="text-xs uppercase text-right leading-none text-slate-400">
            Pages
          </div>
          <div className="text-emerald-500 text-right">
            {universalFormatNumber({
              num: props.numberTotalOfPages,
              locale: intl.locale,
            })}
          </div>
        </div>

        {/* {issue.status === "pass" && (
      <ButtonSecondary
        size="sm"
        onClick={() => {
          setIssueShowOnModal(issue)
          setModalOpen(true)
        }}
      >
        <FormattedMessage id={`roast/global/why`} />
      </ButtonSecondary>
    )} */}
      </div>

      {props.sitemaps.map((sitemap, index) => (
        <Sitemap key={index} {...sitemap} depth={props.depth + 1} />
      ))}
    </>
  )
}

const Skeleton = () => {
  return (
    <div
      className={clsx(
        "flex mt-2 bg-slate-100 animate-pulse items-center justify-between rounded-md border border-slate-100 h-12"
      )}
    ></div>
  )
}

const Wrapper: React.FC<ContainerProps> = (props) => {
  return (
    <div className="max-w-6xl mx-auto">
      {props.isLoading && (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      )}

      {props.sitemaps && !props.isLoading && (
        <Sitemap {...props.sitemaps} depth={0} />
      )}
    </div>
  )
}

export const SitemapSearchResults = connector(Wrapper)
