import { PaymentPlansEntity, UserEntity } from "@foudroyer/interfaces"
import { XMarkIcon } from "@heroicons/react/20/solid"
import React, { useState } from "react"
import EasterIcon from "../../../assets/logo/EasterIcon"
import { ButtonPrimary } from "../../UI/Button/Button"
import { Container } from "../../UI/Container"
import { FormattedMessage } from "../FormattedMessage/FormattedMessage"
import { FoudroyerLink } from "../FoudroyerLink/FoudroyerLink"
import { connector, ContainerProps } from "./containers/Easter.container"

export const Wrapper: React.FC<{
  breadcrumb?: Array<{ url: string; label: string }>
  authenticated: boolean
  onLogin: () => void
  onLogout: () => void
  onOpenOnboardingModal: () => void
  onOpenPremiumModal: (params: { isUpsell: boolean }) => void
  plans: Set<PaymentPlansEntity>
  isFetching: boolean
  user: UserEntity | null
}> = (props) => {
  const [isOpen, setOpen] = useState(true)

  if (!isOpen) return <></>

  return (
    <>
      <div className="fixed bottom-8 left-0 right-0">
        <Container>
          <div className="relative mx-auto w-full max-w-5xl items-center justify-between rounded-lg border border-pink-100 bg-pink-50 p-2 md:flex">
            <div
              onClick={() => setOpen(false)}
              className="absolute left-0 top-0 -translate-x-1/4 -translate-y-1/4 transform cursor-pointer rounded-lg border border-pink-100 bg-pink-50 p-1 md:-translate-x-1/2 md:-translate-y-1/2"
            >
              <XMarkIcon className="h-6 w-6" />
            </div>
            <div className="mx-auto h-12 w-12 shrink-0 rounded-md bg-pink-50 p-2 md:mx-0">
              <EasterIcon className="w-full animate-bounce fill-pink-500"></EasterIcon>
            </div>

            <div className="text-center font-display">
              <div>
                <FormattedMessage
                  id="marketing/pricing/easter/banner/title"
                  values={{
                    d: <u>-40%</u>,
                  }}
                />
              </div>
              <div className="text-xs text-slate-700">
                <FormattedMessage id="marketing/pricing/easter/banner/description" />
              </div>
            </div>

            <div className="mt-4 flex shrink-0 items-center justify-center space-x-1 md:mt-0 ">
              <FoudroyerLink to="/pricing/">
                <ButtonPrimary size="sm">
                  <FormattedMessage id="marketing/pricing/easter/banner/button" />
                </ButtonPrimary>
              </FoudroyerLink>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

const Connected: React.FC<ContainerProps> = (props) => <Wrapper {...props} />

export const Easter = connector(Connected)
