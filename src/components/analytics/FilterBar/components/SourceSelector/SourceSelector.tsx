import React from "react"
import { ButtonSecondary } from "../../../../UI/Button/Button"
import { Tooltip } from "../../../../UI/Tooltip"
import {
  connector,
  ContainerProps,
} from "./containers/SourceSelector.container"
import {
  BoltIcon,
  ChartBarIcon,
  CircleStackIcon,
} from "@heroicons/react/20/solid"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { UpdateSitemapButton } from "../../../../settings/UpdateSitemap/UpdateSitemap"

type Props = {
  onIndexAll: () => void
  onToggleView: (view: "auto" | "indexation") => void
  fetching: boolean
  length: number
  view: "auto" | "report" | "indexation"
  isFilterApplied: boolean
}

export const Wrapper: React.FC<Props> = (props) => (
  <div className="flex w-full items-center justify-between">
    <div className="space-x-1">
      {props.isFilterApplied && (
        <ButtonSecondary
          size="sm"
          disabled={props.fetching}
          onClick={props.onIndexAll}
        >
          <BoltIcon className="mr-2 h-4 w-4" />
          <FormattedMessage
            id="indexation/filter-panel/save/buttons/index"
            values={{
              d: props.length,
            }}
          />
        </ButtonSecondary>
      )}

      <UpdateSitemapButton />

      {props.view === "indexation" && (
        <ButtonSecondary size="sm" onClick={() => props.onToggleView("auto")}>
          <ChartBarIcon className="h-4 w-4" />
        </ButtonSecondary>
      )}

      {props.view === "auto" && (
        <ButtonSecondary
          size="sm"
          onClick={() => props.onToggleView("indexation")}
        >
          <CircleStackIcon className="h-4 w-4" />
        </ButtonSecondary>
      )}
    </div>
  </div>
)

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const SourceSelector = connector(Container)
