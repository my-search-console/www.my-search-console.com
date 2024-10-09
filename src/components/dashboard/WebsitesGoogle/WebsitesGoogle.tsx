import React, { useEffect } from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import {
  connector,
  ContainerProps,
} from "./containers/WebsitesGoogle.containers"

import { ItemLoading } from "../../indexation/IndexedTable/components/ItemLoading"
import { ButtonSecondary } from "../../ui/Button/Button"

type Props = {
  websites: { id: string }[]
  fetching: boolean
  onMount: () => void
  onAdd: (params: { id: string }) => void
}

export const Wrapper: React.FC<Props> = (props) => {
  useEffect(() => {
    props.onMount()
  }, [])

  if (!props.fetching && props.websites.length === 0) return <></>

  return (
    <div>
      {!props.fetching && (
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <h1 className="mx-auto flex flex-col font-display text-4xl font-semibold leading-tight tracking-tight text-slate-900 ">
            <FormattedMessage id="dashboard/google/title" />
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-lg leading-normal tracking-tight text-slate-500">
            <FormattedMessage id="dashboard/google/description" />
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        {props.fetching &&
          Array.from({ length: 10 }).map((value, index) => (
            <ItemLoading key={index} delay={index * 100} />
          ))}

        {!props.fetching &&
          props.websites.map((website, index) => (
            <div
              key={website.id}
              className="w-full rounded-md border border-slate-100 p-2"
            >
              <div className="flex w-full items-center justify-between">
                <div className="md:w-1/4">
                  <div className="flex w-full items-center">
                    <img
                      src={"/websites/no-favicon.svg"}
                      className="h-4  w-4"
                    />
                    <p className="ml-2 overflow-hidden truncate font-display text-sm font-medium text-slate-900">
                      {website.id}
                    </p>
                  </div>
                </div>

                <ButtonSecondary
                  size="sm"
                  onClick={() => props.onAdd({ id: website.id })}
                >
                  <FormattedMessage id="dashboard/google/add" />
                </ButtonSecondary>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const WebsitesGoogle = connector(Container)
