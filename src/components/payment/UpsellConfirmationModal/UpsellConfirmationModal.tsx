import React, { ReactNode } from "react"

import { useLocation } from "@reach/router"
import getSymbolFromCurrency from "currency-symbol-map"
import { ModalKeys } from "../../../entities/ModalEntity"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ButtonPrimary, ButtonSecondary } from "../../UI/Button/Button"
import { Modal } from "../../UI/Modal/Modal"
import {
  connector,
  ContainerProps,
} from "./containers/UpsellConfirmationModal.containers"

type Props = ContainerProps

const Highlight: React.FC<{ children: ReactNode }> = (props) => (
  <span
    {...props}
    className="mx-1 rounded border border-pink-100 bg-pink-50 px-2 py-0.5 font-display text-pink-500"
  />
)

export const Wrapper: React.FC<Props> = (props) => {
  const { href } = useLocation()
  const product = props.products[props.actualPlan?.plan || ""] || {}
  const isOpen = href
    ? href.includes(ModalKeys["upsell-confirmation-modal"])
    : false

  return (
    <Modal isOpen={isOpen} leavePaddingTop onClose={props.onClose}>
      <div>
        <div>
          <h2 className="text-center font-display text-xl font-medium leading-tight">
            <FormattedMessage id="pricing/upsell/title"></FormattedMessage>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-500">
            <FormattedMessage
              id={`pricing/upsell/message/${props.interval}`}
              values={{
                0: (
                  <Highlight>
                    <FormattedMessage
                      id={`pricing/plans/name/${props.actualPlan?.plan}`}
                    />
                  </Highlight>
                ),
                1: (
                  <Highlight>
                    {product[props.interval]}
                    {getSymbolFromCurrency(props.products.currency)}
                  </Highlight>
                ),
                2: (
                  <Highlight>
                    <FormattedMessage id={`pricing/plans/name/${props.plan}`} />
                  </Highlight>
                ),
                3: (
                  <Highlight>
                    {props.products[props.plan][props.interval]}
                    {getSymbolFromCurrency(props.products.currency)}
                  </Highlight>
                ),
              }}
            />
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <ButtonPrimary onClick={props.onClose}>
            <FormattedMessage id="pricing/upsell/close"></FormattedMessage>
          </ButtonPrimary>
          <ButtonSecondary onClick={props.onConfirm}>
            <FormattedMessage id="pricing/upsell/confirm"></FormattedMessage>
          </ButtonSecondary>
        </div>
      </div>
    </Modal>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const PremiumModal = connector(Container)
