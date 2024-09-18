import { useLocation } from "@reach/router"
import React, { ReactNode } from "react"
import Logo from "../../../assets/logo/logo.svg"
import AdvancedFiltersVideo from "../../../assets/videos/advanced-filters.mp4"
import CentralizeDataVideo from "../../../assets/videos/centralize-data.mp4"
import GiveImpactVideo from "../../../assets/videos/give-impact.mp4"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { Loader } from "../../general/Loader/Loader"
import { ButtonPrimary, ButtonSecondary } from "../../UI/Button/Button"
import { Modal } from "../../UI/Modal/Modal"
import {
  connector,
  ContainerProps,
} from "./containers/AnalyticsActivateModal.container"

type Props = {
  onClose: () => void
  onAccept: () => void
  onClickShowDemo: () => void
  isLoading: boolean
}

const Feature: React.FC<{
  title: ReactNode
  description: ReactNode
  illustration: ReactNode
}> = (props) => (
  <div className="w-[80%] flex-shrink-0 snap-center rounded-lg border border-slate-100 md:w-full">
    <div className="flex h-min w-full items-center overflow-hidden rounded-t">
      {props.illustration}
    </div>
    <div className="rounded-b  border-t-transparent px-3 py-2">
      <h3 className="font-display text-sm leading-tight">{props.title}</h3>
      <p className="my-1 font-sans text-xs leading-tight text-slate-500">
        {props.description}
      </p>
    </div>
  </div>
)

export const Wrapper: React.FC<Props> = (props) => {
  const { href } = useLocation()
  const isOpen = href.includes("analytics-activate-modal")

  return (
    <Modal isOpen={isOpen} onClose={props.onClose}>
      <div className="w-full overflow-hidden">
        {props.isLoading && (
          <Loader
            additionnalText={
              <FormattedMessage id="modal/analytics-activate-modal/loading" />
            }
          />
        )}

        <div>
          <img src={Logo} alt="Logo de Foudroyer" className="mx-auto h-6" />
          <h2 className="mt-4 text-center font-display  text-lg font-medium leading-tight">
            <FormattedMessage
              id="modal/analytics-activate-modal/title"
              values={{
                br: () => <br />,
              }}
            />
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-slate-500">
            <FormattedMessage id="modal/analytics-activate-modal/description" />
          </p>
          <div className="mt-4 flex w-full items-center justify-center space-x-2">
            <ButtonPrimary onClick={props.onAccept} size="sm">
              <FormattedMessage id="modal/analytics-activate-modal/cta/confirm" />
            </ButtonPrimary>
            <ButtonSecondary onClick={props.onClose} size="sm">
              <FormattedMessage id="modal/analytics-activate-modal/cta/close" />
            </ButtonSecondary>
          </div>

          <div className="mx-auto mt-4 hidden w-full flex-wrap space-y-2">
            <ButtonPrimary onClick={props.onAccept} fullWidth>
              <FormattedMessage id="modal/analytics-activate-modal/cta/confirm" />
            </ButtonPrimary>
          </div>
        </div>

        <div className="no-scroll-bar mt-4 flex max-w-3xl snap-x grid-cols-3 gap-4 overflow-x-scroll md:grid md:w-full">
          <Feature
            title={
              <FormattedMessage id="modal/analytics-activate-modal/features/centralize/title" />
            }
            description={
              <FormattedMessage id="modal/analytics-activate-modal/features/centralize/description" />
            }
            illustration={
              <div className="relative h-full w-full">
                <video
                  src={CentralizeDataVideo}
                  className="relative aspect-video h-full w-full touch-auto object-cover md:aspect-auto"
                  playsInline
                  autoPlay
                  muted
                  loop
                ></video>
                <div className="absolute inset-0 z-10 h-full w-full bg-transparent"></div>
              </div>
            }
          />

          <Feature
            title={
              <FormattedMessage id="modal/analytics-activate-modal/features/filter/title" />
            }
            description={
              <FormattedMessage id="modal/analytics-activate-modal/features/filter/description" />
            }
            illustration={
              <div className="relative h-full w-full">
                <video
                  src={AdvancedFiltersVideo}
                  className="relative aspect-video h-full w-full touch-auto object-cover md:aspect-auto"
                  playsInline
                  autoPlay
                  muted
                  loop
                ></video>
                <div className="absolute inset-0 z-10 h-full w-full bg-transparent"></div>
              </div>
            }
          />

          <Feature
            title={
              <FormattedMessage id="modal/analytics-activate-modal/features/impact/title" />
            }
            description={
              <FormattedMessage id="modal/analytics-activate-modal/features/impact/description" />
            }
            illustration={
              <div className="relative h-full w-full">
                <video
                  src={GiveImpactVideo}
                  className="relative aspect-video h-full w-full touch-auto object-cover md:aspect-auto"
                  playsInline
                  autoPlay
                  muted
                  loop
                ></video>
                <div className="absolute inset-0 z-10 h-full w-full bg-transparent"></div>
              </div>
            }
          />
        </div>
      </div>
    </Modal>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const AnalyticsActivateModal = connector(Container)
