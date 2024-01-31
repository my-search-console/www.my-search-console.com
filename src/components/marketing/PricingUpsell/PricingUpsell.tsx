import React, { useEffect } from "react"
import { PlusIcon } from "@heroicons/react/20/solid"
import { ButtonPrimary } from "../../UI/Button/Button"
import classNames from "classnames"
import {
  connector,
  ContainerProps,
} from "./containers/PricingUpsell.containers"
import getSymbolFromCurrency from "currency-symbol-map"
import { ITranslations } from "../../../interfaces/ITranslations"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import {
  PaymentPlansEntity,
  PaymentPricesEntity,
} from "@my-search-console/interfaces"
import { Confirm } from "../../general/ConfirmButton/ConfirmButton"

const tiers: Array<{
  name: ITranslations["keys"]
  id: string
  reduction?: string
  priceMonthly: number
  title: ITranslations["keys"]
  description: ITranslations["keys"]
  label: ITranslations["keys"]
  features: Array<ITranslations["keys"]>
  interval: string
  plan: PaymentPlansEntity
}> = [
  {
    interval: "monthly",
    name: "marketing/pricing/premium/label",
    id: "tier-team",
    priceMonthly: 29.99,
    plan: PaymentPlansEntity.indexation,
    reduction: "",
    title: "marketing/pricing/title",
    description: "marketing/pricing/premium/description",
    label: "marketing/pricing/label",
    features: [
      "marketing/pricing/features/unlimited-websites",
      "marketing/pricing/features/400-per-site",
      "marketing/pricing/features/real-time-indexing-report",
      "marketing/pricing/features/all-search-engines",
      "marketing/pricing/features/all-other-tools",
    ],
  },
  {
    interval: "yearly",
    name: "marketing/pricing/premium/label",
    id: "tier-team",
    priceMonthly: 299,
    plan: PaymentPlansEntity.indexation,
    reduction: "",
    title: "marketing/pricing/title",
    description: "marketing/pricing/premium/description",
    label: "marketing/pricing/label",
    features: [
      "marketing/pricing/features/unlimited-websites",
      "marketing/pricing/features/400-per-site",
      "marketing/pricing/features/real-time-indexing-report",
      "marketing/pricing/features/all-search-engines",
      "marketing/pricing/features/all-other-tools",
    ],
  },
  {
    interval: "monthly",
    name: "marketing/pricing/enterprise/label",
    id: "tier-team",
    priceMonthly: 129.99,
    plan: PaymentPlansEntity.enterprise,
    reduction: "",
    title: "marketing/pricing/title",
    description: "marketing/pricing/enterprise/description",
    label: "marketing/pricing/label",
    features: [
      "marketing/pricing/features/unlimited-websites",
      "marketing/pricing/features/2000-per-site",
      "marketing/pricing/features/real-time-indexing-report",
      "marketing/pricing/features/all-search-engines",
      "marketing/pricing/features/all-other-tools",
    ],
  },
  {
    interval: "yearly",
    name: "marketing/pricing/enterprise/label",
    id: "tier-team",
    priceMonthly: 1299,
    plan: PaymentPlansEntity.enterprise,
    reduction: "",
    title: "marketing/pricing/title",
    description: "marketing/pricing/enterprise/description",
    label: "marketing/pricing/label",
    features: [
      "marketing/pricing/features/unlimited-websites",
      "marketing/pricing/features/2000-per-site",
      "marketing/pricing/features/real-time-indexing-report",
      "marketing/pricing/features/all-search-engines",
      "marketing/pricing/features/all-other-tools",
    ],
  },
]

type Props = {
  onSubscribe: (params: {
    plan: PaymentPlansEntity
    interval: "monthly" | "yearly"
  }) => void
  onLoadAdjustedPricing: () => void
  authenticated: boolean
  plans: Set<any>
  interval: "monthly" | "yearly"
  products: PaymentPricesEntity
}

