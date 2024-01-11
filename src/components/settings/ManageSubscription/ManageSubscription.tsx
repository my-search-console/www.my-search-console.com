import React, { useEffect } from "react"
import {
  ContainerProps,
  connector,
} from "./containers/ManageSubscription.container"
import { SettingSection } from "../SettingSection/SettingSection"
import { ButtonPrimary, ButtonSecondary } from "../../UI/Button/Button"
import { CreditCardIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { PaymentEntity } from "@foudroyer/interfaces"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ArrowDownCircleIcon, SparklesIcon } from "@heroicons/react/24/solid"
import { SettingsInvoicesModal } from "../SettingsInvoicesModal/SettingsInvoicesModal"
import { DocumentChartBarIcon } from "@heroicons/react/24/outline"

export const Wrapper: React.FC<{
  payments: PaymentEntity[]
  isYearly: boolean
  isLoading: boolean
  onOpenInvoicesModal: () => void
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
        <a href={payment.cancel_url} target="_blank">
          <ButtonSecondary size="sm">
            <XMarkIcon className="mr-1 h-5 w-5" />
            <FormattedMessage id="settings/payments/cancel" />
          </ButtonSecondary>
        </a>
      </div>
      <SettingsInvoicesModal />
    </SettingSection>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const ManageSubscription = connector(Container)
