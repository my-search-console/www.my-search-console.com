import { PaymentEntity } from "@foudroyer/interfaces"
import { CreditCardIcon, PlayIcon, XMarkIcon } from "@heroicons/react/20/solid"
import React from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ButtonSecondary } from "../../ui/Button/Button"
import { SettingSection } from "../SettingSection/SettingSection"
import { SettingsInvoicesModal } from "../SettingsInvoicesModal/SettingsInvoicesModal"
import {
  connector,
  ContainerProps,
} from "./containers/ManageSubscription.container"

export const Wrapper: React.FC<{
  payments: PaymentEntity[]
  isYearly: boolean
  isLoading: boolean
  onOpenInvoicesModal: () => void
  onOpenUnsubscribe: () => void
  onResume: () => void
}> = (props) => {
  if (props.payments.length === 0) return <></>

  const payment = props.payments[0]

  if (payment.cancellation_effective_date)
    return (
      <SettingSection
        title={<FormattedMessage id="settings/payments/title" />}
        description={<FormattedMessage id="settings/payments/description" />}
      >
        <div className="flex flex-col items-start gap-2">
          <div className="mt-2 rounded border border-slate-100 bg-slate-50 p-2 px-4 text-sm">
            Your subscription will end at:{" "}
            {new Date(payment.cancellation_effective_date).toISOString()}
          </div>
        </div>
      </SettingSection>
    )

  if (payment.paused_at)
    return (
      <SettingSection
        title={<FormattedMessage id="settings/resume/title" />}
        description={<FormattedMessage id="settings/resume/description" />}
      >
        <div className="flex flex-col items-start gap-2">
          <ButtonSecondary size="sm" onClick={props.onResume}>
            <PlayIcon className="mr-1 h-5 w-5" />{" "}
            <FormattedMessage id="settings/resume/button" />
          </ButtonSecondary>
        </div>
      </SettingSection>
    )

  return (
    <SettingSection
      title={<FormattedMessage id="settings/payments/title" />}
      description={
        <FormattedMessage
          id="settings/payments/description"
          values={{
            d: props.payments[0].plan || "free",
          }}
        />
      }
    >
      <div className="flex flex-wrap gap-2">
        <a href={payment.update_url} target="_blank">
          <ButtonSecondary size="sm">
            <CreditCardIcon className="mr-1 h-5 w-5" />
            <FormattedMessage id="settings/payments/update" />
          </ButtonSecondary>
        </a>

        <ButtonSecondary size="sm" onClick={props.onOpenUnsubscribe}>
          <XMarkIcon className="mr-1 h-5 w-5" />
          <FormattedMessage id="settings/payments/cancel" />
        </ButtonSecondary>
      </div>
      <SettingsInvoicesModal />
    </SettingSection>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const ManageSubscription = connector(Container)