export const Wrapper: React.FC<Props> = (props) => {
  if (
    !props.authenticated ||
    props.plans.has(PaymentPlansEntity.enterprise) ||
    props.plans.size === 0
  )
    return <></>

  if (props.interval === "yearly")
    tiers.map((tier, tierIndex) => {
      if (tier.interval === "monthly") {
        tiers.splice(tierIndex, 1)
      }
    })

  if (props.interval === "monthly")
    tiers.map((tier, tierIndex) => {
      if (tier.interval === "yearly") {
        tiers.splice(tierIndex, 1)
      }
    })

  if (props.plans.has(PaymentPlansEntity.indexation))
    tiers.map((tier, tierIndex) => {
      if (tier.plan === PaymentPlansEntity.indexation) {
        tiers.splice(tierIndex, 1)
      }
    })

  useEffect(() => {
    props.onLoadAdjustedPricing()
  }, [])

  return (
    <div className="isolate overflow-x-hidden">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 pb-96 pt-24 text-center lg:px-8">
        <div className="mx-auto max-w-4xl">
          <a
            href="#"
            className="font-display text-base font-semibold text-blue-400"
          >
            <FormattedMessage id={"marketing/pricing-upsell/label"} />
          </a>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            <FormattedMessage id={"marketing/pricing-upsell/title"} />
          </h1>
        </div>
        <div className="relative mt-4">
          <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-700">
            <FormattedMessage id={`marketing/pricing-upsell/description`} />
          </p>

          {tiers[0].reduction && tiers[0].reduction !== "" && (
            <span className="mt-2 inline-block max-w-2xl rounded-md font-display text-blue-500">
              <FormattedMessage id="pricing/offer" />
            </span>
          )}

          <svg
            viewBox="0 0 1208 1024"
            className="lg:-top-50 absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 xl:top-0"
          >
            <ellipse
              cx={604}
              cy={512}
              fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)"
              rx={604}
              ry={512}
            />
            <defs>
              <radialGradient id="6d1bd035-0dd1-437e-93fa-59d316231eb0">
                <stop stopColor="#f472b6" />
                <stop offset={1} stopColor="#fbcfe8" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="flow-root bg-white pb-24 sm:pb-32">
        <div className="-mt-80">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div
              className={classNames(
                "mx-auto grid max-w-md grid-cols-1 gap-8 md:max-w-4xl",
                `md:grid-cols-${tiers.length}`
              )}
            >
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={
                    "mx-auto flex max-w-lg flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-slate-200 sm:p-10"
                  }
                >
                  <div>
                    <h2
                      id={tier.id}
                      className="font-display text-base font-semibold leading-7 text-blue-400"
                    >
                      <FormattedMessage id={tier.name} />
                    </h2>
                    <div className="flex items-baseline gap-x-2">
                      {tier.reduction && (
                        <span className="font-display text-3xl font-bold tracking-tight text-slate-900">
                          {tier.reduction}
                        </span>
                      )}
                      <span
                        className={classNames(
                          "font-display text-3xl font-bold tracking-tight ",
                          tier.reduction &&
                            "text-base font-semibold text-slate-400 line-through"
                        )}
                      >
                        {props.products[tier.plan][props.interval] || 0}
                        {getSymbolFromCurrency(props.products.currency)}
                      </span>
                      {props.interval === "monthly" && (
                        <span className="font-display text-base font-semibold leading-7 text-slate-400">
                          <FormattedMessage id="marketing/pricing/premium/month" />
                        </span>
                      )}
                      {props.interval === "yearly" && (
                        <span className="font-display text-base font-semibold leading-7 text-slate-400">
                          <FormattedMessage id="marketing/pricing/premium/year" />
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-slate-700">
                      <FormattedMessage id={tier.description} />
                    </p>
                    <ul
                      role="list"
                      className="mt-6 space-y-4 text-sm leading-6 "
                    >
                      {tier.features.map((feature, featureIndex) => (
                        <div>
                          {featureIndex === 2 && (
                            <hr className="mb-4 border-dotted border-slate-300" />
                          )}
                          <li
                            key={feature}
                            className="flex gap-x-3 font-display"
                          >
                            <PlusIcon
                              className="h-6 w-5 flex-none text-blue-400"
                              aria-hidden="true"
                            />

                            <FormattedMessage id={feature} />
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8">
                    <>
                      <Confirm
                        onConfirm={() =>
                          props.onSubscribe({
                            plan: tier.plan,
                            interval: props.interval,
                          })
                        }
                      >
                        {(isConfirmed) => (
                          <ButtonPrimary fullWidth size="md">
                            {!isConfirmed && (
                              <div className="inline-flex h-10 w-full items-center justify-center rounded-md bg-slate-900 px-4 font-display text-sm font-semibold text-white transition duration-300 ease-in-out hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-300">
                                <FormattedMessage
                                  id={"marketing/pricing/premium/cta"}
                                />

                                <svg
                                  width="256px"
                                  height="302px"
                                  viewBox="0 0 256 302"
                                  version="1.1"
                                  preserveAspectRatio="xMidYMid"
                                  className="ml-2 w-4"
                                >
                                  <g>
                                    <path
                                      d="M217.168476,23.5070146 C203.234077,7.62479651 178.045612,0.815753338 145.823355,0.815753338 L52.3030619,0.815753338 C45.7104431,0.815753338 40.1083819,5.6103852 39.0762042,12.1114399 L0.136468302,259.076601 C-0.637664968,263.946149 3.13311322,268.357876 8.06925331,268.357876 L65.804612,268.357876 L80.3050438,176.385849 L79.8555471,179.265958 C80.8877248,172.764903 86.4481659,167.970272 93.0324607,167.970272 L120.46841,167.970272 C174.366398,167.970272 216.569147,146.078116 228.897012,82.7490197 C229.263268,80.8761167 229.579581,79.0531577 229.854273,77.2718188 C228.297683,76.4477414 228.297683,76.4477414 229.854273,77.2718188 C233.525163,53.8646924 229.829301,37.9325302 217.168476,23.5070146"
                                      fill="#27346A"
                                    ></path>
                                    <path
                                      d="M102.396976,68.8395929 C103.936919,68.1070797 105.651665,67.699203 107.449652,67.699203 L180.767565,67.699203 C189.449511,67.699203 197.548776,68.265236 204.948824,69.4555699 C207.071448,69.7968545 209.127479,70.1880831 211.125242,70.6375799 C213.123006,71.0787526 215.062501,71.5781934 216.943728,72.1275783 C217.884341,72.4022708 218.808307,72.6852872 219.715624,72.9849517 C223.353218,74.2002577 226.741092,75.61534 229.854273,77.2718188 C233.525163,53.8563683 229.829301,37.9325302 217.168476,23.5070146 C203.225753,7.62479651 178.045612,0.815753338 145.823355,0.815753338 L52.2947379,0.815753338 C45.7104431,0.815753338 40.1083819,5.6103852 39.0762042,12.1114399 L0.136468302,259.068277 C-0.637664968,263.946149 3.13311322,268.349552 8.0609293,268.349552 L65.804612,268.349552 L95.8875974,77.5798073 C96.5035744,73.6675208 99.0174265,70.4627756 102.396976,68.8395929 Z"
                                      fill="#27346A"
                                    ></path>
                                    <path
                                      d="M228.897012,82.7490197 C216.569147,146.069792 174.366398,167.970272 120.46841,167.970272 L93.0241367,167.970272 C86.4398419,167.970272 80.8794007,172.764903 79.8555471,179.265958 L61.8174095,293.621258 C61.1431644,297.883153 64.4394738,301.745495 68.7513129,301.745495 L117.421821,301.745495 C123.182038,301.745495 128.084882,297.550192 128.983876,291.864891 L129.458344,289.384335 L138.631407,231.249423 L139.222412,228.036354 C140.121406,222.351053 145.02425,218.15575 150.784467,218.15575 L158.067979,218.15575 C205.215193,218.15575 242.132193,199.002194 252.920115,143.605884 C257.423406,120.456802 255.092683,101.128442 243.181019,87.5519756 C239.568397,83.4399129 235.081754,80.0437153 229.854273,77.2718188 C229.571257,79.0614817 229.263268,80.8761167 228.897012,82.7490197 L228.897012,82.7490197 Z"
                                      fill="#2790C3"
                                    ></path>
                                    <path
                                      d="M216.952052,72.1275783 C215.070825,71.5781934 213.13133,71.0787526 211.133566,70.6375799 C209.135803,70.1964071 207.071448,69.8051785 204.957148,69.4638939 C197.548776,68.265236 189.457835,67.699203 180.767565,67.699203 L107.457976,67.699203 C105.651665,67.699203 103.936919,68.1070797 102.4053,68.8479169 C99.0174265,70.4710996 96.5118984,73.6675208 95.8959214,77.5881313 L80.3133678,176.385849 L79.8638711,179.265958 C80.8877248,172.764903 86.4481659,167.970272 93.0324607,167.970272 L120.476734,167.970272 C174.374722,167.970272 216.577471,146.078116 228.905336,82.7490197 C229.271592,80.8761167 229.579581,79.0614817 229.862597,77.2718188 C226.741092,75.623664 223.361542,74.2002577 219.723948,72.9932757 C218.816631,72.6936112 217.892665,72.4022708 216.952052,72.1275783"
                                      fill="#1F264F"
                                    ></path>
                                  </g>
                                </svg>
                              </div>
                            )}
                            {isConfirmed && (
                              <FormattedMessage id="update-credentials/subscribe/button/confirm"></FormattedMessage>
                            )}
                          </ButtonPrimary>
                        )}
                      </Confirm>
                    </>

                    <div
                      className={classNames(
                        "mt-1 text-center font-display text-sm text-slate-400"
                      )}
                    >
                      <FormattedMessage id="marketing/pricing/cancelable" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Connected: React.FC<ContainerProps> = (props) => <Wrapper {...props} />
export const PricingUpsell = connector(Connected)
