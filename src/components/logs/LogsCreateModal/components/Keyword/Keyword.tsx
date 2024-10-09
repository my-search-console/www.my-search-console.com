import { XMarkIcon } from "@heroicons/react/20/solid"
import React from "react"
import { ButtonSecondary } from "../../../../uiii/Button/Button"

export const Keyword: React.FC<{
  keyword: string
  onClick: () => void
}> = (props) => (
  <ButtonSecondary size="sm" onClick={props.onClick}>
    {props.keyword}
    <XMarkIcon className="ml-1 h-4 w-4" />
  </ButtonSecondary>
)
