import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid"
import React from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ButtonPrimary, ButtonSecondary } from "../../UI/Button/Button"
import { connector, ContainerProps } from "./containers/Pagination.containers"

type Props = {
  page: number
  total: number
  limit: number
  onPrevious: () => void
  onSelect: (page: number) => void
  onNext: () => void
}

export const Wrapper: React.FC<Props> = (props) => {
  const pages = Math.ceil(props.total / props.limit)

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex-shrink-0">
          <ButtonPrimary
            size="sm"
            onClick={props.onPrevious}
            disabled={props.page <= 1}
          >
            <ArrowLeftIcon className="h-5 w-5 md:mr-1" />
            <span className="hidden md:inline">
              <FormattedMessage id="pages/previous" />
            </span>
          </ButtonPrimary>
        </div>

        <nav className="relative inline-flex flex-wrap space-x-2">
          {Array.from({ length: pages }).map((v, index) => {
            const active = index + 1 === props.page
            return (
              <ButtonSecondary
                size="sm"
                key={index}
                onClick={() => props.onSelect(index + 1)}
                active={active}
              >
                {index + 1}
              </ButtonSecondary>
            )
          })}
        </nav>

        <div className="flex-shrink-0">
          <ButtonPrimary
            size="sm"
            onClick={props.onNext}
            disabled={
              props.total === 0 ||
              props.page === Math.ceil(props.total / props.limit)
            }
          >
            <span className="hidden md:mr-1 md:inline">
              <FormattedMessage id="pages/next" />
            </span>
            <ArrowRightIcon className="h-5 w-5" />
          </ButtonPrimary>
        </div>
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const Pagination = connector(Container)
