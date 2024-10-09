import { PaymentEntity } from "@foudroyer/interfaces"
import { DocumentChartBarIcon } from "@heroicons/react/24/outline"
import React from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ButtonSecondary } from "../../ui/Button/Button"
import { SettingSection } from "../SettingSection/SettingSection"
import { SettingsInvoicesModal } from "../SettingsInvoicesModal/SettingsInvoicesModal"
import { connector, ContainerProps } from "./containers/Invoices.container"

export const Wrapper: React.FC<{
  payments: PaymentEntity[]
  isYearly: boolean
  isLoading: boolean
  onOpenInvoicesModal: () => void
}> = (props) => {
  return (
    <SettingSection
      title={<FormattedMessage id="settings/invoices/title" />}
      description={<FormattedMessage id="settings/invoices/description" />}
    >
      <div className="flex flex-wrap gap-2">
        <div>
          <ButtonSecondary size="sm" onClick={props.onOpenInvoicesModal}>
            <DocumentChartBarIcon className="mr-1 h-5 w-5" />
            <FormattedMessage id="settings/invoices/cta" />
          </ButtonSecondary>
        </div>
      </div>
      <SettingsInvoicesModal />
    </SettingSection>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const Invoices = connector(Container)
