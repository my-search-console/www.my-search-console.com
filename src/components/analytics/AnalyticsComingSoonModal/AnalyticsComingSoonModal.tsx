import React from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { Modal } from "../../UI/Modal/Modal"
import {
  connector,
  ContainerProps,
} from "./containers/AnalyticsComingSoonModal.containers"

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} className="!p-0">
      <h1 className="px-4 py-6 font-display text-lg">
        <FormattedMessage id="analytics/modal/coming-soon" />
      </h1>
    </Modal>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const AnalyticsComingSoonModal = connector(Container)
