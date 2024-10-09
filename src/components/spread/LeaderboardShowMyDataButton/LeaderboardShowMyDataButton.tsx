import { CakeIcon } from "@heroicons/react/20/solid"
import React from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ButtonPrimary } from "../../uiii/Button/Button"
import { Container } from "../../uiii/Container"
import {
  connector,
  ContainerProps,
} from "./containers/LeaderboardShowMyDataButton.container"

export const Wrapper: React.FC<ContainerProps> = (props) => {
  if (!props.isRealUserData) {
    return (
      <div className="fixed bottom-8 left-0 right-0">
        <Container>
          <div className="relative mx-auto w-full max-w-5xl items-center justify-between rounded-lg border border-pink-100 bg-pink-50 p-2 md:flex">
            <div className="mx-auto h-12 w-12 shrink-0 rounded-md bg-pink-50 p-2 md:mx-0">
              <CakeIcon className="w-full animate-bounce fill-pink-500"></CakeIcon>
            </div>

            <div className="text-center font-display">
              <div>
                <FormattedMessage
                  id="marketing/pricing/reduction/banner/title"
                  values={{
                    d: <u>-50%</u>,
                  }}
                />
              </div>
              <div className="text-xs text-slate-700">
                <FormattedMessage id="marketing/pricing/reduction/banner/description" />
              </div>
            </div>

            <div className="mt-4 flex shrink-0 items-center justify-center space-x-1 md:mt-0 ">
              <ButtonPrimary size="sm" onClick={props.onClick}>
                <FormattedMessage id="show-off/leaderboard/clicks" />
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
