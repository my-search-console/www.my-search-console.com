import { Dialog } from "@headlessui/react"
import dayjs from "dayjs"
import React, { ReactNode, useEffect } from "react"
import { ButtonPrimary, ButtonSecondary } from "../../uiii/Button/Button"
import {
  connector,
  ContainerProps,
} from "./containers/LogsCreateModal.containers"

import { PlusCircleIcon } from "@heroicons/react/20/solid"
import { useLocation } from "@reach/router"
import { useForm } from "react-hook-form"
import { useIntl } from "react-intl"
import { ModalKeys } from "../../../entities/ModalEntity"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { Loader } from "../../general/Loader/Loader"
import { Modal } from "../../uiii/Modal/Modal"

const InputGroup: React.FC<{
  label: ReactNode
  children: ReactNode
  name: string
  optional?: boolean
}> = (props) => {
  return (
    <div className="mt-4">
      <label
        htmlFor={props.name}
        className="flex justify-between font-display text-sm"
      >
        <span>{props.label}</span>
        {props.optional && <span className="text-slate-400">Optionnel</span>}
      </label>
      <div className="mt-1">{props.children}</div>
    </div>
  )
}

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const intl = useIntl()
  const { register, handleSubmit, reset, watch, setValue } = useForm()
  const { href } = useLocation()
  const url = new URL(href || "https://www.foudroyer.com")
  const isOpen = url.searchParams.has(ModalKeys["logs-create-modal"])

  useEffect(() => {
    reset()
    setValue("type", url.searchParams.get("type") || "global")
  }, [isOpen])

  const values = watch()

  return (
    <Modal isOpen={isOpen} className="w-full max-w-xl" onClose={props.onClose}>
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
          <PlusCircleIcon
            className="h-6 w-6 text-pink-500"
            aria-hidden="true"
          />
        </div>
        <Dialog.Title
          as="h3"
          className="mt-4 w-full text-center font-display text-base font-semibold leading-6 text-slate-900"
        >
          <FormattedMessage id="logs/modal/title" />
        </Dialog.Title>

        <p className="mt-2 text-sm text-slate-500">
          <FormattedMessage id="logs/modal/description" />
        </p>

        <div className="w-full">
          <form
            onSubmit={handleSubmit((e) => {
              props.onSubmit({
                id: e.id,
                fk_website_id: "",
                title: e.title,
                description: e.description,
                log_date: e.date,
                created_at: new Date(),
                updated_at: new Date(),
                clicks: null,
                impressions: null,
                type: e.type,
                query: e.query,
                page: e.page,
                previous_clicks: null,
                previous_impressions: null,
                position: null,
                previous_position: null,
                synced_at: new Date(),
              })
            })}
          >
            <input
              type="hidden"
              {...register("id")}
              defaultValue={url.searchParams.get("id") || ""}
            />

            <InputGroup
              label={<FormattedMessage id="logs/modal/form/type/label" />}
              name="type"
            >
              <select
                {...register("type")}
                defaultValue={url.searchParams.get("type") || ""}
                required
                className="block h-12 w-full rounded-md border-slate-200 pl-4 text-sm text-slate-900 placeholder-slate-400 focus:border-pink-300 focus:ring-pink-300"
              >
                <option value={"global"}>
                  <FormattedMessage id="logs/modal/form/type/values/global" />
                </option>
                <option value={"query"}>
                  <FormattedMessage id="logs/modal/form/type/values/query" />
                </option>
                <option value={"page"}>
                  <FormattedMessage id="logs/modal/form/type/values/page" />
                </option>
              </select>
            </InputGroup>

            {values.type === "query" && (
              <InputGroup
                label={
                  <FormattedMessage id="logs/modal/form/type/query/label" />
                }
                name="query"
              >
                <input
                  {...register("query")}
                  defaultValue={url.searchParams.get("query") || ""}
                  type="text"
                  autoComplete="off"
                  className="block h-12 w-full rounded-md border-slate-200 pl-4 text-sm text-slate-900 placeholder-slate-400 focus:border-pink-300 focus:ring-pink-300"
                  placeholder={intl.formatMessage({
                    id: "logs/modal/form/type/query/placeholder",
                  })}
                  required
                />
              </InputGroup>
            )}

            {values.type === "page" && (
              <InputGroup
                label={intl.formatMessage({
                  id: "logs/modal/form/type/page/label",
                })}
                name="page"
              >
                <input
                  {...register("page")}
                  type="url"
                  autoComplete="off"
                  defaultValue={url.searchParams.get("page") || ""}
                  className="block h-12 w-full rounded-md border-slate-200 pl-4 text-sm text-slate-900 placeholder-slate-400 focus:border-pink-300 focus:ring-pink-300"
                  placeholder={intl.formatMessage({
                    id: "logs/modal/form/type/page/placeholder",
                  })}
                  required
                />
              </InputGroup>
            )}

            <InputGroup
              label={<FormattedMessage id="logs/modal/form/title/label" />}
              name="title"
            >
              <input
                {...register("title")}
                type="text"
                name="title"
                defaultValue={url.searchParams.get("title") || ""}
                autoComplete="off"
                className="block h-12 w-full rounded-md border-slate-200 pl-4 text-sm text-slate-900 placeholder-slate-400 focus:border-pink-300 focus:ring-pink-300"
                placeholder={intl.formatMessage({
                  id: "logs/modal/form/title/placeholder",
                })}
                required
              />
            </InputGroup>

            <InputGroup
              label={<FormattedMessage id="logs/modal/form/date/label" />}
              name="date"
            >
              <input
                {...register("date")}
                type="date"
                autoComplete="off"
                defaultValue={
                  url.searchParams.get("date") || dayjs().format("YYYY-MM-DD")
                }
                className="block h-12 w-full rounded-md border-slate-200 pl-4 text-sm text-slate-900 placeholder-slate-400 focus:border-pink-300 focus:ring-pink-300"
                required
              />
            </InputGroup>

            <InputGroup
              label={intl.formatMessage({
                id: "logs/modal/form/description/label",
              })}
              name="description"
              optional
            >
              <textarea
                {...register("description")}
                defaultValue={url.searchParams.get("description") || ""}
                autoComplete="off"
                className="block h-48 w-full rounded-md border-slate-200 pl-4 text-sm text-slate-900 placeholder-slate-400 focus:border-pink-300 focus:ring-pink-300"
                placeholder={intl.formatMessage({
                  id: "logs/modal/form/description/placeholder",
                })}
              />
            </InputGroup>

            <div className="mt-6 flex w-full justify-between">
              <ButtonSecondary size="md" onClick={props.onClose}>
                <FormattedMessage id="keywords/add-keyword-modal/cta/cancel" />
              </ButtonSecondary>

              <ButtonPrimary type="submit" size="md">
                <FormattedMessage id="keywords/add-keyword-modal/cta/submit" />
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </div>

      {props.isFetching && <Loader />}
    </Modal>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const LogsCreateModal = connector(Container)
