import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import React, { useEffect, useState } from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ButtonPrimary } from "../../ui/Button/Button"
import { Container } from "../../ui/Container"
import {
  connector,
  ContainerProps,
} from "./containers/LeaderboardShowMyDataButton.container"

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!props.isAuthenticated && isMounted) {
    return (
      <div id="demo-banner" className="sticky mt-4 bottom-8 left-0 right-0">
        <Container>
          <div className="relative mx-auto w-full items-center justify-between rounded-lg border border-slate-100 shadow-slate-100 shadow-btn bg-white p-2 md:flex">
            <div className="mx-auto h-12 w-12 shrink-0 rounded-md bg-white p-2 md:mx-0">
              <ExclamationCircleIcon className="w-full "></ExclamationCircleIcon>
            </div>

            <div className="text-center font-display">
              <div>
                <FormattedMessage id="demo-banner/title" />
              </div>
              <div className="text-xs mx-auto text-slate-700">
                <FormattedMessage id="demo-banner/description" />
              </div>
            </div>

            <div className="mt-4 flex shrink-0 items-center justify-center space-x-1 md:mt-0 ">
              <ButtonPrimary
                data-attr="demo-banner/use-my-data"
                size="sm"
                onClick={props.onClick}
              >
                <FormattedMessage id="demo-banner/button" />
              </ButtonPrimary>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return <></>
}

export const LeaderboardShowMyDataButton = connector(Wrapper)
