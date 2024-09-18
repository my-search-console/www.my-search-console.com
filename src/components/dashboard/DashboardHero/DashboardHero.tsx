import { PaymentEntity } from "@foudroyer/interfaces"
import { WebsiteEntity } from "@foudroyer/interfaces/dist/entities/WebsiteEntity"
import React from "react"
import { IndexationSearchEngines } from "../../../entities/SearchEngineEntity"
import { bigNumberFormatter } from "../../../utils/bigNumberFormatter"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ButtonPrimary } from "../../UI/Button/Button"
import {
  connector,
  ContainerProps,
} from "./containers/DashboardHero.containers"

type Props = {
  websites: WebsiteEntity[]
  fetching: boolean
  plan: PaymentEntity | null
  onDisplay: () => void
  onToggleAutoIndexing: (params: { website: WebsiteEntity }) => void
  onToggleSource: (params: {
    website: WebsiteEntity
    source: IndexationSearchEngines
  }) => void
  onAddWebsite: () => void
  onBoost: (params: { website: WebsiteEntity }) => void
  onSeeDetails: (params: { website: WebsiteEntity }) => void
}

function calcultateQuota(website: WebsiteEntity) {
  if (!website || !website.google_api_keys) return "0"
  if (website.google_api_keys.length === 0 && website.index_now_installed) {
    return "10k+"
  }
  return bigNumberFormatter(website.google_api_keys.length * 200, 1)
}

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center pb-12 pt-6 text-center">
        <p className="text-center font-display text-lg font-medium text-pink-400">
          <FormattedMessage id="dashboard/hero/label" />
        </p>
        <h1 className="mx-auto flex flex-col font-display text-4xl font-semibold leading-tight tracking-tight text-slate-900 ">
          <FormattedMessage id="dashboard/hero/title" />
        </h1>
        <p className="mx-auto mt-2 max-w-lg text-lg leading-normal tracking-tight text-slate-500">
          <FormattedMessage id="dashboard/hero/description" />
        </p>

        <div className="mt-4">
          <ButtonPrimary onClick={props.onAddWebsite}>
            <FormattedMessage id="analytics/button/add-website" />
          </ButtonPrimary>
        </div>
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const DashboardHero = connector(Container)
