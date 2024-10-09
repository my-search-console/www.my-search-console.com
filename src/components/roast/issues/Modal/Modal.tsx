import { Dialog } from "@headlessui/react"
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid"
import classNames from "classnames"
import React from "react"
import { IssueEntity, IssueNames } from "../../../../entities/IssueEntity"
import { FormattedMessage } from "../../../general/FormattedMessage/FormattedMessage"
import { ButtonSecondary } from "../../../ui/Button/Button"
import { Modal as GlobalModal } from "../../../ui/Modal/Modal"
import { RobotsCrawlAllowed } from "./components/RobotsCrawlAllowed"
import { RobotsEmpty } from "./components/RobotsEmpty"
import { RobotsJavascript } from "./components/RobotsJavascript"
import { ServerError } from "./components/ServerError"
import { ServerNotHttps } from "./components/ServerHttps"
import { ServerNoIndex } from "./components/ServerNoIndex"
import { ServerNotScDomain } from "./components/ServerNotScDomain"
import { ServerNotScDomainNotSameUrl } from "./components/ServerNotScDomainNotSameUrl"
import { SitemapBadFormed } from "./components/SitemapBadFormed"
import { SitemapNoSitemap } from "./components/SitemapNoSitemap"
import { SitemapServerError } from "./components/SitemapServerError"

type Props = {
  isOpen: boolean
  onClose: () => void
  issue: IssueEntity | null
}

export const Modal: React.FC<Props> = (props) => {
  return (
    <GlobalModal isOpen={props.isOpen} onClose={props.onClose}>
      {props.issue && (
        <div className="relative w-full max-w-md">
          <div
            className={classNames(
              "mx-auto flex h-12 w-12 items-center justify-center rounded-full ",
              props.issue.status === "warning" && "bg-orange-100",
              props.issue.status === "pass" && "bg-emerald-100",
              props.issue.status === "dont-pass" && "bg-red-100"
            )}
          >
            {props.issue.status === "warning" && (
              <ExclamationTriangleIcon
                className="h-6 w-6 text-orange-500"
                aria-hidden="true"
              />
            )}

            {props.issue.status === "pass" && (
              <CheckCircleIcon
                className="h-6 w-6 text-emerald-500"
                aria-hidden="true"
              />
            )}

            {props.issue.status === "dont-pass" && (
              <XCircleIcon
                className="h-6 w-6 text-red-500"
                aria-hidden="true"
              />
            )}
          </div>

          <div className="mt-2">
            <Dialog.Title
              as="h3"
              className="text-center font-display text-base font-semibold leading-6 text-slate-900"
            >
              <FormattedMessage
                id={`issues/modal/error/title/${props.issue.name}`}
              />
            </Dialog.Title>

            <div className="mt-2">
              {props.issue.name === IssueNames["robots/crawl-allowed"] && (
                <RobotsCrawlAllowed context={props.issue.context} />
              )}

              {props.issue.name === IssueNames["robots/empty"] && (
                <RobotsEmpty context={props.issue.context} />
              )}

              {props.issue.name === IssueNames["robots/javascript"] && (
                <RobotsJavascript context={props.issue.context} />
              )}

              {props.issue.name === IssueNames["server/error"] && (
                <ServerError context={props.issue.context} />
              )}

              {props.issue.name === IssueNames["server/not-https"] && (
                <ServerNotHttps context={props.issue.context} />
              )}

              {props.issue.name ===
                IssueNames["server/not-sc-domain/not-same-url"] && (
                <ServerNotScDomainNotSameUrl context={props.issue.context} />
              )}

              {props.issue.name === IssueNames["server/not-sc-domain"] && (
                <ServerNotScDomain context={props.issue.context} />
              )}

              {props.issue.name === IssueNames["server/no-index"] && (
                <ServerNoIndex context={props.issue.context} />
              )}

              {props.issue.name === IssueNames["sitemap/no-sitemap"] && (
                <SitemapNoSitemap context={props.issue.context} />
              )}

              {props.issue.name === IssueNames["sitemap/server-error"] && (
                <SitemapServerError context={props.issue.context} />
              )}

              {props.issue.name === IssueNames["sitemap/bad-formed"] && (
                <SitemapBadFormed context={props.issue.context} />
              )}
            </div>
          </div>

          <div className="mt-5 sm:mt-6">
            <ButtonSecondary fullWidth size="md" onClick={props.onClose}>
              Close
            </ButtonSecondary>
          </div>
        </div>
      )}
    </GlobalModal>
  )
}
