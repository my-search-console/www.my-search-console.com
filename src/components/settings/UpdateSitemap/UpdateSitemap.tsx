import { ArrowPathIcon } from "@heroicons/react/20/solid"
import classnames from "classnames"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import React from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ButtonSecondary } from "../../ui/Button/Button"
import { SettingSection } from "../SettingSection/SettingSection"
import { OpenSitemapManagerModalButton } from "./components/OpenSitemapManagerModalButton/OpenSitemapManagerModalButton"
import { connector, ContainerProps } from "./containers/UpdateSitemap.container"

dayjs.extend(relativeTime)

export const UpdateSitemapButtonWrapper: React.FC<{
  isFetching: boolean
  onSyncSitemap: () => void
  showLabel?: boolean
  sitemapUpdatedAt: Date | null
}> = (props) => (
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
        <OpenSitemapManagerModalButton />
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
