import { IndexationSourceType, WebsiteEntity } from "@foudroyer/interfaces"
import React from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import {
  SourceBingButton,
  SourceGoogleButton,
  SourceNaverButton,
  SourceYandexButton,
} from "../../../../general/SourceButtons/SourceButtons"
import { Tooltip } from "../../../../UI/Tooltip"
import {
  connector,
  ContainerProps,
} from "./containers/IndexationSourceEngineButton.container"

export const Wrapper: React.FC<{
  website: WebsiteEntity | null
  source: IndexationSourceType
  onClick: (params: {
    website: WebsiteEntity
    source: IndexationSourceType
  }) => void
}> = (props) => {
  const SourceButton =
    props.source === IndexationSourceType.google
      ? SourceGoogleButton
      : props.source === IndexationSourceType.bing
      ? SourceBingButton
      : props.source === IndexationSourceType.yandex
      ? SourceYandexButton
      : SourceNaverButton

  return (
    <Tooltip
      label={
        <FormattedMessage
          id={`indexation/filter-bar/search-engine/${props.source}/activate`}
        />
      }
      direction={"bottom"}
      align="left"
    >
      <SourceButton
        onClick={() => {
          if (!props.website) return false

          props.onClick({
            website: props.website,
            source: props.source,
          })
        }}
        isActive={Boolean(
          props.website?.indexation_auto_activated_sources.includes(
            props.source
          )
        )}
      />
    </Tooltip>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const IndexationSourceEngineButton = connector(Container)
