import React, { ReactNode, useEffect, useState } from "react"

import { PaymentEntity } from "@foudroyer/interfaces"
import { Dialog, RadioGroup } from "@headlessui/react"
import {
  ArrowPathIcon,
  CircleStackIcon,
  CurrencyDollarIcon,
  HandRaisedIcon,
  PauseIcon,
} from "@heroicons/react/20/solid"
import { useLocation } from "@reach/router"
import classNames from "classnames"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { ButtonPrimary, ButtonSecondary } from "../../uiii/Button/Button"
import { Modal } from "../../uiii/Modal/Modal"
import {
  connector,
  ContainerProps,
} from "./containers/UnsubscribeModal.containers"

type Props = {
  payments: PaymentEntity[]
  onClose: () => void
  onUnsubscribe: (params: { why: string }) => void
  onPause: (params: { why: string }) => void
  onResume: () => void
}

const Item: React.FC<{
  icon: (...props: any) => any
  title: ReactNode
  description: ReactNode
  showArrow?: boolean
}> = (props) => {
  const Icon = props.icon

  return (
    <div className="relative col-span-4">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-500">
        <Icon className="inline-block h-5 w-5" />
      </div>
      <div className="mt-2 font-display text-sm font-medium">{props.title}</div>
      <div className="text-slate-500">{props.description}</div>
    </div>
  )
}

const settings = [
  {
    id: "not-need",
  },
  {
    id: "too-expensive",
  },
  {
    id: "bugs",
  },
  {
    id: "not-indexing",
  },
  {
    id: "other",
  },
]

