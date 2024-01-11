import React, { useEffect } from "react"
import {
  connector,
  ContainerProps,
} from "./containers/UpdateCredentialsModal.containers"
import ExclamationIcon from "@heroicons/react/20/solid/ExclamationCircleIcon"
import { ButtonPrimary, ButtonSecondary } from "../../UI/Button/Button"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { InputFile } from "./components/InputFile"
import { Modal } from "../../UI/Modal/Modal"
import { Dialog } from "@headlessui/react"
import {
  ArrowDownCircleIcon,
  KeyIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import {
  GoogleCredentialEntity,
  IndexationGoogleCloudApiKeyEntity,
  PaymentPlansEntity,
  WebsiteEntity,
} from "@foudroyer/interfaces"
import { ArrowPathIcon } from "@heroicons/react/20/solid"

import { FoudroyerLink } from "../../general/FoudroyerLink/FoudroyerLink"

type Props = {
  isOpen: boolean
  fetching: boolean
  value: string | null
  keys: IndexationGoogleCloudApiKeyEntity[]
  plans: Set<PaymentPlansEntity>
  website: WebsiteEntity | null
  onChange: (value: string) => void
  onSubmit: (website: WebsiteEntity | null) => void
  onDownload: (google_cloud_api_key: string) => void
  onDelete: (params: { keyId: string; website: WebsiteEntity | null }) => void
  onClose: () => void
}

const canAddKey = (props: {
  numberOfKeys: number
  plans: Set<PaymentPlansEntity>
}) => {
  if (
    props.plans.has(PaymentPlansEntity.enterprise) &&
    props.numberOfKeys < 10
  ) {
    return true
  }

  if (
    props.plans.has(PaymentPlansEntity.indexation) &&
    props.numberOfKeys < 2
  ) {
    return true
  }

  if (props.numberOfKeys < 1) return true

  return false
}

export const Wrapper: React.FC<Props> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="relative max-w-md">
        <div>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
            <ExclamationIcon
              className="h-6 w-6 text-pink-500"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <Dialog.Title
              as="h3"
              className="font-display text-base font-semibold leading-6 text-slate-900"
            >
              <FormattedMessage
                id="update-credentials/title"
                values={{
                  d: props.website
                    ? props.website.google_api_keys.length * 200
                    : 0,
                }}
              ></FormattedMessage>
            </Dialog.Title>
            <div className="mt-2 text-left">
              <p className="text-sm text-slate-500">
                <FormattedMessage id="update-credentials/description"></FormattedMessage>
                <a
                  href="https://www.youtube.com/embed/jZ4m9EGQMBc?si=IHR0w3zcsrQTuuDf&autoplay=1&modestbranding=1&rel=0&cc_load_policy=0"
                  target={"_blank"}
                  rel="noreferrer"
                  className="block text-blue-500 underline"
                >
                  <FormattedMessage id="update-credentials/description/link" />
                </a>
              </p>
            </div>
          </div>
        </div>

        {props.keys.length >= 10 && (
          <p className="mt-2 rounded-md bg-pink-50 p-2 px-3 text-sm text-pink-500">
            <FormattedMessage id="update-credentials/max-reached" />
          </p>
        )}
        <ul role="list" className="divide-y divide-gray-100">
          {props.website &&
            props.keys.map((apiKey) => (
              <li
                key={apiKey.id}
                className="flex items-center justify-between gap-x-6 py-5"
              >
                <div className="flex min-w-[50px] items-center gap-x-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-50">
                    <KeyIcon className="h-5 w-5 text-slate-900" />
                  </div>
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-4 text-gray-900">
                      {JSON.parse(apiKey.google_cloud_api_key).project_id}
                    </p>
                    <p className="mt-1 truncate text-xs text-gray-500">
                      {JSON.parse(apiKey.google_cloud_api_key).client_email}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <ButtonSecondary
                    size="sm"
                    onClick={() => {
                      props.onDownload(apiKey.google_cloud_api_key)
                    }}
                  >
                    <ArrowDownCircleIcon className="h-4 w-4" />
                  </ButtonSecondary>
                  <ButtonSecondary
                    size="sm"
                    onClick={() => {
                      props.onDelete({
                        keyId: apiKey.id,
                        website: props.website,
                      })
                    }}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </ButtonSecondary>
                </div>
              </li>
            ))}
        </ul>
        {props.keys.length < 10 && (
          <div>
            <InputFile onChange={props.onChange} />
            <div className="mt-5 sm:mt-6">
              {canAddKey({
                numberOfKeys: props.keys.length,
                plans: props.plans,
              }) && (
                <ButtonPrimary
                  fullWidth
                  size="md"
                  onClick={() => props.onSubmit(props.website)}
                >
                  {props.fetching && (
                    <ArrowPathIcon className="mr-1 h-4 w-4 animate-spin" />
                  )}
                  <FormattedMessage id="update-sitemap/submit"></FormattedMessage>
                </ButtonPrimary>
              )}

              {!canAddKey({
                numberOfKeys: props.keys.length,
                plans: props.plans,
              }) && (
                <FoudroyerLink
                  to={props.plans.size === 0 ? "/pricing" : "/pricing/upsell"}
                >
                  <ButtonPrimary fullWidth size="md">
                    <FormattedMessage id="update-credentials/subscribe/button"></FormattedMessage>
                  </ButtonPrimary>
                </FoudroyerLink>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const UpdateCredentialsModal = connector(Container)
