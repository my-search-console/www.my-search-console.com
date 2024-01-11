import React from "react"
import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import { Confetti } from "../../../general/Confetti/Confetti"
import { FoudroyerLink } from "../../../general/FoudroyerLink/FoudroyerLink"
import { ButtonSecondary } from "../../../UI/Button/Button"
import { FormattedMessage } from "../../../general/FormattedMessage/FormattedMessage"
import { IssueTypes } from "../../../../entities/IssueEntity"
import { ContainerProps, connector } from "./containers/Hero.container"

export const Wrapper: React.FC<{ type: IssueTypes; success: boolean }> = (
  props
) => (
  <div className="relative mt-4 rounded-md p-8 text-center">
    <Confetti isOpen={props.success} respawn={false} />

    <p className="text-center font-display text-lg font-medium text-pink-400">
      <FormattedMessage id={`roast/${props.type}/hero/label`} />
    </p>

    <div className="mx-auto flex max-w-3xl flex-col font-display text-4xl font-semibold leading-tight tracking-tight text-slate-900">
      <FormattedMessage id={`roast/${props.type}/hero/title`} />
    </div>
    <div className="mx-auto mt-2 max-w-xl text-slate-700">
      <FormattedMessage id={`roast/${props.type}/hero/description`} />
    </div>

    <div className="mt-4"></div>

    <FoudroyerLink to="/roast/dashboard/">
      <ButtonSecondary>
        <ArrowLeftIcon className="mr-1 h-5 w-5" />
        <FormattedMessage id={`roast/global/back`} />
      </ButtonSecondary>
    </FoudroyerLink>
  </div>
)

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const Hero = connector(Container)
