import { FolderIcon } from "@heroicons/react/20/solid"
import React from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { ButtonSecondary } from "../../../../uiii/Button/Button"
import { Tooltip } from "../../../../uiii/Tooltip"
import {
  connector,
  ContainerProps,
} from "./containers/OpenSitemapManagerModalButton.container"

export const Wrapper: React.FC<{
  onClick: () => void
  hideLabel?: boolean
}> = (props) => {
  return (
    <Tooltip
      label={<FormattedMessage id="update-sitemap/button-open" />}
      direction="bottom"
      align="center"
    >
      <ButtonSecondary size="sm" onClick={props.onClick}>
        <FolderIcon className="h-5 w-5" />
        {!props.hideLabel && (
          <span className="ml-2">
            <FormattedMessage id="settings/update-sitemap/cta" />
          </span>
        )}
      </ButtonSecondary>
    </Tooltip>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const OpenSitemapManagerModalButton = connector(Container)
