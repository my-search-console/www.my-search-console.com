import React from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import {
  SourceBingButton,
  SourceYandexButton,
} from "../../general/SourceButtons/SourceButtons"
import {
  connector,
  ContainerProps,
} from "./containers/ConnectService.container"

export const Wrapper: React.FC<{
  connectedWithGoogle: boolean
  connectedWithBing: boolean
  connectedWithYandex: boolean
  onClick: (source: "yandex" | "bing") => void
}> = (props) => {
  return (
    <div className="mt-2 flex max-w-7xl justify-between rounded-lg border border-slate-100 p-4">
      <div>
        <div className="font-display text-sm font-medium">
          <FormattedMessage id="settings/connect-sources/title" />
        </div>
        <p className="max-w-3xl text-sm text-slate-500">
          <FormattedMessage id="settings/connect-sources/description" />
        </p>
      </div>

      <div className="">
        <div className="flex gap-2">
          <SourceBingButton
            onClick={() => props.onClick("bing")}
            isActive={props.connectedWithBing}
          />
          <SourceYandexButton
            onClick={() => props.onClick("yandex")}
            isActive={props.connectedWithYandex}
          />
        </div>
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const ConnectService = connector(Container)
