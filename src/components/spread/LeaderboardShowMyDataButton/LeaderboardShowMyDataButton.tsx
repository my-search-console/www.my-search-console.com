import { CakeIcon } from "@heroicons/react/20/solid"
import React from "react"
import { ButtonPrimary } from "../../ui/Button/Button"
import { Container } from "../../ui/Container"
import {
  connector,
  ContainerProps,
} from "./containers/LeaderboardShowMyDataButton.container"

export const Wrapper: React.FC<ContainerProps> = (props) => {
  if (!props.isAuthenticated) {
    return (
      <div className="sticky mt-4 bottom-8 left-0 right-0">
        <Container>
          <div className="relative mx-auto w-full items-center justify-between rounded-lg border border-slate-100 shadow-slate-100 shadow-btn bg-white p-2 md:flex">
            <div className="mx-auto h-12 w-12 shrink-0 rounded-md bg-white p-2 md:mx-0">
              <CakeIcon className="w-full fill-pink-500"></CakeIcon>
            </div>

            <div className="text-center font-display">
              <div>
                Tu regardes actuellement des données de démonstration issues de
                la Search Console.
              </div>
              <div className="text-xs mx-auto text-slate-700">
                Si tu veux voir tes données également, c'est gratuit. Il suffit
                de cliquer sur le bouton.
              </div>
            </div>

            <div className="mt-4 flex shrink-0 items-center justify-center space-x-1 md:mt-0 ">
              <ButtonPrimary size="sm" onClick={props.onClick}>
                Voir mes données
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
