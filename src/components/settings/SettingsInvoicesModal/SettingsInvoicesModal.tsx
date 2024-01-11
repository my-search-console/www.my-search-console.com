import React, { useEffect } from "react"
import {
  connector,
  ContainerProps,
} from "./containers/SettingsInvoicesModal.containers"
import { Modal } from "../../UI/Modal/Modal"
import { DocumentChartBarIcon } from "@heroicons/react/24/outline"
import { Dialog } from "@headlessui/react"
import { ButtonPrimary, ButtonSecondary } from "../../UI/Button/Button"
import { Loader } from "../../general/Loader/Loader"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"

type Props = {
  isOpen: boolean
  isFetching: boolean
  invoices: {
    id: string
    date: string
    amount: number
    currency: string
    status: string
    invoice_url: string | undefined
  }[]
  onOpenModal: () => void
  onCloseModal: () => void
  onFetchInvoices: () => void
}

export const Wrapper: React.FC<Props> = (props) => {
  useEffect(() => {
    props.onFetchInvoices()
  }, [])
  return (
    <Modal isOpen={props.isOpen} onClose={props.onCloseModal} leavePaddingTop>
      {props.isFetching && <Loader></Loader>}
      {!props.isFetching && (
        <div className="isolate overflow-x-hidden">
          <div className="relative max-w-xl overflow-hidden px-2 pb-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <DocumentChartBarIcon
                className="h-6 w-6 text-slate-500"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 sm:mt-5">
              <Dialog.Title
                as="h3"
                className="text-center font-display text-base font-semibold leading-6 text-slate-900"
              >
                <FormattedMessage id="settings/invoices/modal/title" />
              </Dialog.Title>
              <div className="mt-2">
                <p className="mb-6 text-justify text-sm text-slate-500">
                  <FormattedMessage id="settings/invoices/modal/description" />
                </p>
              </div>
              {props.invoices.map((invoice, invoiceId) => (
                <div
                  key={invoiceId}
                  className="mb-4 flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <p className="font-display text-sm font-semibold text-slate-900">
                      Invoice #{invoice.id}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(invoice.date).toLocaleDateString()} -{" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: invoice.currency,
                      }).format(invoice.amount)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {invoice.status === "paid" && (
                      <a href={invoice.invoice_url} target="_blank">
                        <ButtonPrimary size="sm">
                          <FormattedMessage id="settings/invoices/modal/view-invoice" />
                        </ButtonPrimary>
                      </a>
                    )}
                    {invoice.status === "pending" && (
                      <p className="mr-4 font-display text-sm font-semibold text-slate-500">
                        <FormattedMessage id="settings/invoices/modal/coming-next" />
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="block h-4"></div>
            <ButtonSecondary fullWidth onClick={props.onCloseModal}>
              <FormattedMessage id="settings/invoices/modal/close" />
            </ButtonSecondary>
          </div>
        </div>
      )}
    </Modal>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const SettingsInvoicesModal = connector(Container)