const Radio: React.FC<{ onChange: (value: string) => void }> = (props) => {
  const [selected, setSelected] = useState(settings[0])

  return (
    <RadioGroup
      value={selected}
      onChange={(e) => {
        setSelected(e)
        props.onChange(e.id)
      }}
    >
      <RadioGroup.Label className="sr-only">Privacy setting</RadioGroup.Label>
      <div className="-space-y-px rounded-md bg-white">
        {settings.map((setting, settingIdx) => (
          <RadioGroup.Option
            key={setting.id}
            value={setting}
            className={({ checked }) =>
              classNames(
                settingIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                settingIdx === settings.length - 1
                  ? "rounded-bl-md rounded-br-md"
                  : "",
                checked
                  ? "z-10 border-pink-200 bg-pink-50"
                  : "border-slate-200",
                "relative flex cursor-pointer border p-4 focus:outline-none"
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={classNames(
                    checked
                      ? "border-transparent bg-pink-500"
                      : "border-slate-300 bg-white",
                    active ? "ring-2 ring-pink-500 ring-offset-2" : "",
                    "mt-0.5 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border"
                  )}
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <span className="ml-3 flex flex-col">
                  <RadioGroup.Label
                    as="span"
                    className={classNames(
                      checked ? "text-pink-500" : "text-slate-900",
                      "block font-display text-sm"
                    )}
                  >
                    <FormattedMessage
                      // @ts-ignore
                      id={`modal/unsubscribe/form/why/${setting.id}`}
                    />
                  </RadioGroup.Label>
                </span>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}

export const Wrapper: React.FC<Props> = (props) => {
  const location = useLocation()
  const [isUnsubscribing, setIsUnsubscribing] = useState(false)
  const [isPausing, setIsPausing] = useState(false)
  const [why, setWhy] = useState<string>(settings[0].id)
  const isOpen = Boolean(location?.href?.includes("unsubscribe=true"))
  const payment = props.payments[0] || null

  useEffect(() => {
    if (isOpen === true) {
      setIsPausing(false)
      setIsUnsubscribing(false)
    }
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClose={props.onClose}
      className="w-full max-w-4xl"
      leavePaddingTop
    >
      {!payment?.paused_at && !isUnsubscribing && !isPausing && (
        <div>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
            <CurrencyDollarIcon
              className="h-6 w-6 text-pink-500"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <Dialog.Title
              as="h3"
              className="font-display text-base font-semibold leading-6 text-slate-900"
            >
              <FormattedMessage id="modal/unsubscribe/title" />
            </Dialog.Title>
            <div className="">
              <p className="text-sm text-slate-500">
                <FormattedMessage id="modal/unsubscribe/description" />
              </p>
            </div>
          </div>

          <div className="mt-8 grid-cols-12 gap-4 text-center text-sm md:grid">
            <Item
              icon={PauseIcon}
              showArrow
              title={<FormattedMessage id="modal/unsubscribe/steps/1/title" />}
              description={
                <FormattedMessage id="modal/unsubscribe/steps/1/description" />
              }
            />

            <Item
              showArrow
              icon={CircleStackIcon}
              title={<FormattedMessage id="modal/unsubscribe/steps/2/title" />}
              description={
                <FormattedMessage id="modal/unsubscribe/steps/2/description" />
              }
            />

            <Item
              icon={ArrowPathIcon}
              title={<FormattedMessage id="modal/unsubscribe/steps/3/title" />}
              description={
                <FormattedMessage id="modal/unsubscribe/steps/3/description" />
              }
            />
          </div>

          <div className="mt-16 grid-cols-2 items-center justify-center gap-2 space-y-2 md:grid md:space-y-0">
            <ButtonSecondary fullWidth onClick={() => setIsUnsubscribing(true)}>
              <FormattedMessage id="modal/unsubscribe/buttons/unsubscribe" />
            </ButtonSecondary>

            <ButtonPrimary fullWidth onClick={() => setIsPausing(true)}>
              <FormattedMessage id="modal/unsubscribe/buttons/pause" />
            </ButtonPrimary>
          </div>
        </div>
      )}

      {/* Sondage de désinscription */}
      {!payment?.paused_at && isUnsubscribing && (
        <div>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <HandRaisedIcon
              className="h-6 w-6 text-red-500"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <Dialog.Title
              as="h3"
              className="font-display text-base font-semibold leading-6 text-slate-900"
            >
              <FormattedMessage id="modal/unsubscribe/form/title" />
            </Dialog.Title>
            <div className="">
              <p className="text-sm text-slate-500">
                <FormattedMessage id="modal/unsubscribe/form/description" />
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Radio onChange={(value: string) => setWhy(value)} />
          </div>

          <div className="mt-16 items-center justify-center gap-2 space-y-2 md:flex md:space-y-0">
            <ButtonSecondary
              fullWidth
              onClick={() => setIsUnsubscribing(false)}
            >
              <FormattedMessage id="tools/back" />
            </ButtonSecondary>
            <a
              href={payment?.cancel_url}
              className="inline-block w-full"
              target="_blank"
              onClick={() => props.onUnsubscribe({ why })}
            >
              <ButtonPrimary fullWidth>
                <FormattedMessage id="modal/unsubscribe/buttons/unsubscribe" />
              </ButtonPrimary>
            </a>
          </div>
        </div>
      )}

      {/* Sondage de mise en pause */}
      {!payment?.paused_at && isPausing && (
        <div>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <PauseIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <Dialog.Title
              as="h3"
              className="font-display text-base font-semibold leading-6 text-slate-900"
            >
              <FormattedMessage id="modal/pause/form/title" />
            </Dialog.Title>
            <div className="">
              <p className="text-sm text-slate-500">
                <FormattedMessage id="modal/pause/form/description" />
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Radio onChange={(value: string) => setWhy(value)} />
          </div>

          <div className="mt-16 grid-cols-1 items-center justify-center gap-2 space-y-2 md:grid md:grid-cols-2 md:space-y-0">
            <ButtonSecondary fullWidth onClick={() => setIsPausing(false)}>
              <FormattedMessage id="tools/back" />
            </ButtonSecondary>

            <ButtonPrimary fullWidth onClick={() => props.onPause({ why })}>
              <FormattedMessage id="modal/unsubscribe/buttons/pause" />
            </ButtonPrimary>
          </div>
        </div>
      )}

      {/* Déjà en pause */}
      {payment?.paused_at && (
        <div className="max-w-2xl">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
            <CurrencyDollarIcon
              className="h-6 w-6 text-pink-500"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <Dialog.Title
              as="h3"
              className="font-display text-base font-semibold leading-6 text-slate-900"
            >
              <FormattedMessage id="modal/resume/title" />
            </Dialog.Title>
            <div className="">
              <p className="text-sm text-slate-500">
                <FormattedMessage id="modal/resume/description" />
              </p>
            </div>
          </div>

          <div className="mt-8">
            <ButtonPrimary fullWidth onClick={props.onResume}>
              <FormattedMessage id="modal/resume/button" />
            </ButtonPrimary>
          </div>
        </div>
      )}
    </Modal>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const UnsubscribeModal = connector(Container)
