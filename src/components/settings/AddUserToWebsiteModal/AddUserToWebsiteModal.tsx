import { PaymentPlansEntity } from "@foudroyer/interfaces"
import { UserGroupIcon } from "@heroicons/react/20/solid"
import { useLocation } from "@reach/router"
import React from "react"
import { ModalKeys } from "../../../entities/ModalEntity"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { FoudroyerLink } from "../../general/FoudroyerLink/FoudroyerLink"
import { ButtonSecondary } from "../../UI/Button/Button"
import { Modal } from "../../UI/Modal/Modal"
import { AddUserToWebsite } from "../AddUserToWebsite/AddUserToWebsite"
import {
  connector,
  ContainerProps,
} from "./containers/AddUserToWebsiteModal.container"

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const { hash } = useLocation()

  return (
    <Modal
      isOpen={hash.includes(ModalKeys["add-user-to-website-modal"])}
      onClose={props.onClose}
    >
      <div className="relative max-w-3xl">
        <div>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
            <UserGroupIcon
              className="h-6 w-6 text-pink-500"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <div className="font-display text-base font-semibold leading-6 text-slate-900">
              <FormattedMessage id="settings/add-user/title" />
            </div>
            <div className="mt-2 text-left">
              <p className="text-sm text-slate-500">
                <FormattedMessage id="settings/add-user/description" />
              </p>
            </div>
          </div>
        </div>

        {props.plan?.plan !== PaymentPlansEntity["indexation/teams"] &&
          props.plan?.plan !== PaymentPlansEntity["enterprise"] && (
            <div className="mt-4 rounded-md border border-amber-200 font-display bg-amber-50 p-4 text-sm text-amber-700">
              <FormattedMessage
                id="add-users-modal/pricing"
                values={{
                  a: (props) => (
                    <FoudroyerLink to="/pricing" className="underline">
                      {props}
                    </FoudroyerLink>
                  ),
                }}
              />
            </div>
          )}

        <AddUserToWebsite />

        <div className="mt-6 flex w-full justify-between">
          <ButtonSecondary fullWidth size="md" onClick={props.onClose}>
            <FormattedMessage id="keywords/add-keyword-modal/cta/cancel" />
          </ButtonSecondary>
        </div>
      </div>
    </Modal>
  )
}

export const AddUserToWebsiteModal = connector(Wrapper)
