import React from "react"

import { connector, ContainerProps } from "./containers/PremiumModal.containers"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { Modal } from "../../UI/Modal/Modal"
import dayjs from "dayjs"
import { Pricing } from "../../marketing/Pricing/Pricing"
import { PaymentPlansEntity } from "@my-search-console/interfaces"
import { PricingUpsell } from "../../marketing/PricingUpsell/PricingUpsell"

export const getTimeout = (end: Date) => {
  const timeBeforeEndDate = dayjs(end).diff(new Date(), "days")
  const timeBeforeEndHours = dayjs(end).diff(new Date(), "hours")
  const timeBeforeEndMinutes = dayjs(end).diff(new Date(), "minutes")

  if (timeBeforeEndDate) {
    return (
      <>
        {timeBeforeEndDate} <FormattedMessage id="tmp/timeout/days" />
      </>
    )
  }

  if (timeBeforeEndHours) {
    return (
      <>
        {timeBeforeEndHours} <FormattedMessage id="tmp/timeout/hours" />
      </>
    )
  }

  if (timeBeforeEndMinutes) {
    return (
      <>
        {timeBeforeEndMinutes} <FormattedMessage id="tmp/timeout/minutes" />
      </>
    )
  }

  return (
    <>
      {timeBeforeEndDate} <FormattedMessage id="tmp/timeout/days" />
    </>
  )
}

type Props = {
  isOpen: boolean
  type: PaymentPlansEntity
  isUpsell: boolean
  isClosable: boolean
  cancellation_effective_date: Date | null
  onClose: () => void
}

export const Wrapper: React.FC<Props> = (props) => {
  const upsellCondition = props.isUpsell && !props.cancellation_effective_date

  return (
    <Modal
      isOpen={props.isOpen}
      leavePaddingTop
      onClose={props.onClose}
      isClosable={props.isClosable}
      className="!p-0"
    >
      {upsellCondition && <PricingUpsell />}
      {!upsellCondition && <Pricing />}
    </Modal>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const PremiumModal = connector(Container)
