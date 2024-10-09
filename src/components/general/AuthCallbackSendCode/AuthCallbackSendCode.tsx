import { useLocation } from "@reach/router"
import React, { useEffect } from "react"
import { Container as C } from "../../ui/Container"
import { Help } from "../Help/Help"
import { Loader } from "../Loader/Loader"
import {
  connector,
  ContainerProps,
} from "./containers/AuthCallbackSendCode.containers"

type Props = {
  onMount: (params: { code: string }) => void
}

export const Wrapper: React.FC<Props> = (props) => {
  const { href } = useLocation()
  const url = new URL(href || "https://www.foudroyer.com")

  useEffect(() => {
    props.onMount({
      code: url.searchParams.get("code") as string,
    })
  }, [])

  return (
    <C className="relative">
      <div className="fixed inset-0 z-40 flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="font-display">Waiting for authentication…</div>
          <div className="font-display text-sm text-slate-500">
            If nothing happens, please contact me through the help center below.
          </div>
          <div className="relative mt-8">
            <Loader />
          </div>
        </div>
        <Help forceShow />
      </div>
    </C>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const AuthCallbackSendCode = connector(Container)
