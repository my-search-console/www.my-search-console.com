import { PaymentEntity, PaymentPlansEntity } from "@foudroyer/interfaces"
import React from "react"
import {
  connector,
  ContainerProps,
} from "./containers/PlanNavbarButton.container"

type Props = {
  authenticated: boolean
  plan: PaymentEntity | null
  onOpenPremiumModal: (params: { isUpsell: boolean }) => void
  isPremium: boolean
  readonly?: boolean
}

const Wrapper: React.FC<Props> = (props) => (
  <>
    {!props.isPremium && props.authenticated && (
      <div
        onClick={() =>
          !props.readonly && props.onOpenPremiumModal({ isUpsell: false })
        }
      >
        Free
      </div>
    )}

    {props.plan?.plan === PaymentPlansEntity.newbie && (
      <div
        onClick={() =>
          !props.readonly && props.onOpenPremiumModal({ isUpsell: true })
        }
      >
        Newbie {props.plan.paused_at && "(Paused)"}
      </div>
    )}

    {props.plan?.plan === PaymentPlansEntity.indexation && (
      <div
        onClick={() =>
          !props.readonly && props.onOpenPremiumModal({ isUpsell: true })
        }
      >
        Pro {props.plan.paused_at && "(Paused)"}
      </div>
    )}

    {props.plan?.plan === PaymentPlansEntity.enterprise && (
      <div>Enterprise {props.plan.paused_at && "(Paused)"}</div>
    )}
  </>
)

const Connected: React.FC<ContainerProps> = (props) => <Wrapper {...props} />

export const PlanNavbarButton = connector(Connected)
