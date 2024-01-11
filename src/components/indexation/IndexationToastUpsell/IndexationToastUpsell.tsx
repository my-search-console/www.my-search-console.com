import React, { useEffect } from "react"
import { InformationCircleIcon } from "@heroicons/react/20/solid"
import {
  ContainerProps,
  connector,
} from "./containers/IndexationToastUpsell.container"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import classNames from "classnames"
import { SmallStyle } from "../../UI/Button/Button"
import { PaymentPlansEntity } from "@foudroyer/interfaces"

export const Wrapper: React.FC<{
  plans: Set<PaymentPlansEntity>
  pagesInQueue: number
  onClick: () => void
}> = (props) => {
  if (props.plans.size === 0) return <></>
  if (props.plans.has(PaymentPlansEntity.enterprise)) return <></>
  if (props.pagesInQueue < 1000) return <></>

  const userQuota = props.plans.has(PaymentPlansEntity.indexation) ? 400 : 200

  return (
    <div className="rounded-md border border-blue-100 bg-blue-50 p-4">
      <div className="flex flex-col items-center md:flex-row">
        <div className="flex w-full items-start">
          <div className="mt-0.5 flex-shrink-0">
            <InformationCircleIcon
              className="h-5 w-5 text-blue-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-blue-800">
              <FormattedMessage
                id="indexation/toast/queue/upsell/description"
                values={{
                  v: props.pagesInQueue,
                  d: Math.round(props.pagesInQueue / userQuota),
                }}
              />
            </p>
          </div>
        </div>
        <div className="mt-4 flex w-full items-center justify-end pl-3 md:mt-0 md:w-max md:flex-row">
          <button
            type="button"
            className={classNames(
              "ml-2 w-max border-transparent bg-blue-200 text-blue-500 hover:bg-blue-300 hover:text-blue-700  focus:ring-blue-600  focus:ring-offset-blue-50 md:flex-row",
              SmallStyle
            )}
            onClick={() => {
              props.onClick()
            }}
          >
            <FormattedMessage
              id="indexation/toast/queue/upsell/button"
              values={{
                v: Math.ceil(props.pagesInQueue / 2000),
              }}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const IndexationToastUpsell = connector(Container)
