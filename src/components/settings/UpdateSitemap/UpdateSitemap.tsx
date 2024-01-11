import React from "react"
import { ContainerProps, connector } from "./containers/UpdateSitemap.container"
import { SettingSection } from "../SettingSection/SettingSection"
import { ButtonSecondary } from "../../UI/Button/Button"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ArrowPathIcon } from "@heroicons/react/20/solid"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import classnames from "classnames"
import { Tooltip } from "../../UI/Tooltip"

dayjs.extend(relativeTime)

export const UpdateSitemapButtonWrapper: React.FC<{
  isFetching: boolean
  onSyncSitemap: () => void
  showLabel?: boolean
  sitemapUpdatedAt: Date | null
}> = (props) => (
  <Tooltip
    direction={"bottom"}
    align="right"
    label={
      <div className="text-center">
        <span className="mr-1">Sync Sitemap</span>
        <div>
          <FormattedMessage id="settings/update-sitemap/last-update" />
          <span className="ml-1">
            {dayjs(props.sitemapUpdatedAt).fromNow()}
          </span>
        </div>
      </div>
    }
  >
    <ButtonSecondary size="sm" onClick={props.onSyncSitemap}>
      <ArrowPathIcon
        className={classnames(
          "h-4 w-4",
          props.isFetching && "animate-spin",
          props.showLabel && "mr-2"
        )}
      />
      {props.isFetching && props.showLabel && (
        <FormattedMessage id="settings/update-sitemap/synchronizing" />
      )}
      {!props.isFetching && props.showLabel && (
        <FormattedMessage id="settings/update-sitemap/synchronize" />
      )}
    </ButtonSecondary>
  </Tooltip>
)

export const Wrapper: React.FC<{
  sitemapUpdatedAt: Date | null
  isFetching: boolean
  sitemapUrl: string | null
  onClick: () => void
  onSyncSitemap: () => void
}> = (props) => {
  return (
    <SettingSection
      title={<FormattedMessage id="settings/update-sitemap/title" />}
      description={
        <FormattedMessage id="settings/update-sitemap/description" />
      }
    >
      <div className="flex flex-wrap items-center gap-2">
        <ButtonSecondary size="sm" onClick={props.onClick}>
          <FormattedMessage id="settings/update-sitemap/cta" />
        </ButtonSecondary>

        <UpdateSitemapButtonWrapper showLabel {...props} />

        {props.sitemapUrl && (
          <div>
            <a
              target="_blank"
              href={props.sitemapUrl}
              className="ml-1 flex items-center justify-center font-display text-xs text-blue-400 underline"
            >
              {props.sitemapUrl}
            </a>
            {props.sitemapUpdatedAt && (
              <div className="ml-1 flex font-display text-xs text-slate-400">
                <FormattedMessage id="settings/update-sitemap/last-update" />

                <span className="ml-1">
                  {dayjs(props.sitemapUpdatedAt).fromNow()}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </SettingSection>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const UpdateSitemap = connector(Container)

export const UpdateSitemapButtonContainer: React.FC<ContainerProps> = (
  props
) => <UpdateSitemapButtonWrapper {...props} />
export const UpdateSitemapButton = connector(UpdateSitemapButtonContainer)
