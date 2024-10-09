import { CheckIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"
import React, { useEffect, useState } from "react"
import { ButtonSecondary } from "../../uiii/Button/Button"
import { connector, ContainerProps } from "./containers/Pricing.containers"

import {
  findPlanByNameAndInterval,
  PaymentPlansEntity,
  PaymentPricesEntity,
} from "@foudroyer/interfaces"
import { useLocation } from "@reach/router"
import clsx from "clsx"
import getSymbolFromCurrency from "currency-symbol-map"
import { ITranslations } from "../../../interfaces/ITranslations"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { PricingSwitchBillingInterval } from "./components/PricingSwitchBillingInterval"

type Tier = {
  name: ITranslations["keys"]
  id: string
  plan: PaymentPlansEntity
  reduction?: number | null
  priceMonthly: number
  label: ITranslations["keys"]
  features: Array<ITranslations["keys"]>
  featuresComingSoon: Array<ITranslations["keys"]>
  highlight?: boolean
}

const paymentTiers: Array<Tier> = [
  {
    name: "marketing/pricing/newbie/label",
    id: "newbie",
    priceMonthly: 9.99,
    plan: PaymentPlansEntity.newbie,
    reduction: 1,
    label: "marketing/pricing/label",
    features: [
      "marketing/pricing/features/1-website",
      "marketing/pricing/features/200-per-site",
      "marketing/pricing/features/indexing-auto",
      "marketing/pricing/features/analytics",
      "marketing/pricing/features/keywords",
      "marketing/pricing/features/opportunities",
      "marketing/pricing/features/logs",
      "marketing/pricing/features/leaderboard",
    ],
    featuresComingSoon: [],
    highlight: false,
  },
  {
    name: "marketing/pricing/premium/label",
    id: "tier-team",
    priceMonthly: 29.99,
    plan: PaymentPlansEntity.indexation,
    reduction: 1,
    label: "marketing/pricing/label",
    features: [
      "marketing/pricing/features/10-website",
      "marketing/pricing/features/400-per-site",
      "marketing/pricing/features/indexing-auto",
      "marketing/pricing/features/analytics",
      "marketing/pricing/features/keywords",
      "marketing/pricing/features/opportunities",
      "marketing/pricing/features/logs",
      "marketing/pricing/features/leaderboard",
    ],
    featuresComingSoon: [],
    highlight: false,
  },
  {
    name: "marketing/pricing/teams/label",
    id: "tier-team",
    priceMonthly: 49.99,
    plan: PaymentPlansEntity["indexation/teams"],
    reduction: 1,
    label: "marketing/pricing/label",
    features: [
      "marketing/pricing/features/20-website",
      "marketing/pricing/features/800-per-site",
      "marketing/pricing/features/indexing-auto",
      "marketing/pricing/features/analytics",
      "marketing/pricing/features/keywords",
      "marketing/pricing/features/opportunities",
      "marketing/pricing/features/logs",
      "marketing/pricing/features/leaderboard",
      "marketing/pricing/features/multiple-search-console",
    ],
    featuresComingSoon: [],
    highlight: true,
  },
  {
    name: "marketing/pricing/enterprise/label",
    id: "enterprise",
    plan: PaymentPlansEntity.enterprise,
    priceMonthly: 129.99,
    reduction: 1,
    label: "marketing/pricing/label",
    highlight: false,
    features: [
      "marketing/pricing/features/100-website",
      "marketing/pricing/features/2000-per-site",
      "marketing/pricing/features/indexing-auto",
      "marketing/pricing/features/analytics",
      "marketing/pricing/features/keywords",
      "marketing/pricing/features/opportunities",
      "marketing/pricing/features/logs",
      "marketing/pricing/features/leaderboard",
      "marketing/pricing/features/multiple-search-console",
    ],
    featuresComingSoon: [],
  },
]

const freeTier: Tier = {
  name: "marketing/pricing/free/label",
  id: "tier-hobby",
  priceMonthly: 9.99,
  plan: PaymentPlansEntity["indexation/free"],
  label: "marketing/pricing/label",
  features: [
    "marketing/pricing/features/1-website",
    "marketing/pricing/features/just-10",
    "marketing/pricing/features/manual-indexing",
  ],
  featuresComingSoon: [],
}

type Props = {
  onTry: () => void
  onSubscribe: (
    plan: PaymentPlansEntity,
    interval: "monthly" | "yearly"
  ) => void
  onSupport: () => void
  onLoadAdjustedPricing: () => void
  className?: string
  source: "indexation/quota" | "indexation/report" | string | null
  type: PaymentPlansEntity
  products: PaymentPricesEntity
} & ContainerProps

const roundDecimal = (num) => {
  return Math.round(num * 100) / 100
}

const PaymentsMethods = () => (
  <div className="mt-4 flex w-full items-center justify-center">
    <div>
      <div
        className={classNames("mt-4 text-center font-display text-slate-400")}
      >
        <FormattedMessage id="marketing/pricing/cancelable" />
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <svg
          width="34"
          height="24"
          viewBox="0 0 34 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.7503 15.8583H8.69051L7.14596 9.79238C7.07265 9.51335 6.91699 9.26667 6.68802 9.15041C6.11659 8.85824 5.48692 8.62571 4.8 8.50844V8.2749H8.11808C8.57603 8.2749 8.91948 8.62571 8.97673 9.03314L9.77813 13.4087L11.8369 8.2749H13.8394L10.7503 15.8583ZM14.9842 15.8583H13.039L14.6408 8.2749H16.586L14.9842 15.8583ZM19.1027 10.3757C19.1599 9.96728 19.5034 9.73375 19.9041 9.73375C20.5338 9.67511 21.2197 9.79238 21.7921 10.0835L22.1356 8.45082C21.5631 8.21728 20.9335 8.10001 20.362 8.10001C18.474 8.10001 17.1002 9.15041 17.1002 10.6082C17.1002 11.7173 18.0733 12.2996 18.7603 12.6504C19.5034 13.0002 19.7896 13.2338 19.7324 13.5836C19.7324 14.1083 19.1599 14.3418 18.5885 14.3418C17.9016 14.3418 17.2147 14.1669 16.586 13.8747L16.2426 15.5085C16.9295 15.7996 17.6726 15.9169 18.3596 15.9169C20.4765 15.9745 21.7921 14.9251 21.7921 13.35C21.7921 11.3665 19.1027 11.2502 19.1027 10.3757ZM28.6 15.8583L27.0554 8.2749H25.3964C25.0529 8.2749 24.7095 8.50844 24.595 8.85824L21.7349 15.8583H23.7374L24.1371 14.7502H26.5975L26.8265 15.8583H28.6ZM25.6826 10.3171L26.254 13.1751H24.6523L25.6826 10.3171Z"
            fill="#172B85"
          />
          <rect
            x="0.5"
            y="0.5"
            width="33"
            height="23"
            rx="3.5"
            stroke="#E2E8F0"
          />
        </svg>
        <svg
          width="34"
          height="24"
          viewBox="0 0 34 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.179 16.8294C15.9949 17.8275 14.459 18.43 12.7807 18.43C9.03582 18.43 6 15.4303 6 11.73C6 8.02966 9.03582 5.02997 12.7807 5.02997C14.459 5.02997 15.9949 5.63247 17.179 6.63051C18.363 5.63247 19.8989 5.02997 21.5773 5.02997C25.3221 5.02997 28.358 8.02966 28.358 11.73C28.358 15.4303 25.3221 18.43 21.5773 18.43C19.8989 18.43 18.363 17.8275 17.179 16.8294Z"
            fill="#ED0006"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.179 16.8294C18.6369 15.6005 19.5614 13.7719 19.5614 11.73C19.5614 9.68801 18.6369 7.85941 17.179 6.63051C18.363 5.63247 19.8989 5.02997 21.5773 5.02997C25.3221 5.02997 28.3579 8.02966 28.3579 11.73C28.3579 15.4303 25.3221 18.43 21.5773 18.43C19.8989 18.43 18.363 17.8275 17.179 16.8294Z"
            fill="#F9A000"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.179 16.8294C18.6369 15.6005 19.5614 13.7719 19.5614 11.73C19.5614 9.68805 18.6369 7.85946 17.179 6.63055C15.7211 7.85946 14.7966 9.68805 14.7966 11.73C14.7966 13.7719 15.7211 15.6005 17.179 16.8294Z"
            fill="#FF5E00"
          />
          <rect
            x="0.5"
            y="0.5"
            width="33"
            height="23"
            rx="3.5"
            stroke="#E2E8F0"
          />
        </svg>
        <svg
          width="34"
          height="24"
          viewBox="0 0 34 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.6142 18.4483L14.8349 16.9992L14.3432 16.9873H11.9953L13.627 6.29368C13.6321 6.2613 13.6485 6.23124 13.6725 6.20986C13.6967 6.18847 13.7274 6.17674 13.7596 6.17674H17.7185C19.033 6.17674 19.94 6.45938 20.4135 7.01732C20.6355 7.27906 20.7769 7.55265 20.8453 7.85362C20.9171 8.16949 20.9183 8.54683 20.8483 9.00714L20.8432 9.04062V9.3356L21.0652 9.46561C21.2521 9.56813 21.4008 9.68544 21.5147 9.81973C21.7046 10.0436 21.8274 10.3281 21.8793 10.6652C21.933 11.012 21.9153 11.4248 21.8274 11.892C21.7261 12.4294 21.5624 12.8976 21.3412 13.2805C21.1378 13.6334 20.8787 13.9262 20.5709 14.153C20.2772 14.3686 19.9282 14.5322 19.5335 14.6369C19.1511 14.7398 18.7151 14.7917 18.2368 14.7917H17.9287C17.7085 14.7917 17.4945 14.8737 17.3265 15.0207C17.158 15.1708 17.0467 15.3758 17.0125 15.6L16.9892 15.7305L16.5992 18.2848L16.5816 18.3785C16.5768 18.4082 16.5688 18.423 16.557 18.433C16.5465 18.4422 16.5313 18.4483 16.5166 18.4483H14.6142Z"
            fill="#28356A"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.2756 9.07468C21.2639 9.15276 21.2503 9.23255 21.2352 9.31454C20.7131 12.0852 18.9269 13.0423 16.6456 13.0423H15.4841C15.2051 13.0423 14.9699 13.2517 14.9265 13.5361L14.1634 18.5394C14.1351 18.7262 14.2744 18.8945 14.4567 18.8945H16.5169C16.7608 18.8945 16.968 18.7113 17.0064 18.4626L17.0267 18.3545L17.4146 15.8103L17.4395 15.6707C17.4774 15.4212 17.6852 15.2379 17.9291 15.2379H18.2372C20.2331 15.2379 21.7957 14.4004 22.2524 11.9766C22.4431 10.9641 22.3444 10.1186 21.8396 9.52399C21.6868 9.34473 21.4973 9.19589 21.2756 9.07468Z"
            fill="#298FC2"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.7293 8.84963C20.6495 8.82556 20.5672 8.80381 20.4828 8.78413C20.3979 8.76495 20.311 8.74797 20.2215 8.73306C19.9083 8.68076 19.5651 8.65595 19.1975 8.65595H16.0945C16.018 8.65595 15.9454 8.67379 15.8805 8.70605C15.7373 8.77717 15.6311 8.9172 15.6053 9.08864L14.9451 13.4102L14.9262 13.5362C14.9696 13.2517 15.2047 13.0424 15.4838 13.0424H16.6453C18.9266 13.0424 20.7128 12.0847 21.2349 9.31458C21.2505 9.23259 21.2636 9.1528 21.2753 9.07471C21.1433 9.00225 21.0002 8.9403 20.8462 8.88751C20.8081 8.87444 20.7689 8.86185 20.7293 8.84963Z"
            fill="#22284F"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.6055 9.08865C15.6312 8.91721 15.7375 8.77718 15.8807 8.70655C15.9461 8.67417 16.0182 8.65633 16.0947 8.65633H19.1977C19.5653 8.65633 19.9085 8.68126 20.2217 8.73356C20.3111 8.74834 20.398 8.76545 20.4829 8.78463C20.5673 8.80418 20.6496 8.82606 20.7294 8.85001C20.769 8.86223 20.8083 8.87493 20.8467 8.88752C21.0008 8.94031 21.1439 9.00275 21.276 9.07472C21.4313 8.05085 21.2747 7.35373 20.7391 6.72248C20.1486 6.02743 19.0829 5.73001 17.7192 5.73001H13.7601C13.4816 5.73001 13.2439 5.93933 13.2009 6.22429L11.5519 17.0279C11.5194 17.2416 11.6789 17.4344 11.8874 17.4344H14.3316L15.6055 9.08865Z"
            fill="#28356A"
          />
          <rect
            x="0.5"
            y="0.5"
            width="33"
            height="23"
            rx="3.5"
            stroke="#E2E8F0"
          />
        </svg>
        <svg
          width="34"
          height="24"
          viewBox="0 0 34 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" fill="white" />
          <path
            d="M8.8796 8.79828H4.12156C3.50193 8.79828 3 9.30483 3 9.9291V14.7275C3 15.3517 3.50193 15.8583 4.12156 15.8583H8.8796C9.49923 15.8583 10.0005 15.3517 10.0005 14.7275V9.9291C10.0012 9.30417 9.49923 8.79828 8.8796 8.79828Z"
            fill="#1677FF"
          />
          <path
            d="M8.76385 13.2316C8.48412 13.137 8.10785 12.9922 7.68924 12.8395C7.94054 12.3984 8.14157 11.8965 8.27383 11.3509H6.8937V10.8496H8.58398V10.5699H6.8937V9.73401H6.20397C6.08295 9.73401 6.08295 9.85437 6.08295 9.85437V10.5692H4.3735V10.849H6.08295V11.3502H4.67108V11.6299H7.40885C7.309 11.9778 7.17409 12.3051 7.01472 12.6021C6.1266 12.3065 5.1783 12.0671 4.58313 12.2145C4.20222 12.3091 3.95688 12.4777 3.81272 12.655C3.15142 13.4664 3.62557 14.699 5.02223 14.699C5.84819 14.699 6.64373 14.2348 7.26006 13.4697C8.17993 13.9154 10.0005 14.6812 10.0005 14.6812V13.59C10.0011 13.59 9.77233 13.5715 8.76385 13.2316ZM4.89196 14.2275C3.8028 14.2275 3.48075 13.3625 4.01904 12.8891C4.19892 12.729 4.52692 12.651 4.7015 12.6338C5.34825 12.5697 5.94739 12.8183 6.65431 13.1661C6.15768 13.8195 5.52482 14.2275 4.89196 14.2275Z"
            fill="white"
          />
          <path
            d="M18.2012 9.83189C18.2012 10.1969 18.4684 10.4429 18.8407 10.4429C19.213 10.4429 19.4802 10.1969 19.4802 9.83189C19.4802 9.47347 19.213 9.22086 18.8407 9.22086C18.4684 9.22086 18.2012 9.47347 18.2012 9.83189Z"
            fill="#1677FF"
          />
          <path
            d="M17.5267 9.37494H16.4171V14.5026H17.5267V9.37494Z"
            fill="black"
          />
          <path
            d="M14.4715 9.55081H12.9823L11.3178 14.5033H12.3435L12.6245 13.5338H14.3875L14.6547 14.5033H15.968L14.4715 9.55081ZM12.856 12.7257L13.5159 10.4429H13.5437L14.1686 12.7257H12.856Z"
            fill="black"
          />
          <path
            d="M19.3955 10.7379H18.2859V14.5033H19.3955V10.7379Z"
            fill="black"
          />
          <path
            d="M30.9934 10.7452L31 10.7379H29.9538L29.2932 13.028H29.2581L28.4996 10.7379H27.2564L28.7522 14.5172L28.1273 15.6692V15.697H29.1034L30.9934 10.7452Z"
            fill="black"
          />
          <path
            d="M22.1565 10.6605C21.7491 10.6605 21.433 10.8153 21.0746 11.1102V10.7379H19.9649V15.697H21.0746V14.4676C21.2855 14.5238 21.4819 14.5523 21.7207 14.5523C22.7113 14.5523 23.6034 13.8215 23.6034 12.5221C23.6034 11.3562 22.9573 10.6605 22.1565 10.6605ZM21.4535 13.8566C21.3272 13.8566 21.2075 13.8427 21.0739 13.8004V11.7636C21.306 11.6022 21.4952 11.5248 21.7339 11.5248C22.1485 11.5248 22.4785 11.8548 22.4785 12.5578C22.4792 13.4565 21.9944 13.8566 21.4535 13.8566Z"
            fill="black"
          />
          <path
            d="M27.0382 13.5616V11.9884C27.0382 11.1314 26.5323 10.6605 25.6402 10.6605C25.0708 10.6605 24.678 10.7591 23.9612 10.9766L24.1576 11.8409C24.8109 11.546 25.0986 11.4197 25.4008 11.4197C25.7658 11.4197 25.9279 11.6796 25.9279 12.0803V12.1081C24.6562 12.3468 24.2627 12.4804 24.0174 12.7264C23.8348 12.9089 23.7575 13.1688 23.7575 13.471C23.7575 14.1945 24.3196 14.5807 24.846 14.5807C25.2394 14.5807 25.5555 14.4332 25.9841 14.1098L26.0614 14.5033H27.1711L27.0382 13.5616ZM25.9285 13.5901C25.6336 13.7514 25.465 13.8149 25.2685 13.8149C25.0014 13.8149 24.8327 13.639 24.8327 13.3586C24.8327 13.2535 24.8539 13.1477 24.9379 13.0637C25.0715 12.9301 25.3314 12.8316 25.9285 12.6914V13.5901Z"
            fill="black"
          />
          <rect
            x="0.5"
            y="0.5"
            width="33"
            height="23"
            rx="3.5"
            stroke="#E2E8F0"
          />
        </svg>
        <svg
          width="34"
          height="24"
          viewBox="0 0 34 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.0578 15.528V12.5933H17.5725C18.1931 12.5933 18.717 12.3854 19.144 11.9752L19.2465 11.8712C20.0266 11.022 19.9754 9.69911 19.144 8.91346C18.7284 8.49752 18.159 8.27223 17.5725 8.28378H15.1411V15.528H16.0578ZM16.0579 11.7036V9.17336H17.5956C17.9259 9.17336 18.2391 9.30045 18.4726 9.53153C18.9681 10.0168 18.9795 10.8255 18.5011 11.3281C18.2676 11.5765 17.9373 11.7152 17.5956 11.7036H16.0579ZM23.5228 10.9584C23.1299 10.5945 22.5947 10.4096 21.9171 10.4096C21.0459 10.4096 20.3911 10.7331 19.9583 11.3744L20.7669 11.8885C21.063 11.4495 21.4673 11.23 21.9797 11.23C22.3043 11.23 22.6175 11.3513 22.8623 11.5708C23.1015 11.7788 23.2381 12.0792 23.2381 12.3969V12.6106C22.8851 12.4142 22.4409 12.3102 21.8943 12.3102C21.2566 12.3102 20.7441 12.4604 20.3626 12.7666C19.9811 13.0728 19.7875 13.4772 19.7875 13.9913C19.7761 14.4592 19.9754 14.9041 20.3284 15.2044C20.6872 15.528 21.1427 15.6897 21.6779 15.6897C22.31 15.6897 22.8111 15.4066 23.1926 14.8405H23.2324V15.528H24.1093V12.472C24.1093 11.8308 23.9157 11.3224 23.5228 10.9584ZM21.0347 14.6152C20.8467 14.4766 20.7328 14.2513 20.7328 14.0087C20.7328 13.7371 20.8581 13.5118 21.103 13.3328C21.3536 13.1537 21.6668 13.0612 22.037 13.0612C22.5495 13.0555 22.9482 13.171 23.2329 13.4021C23.2329 13.7949 23.0792 14.1357 22.7773 14.4246C22.504 14.7019 22.1338 14.8579 21.7465 14.8579C21.4903 14.8636 21.2397 14.777 21.0347 14.6152ZM26.0795 17.7058L29.1429 10.5714H28.1464L26.7286 14.1299H26.7115L25.2595 10.5714H24.2631L26.2731 15.2102L25.1343 17.7058H26.0795Z"
            fill="#3C4043"
          />
          <path
            d="M12.8929 11.9579C12.8929 11.6748 12.8701 11.3918 12.8246 11.1145H8.95828V12.7147H11.1733C11.0822 13.2288 10.7861 13.691 10.3533 13.9798V15.0196H11.6744C12.4488 14.2975 12.8929 13.2288 12.8929 11.9579Z"
            fill="#4285F4"
          />
          <path
            d="M8.95846 16.0248C10.0631 16.0248 10.9969 15.6551 11.6745 15.0197L10.3535 13.9798C9.9834 14.234 9.51079 14.3784 8.95846 14.3784C7.88797 14.3784 6.98261 13.6448 6.65805 12.6627H5.29716V13.7372C5.99184 15.141 7.40967 16.0248 8.95846 16.0248Z"
            fill="#34A853"
          />
          <path
            d="M6.6582 12.6627C6.48735 12.1485 6.48735 11.5882 6.6582 11.0683V9.99954H5.2971C4.71052 11.1722 4.71052 12.5587 5.2971 13.7314L6.6582 12.6627Z"
            fill="#FBBC04"
          />
          <path
            d="M8.95846 9.35253C9.54495 9.34098 10.1087 9.56628 10.53 9.97643L11.703 8.7864C10.9571 8.08162 9.9777 7.69457 8.95846 7.70612C7.40967 7.70612 5.99184 8.59576 5.29716 9.99954L6.65805 11.074C6.98261 10.0862 7.88797 9.35253 8.95846 9.35253Z"
            fill="#EA4335"
          />
          <rect
            x="0.5"
            y="0.5"
            width="33"
            height="23"
            rx="3.5"
            stroke="#E2E8F0"
          />
        </svg>
        <svg
          width="34"
          height="24"
          viewBox="0 0 34 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.44921 8.34316C9.16382 8.69506 8.70721 8.97261 8.2506 8.93296C8.19353 8.45715 8.41707 7.95161 8.67867 7.63936C8.96406 7.27755 9.46348 7.01983 9.86777 7C9.91533 7.49563 9.72983 7.98135 9.44921 8.34316ZM9.86297 9.02712C9.46071 9.003 9.09366 9.15319 8.79718 9.2745C8.60639 9.35256 8.44483 9.41867 8.32191 9.41867C8.18397 9.41867 8.01574 9.34903 7.82685 9.27084L7.82685 9.27084C7.57935 9.16838 7.29638 9.05124 6.99964 9.05686C6.31948 9.06677 5.68688 9.46823 5.33967 10.1076C4.62621 11.3863 5.15417 13.2796 5.84384 14.3205C6.18155 14.8359 6.58584 15.4009 7.11855 15.3811C7.35291 15.3719 7.5215 15.2973 7.69597 15.2202C7.89683 15.1314 8.10549 15.0391 8.43131 15.0391C8.74582 15.0391 8.94536 15.129 9.1369 15.2152C9.31903 15.2973 9.49393 15.376 9.75358 15.3712C10.3053 15.3613 10.6525 14.8557 10.9902 14.3403C11.3547 13.7871 11.5148 13.2471 11.5391 13.1652L11.542 13.1557C11.5414 13.1551 11.5369 13.153 11.5289 13.1492C11.4071 13.0911 10.476 12.6469 10.467 11.4557C10.4581 10.4559 11.2056 9.94935 11.3233 9.86961L11.3233 9.8696C11.3304 9.86476 11.3353 9.86149 11.3374 9.85978C10.8618 9.12625 10.1198 9.04695 9.86297 9.02712ZM13.6824 15.3167V7.5898H16.4649C17.9013 7.5898 18.9049 8.62071 18.9049 10.1274C18.9049 11.6341 17.8822 12.675 16.4268 12.675H14.8334V15.3167H13.6824ZM14.8333 8.60088H16.1603C17.1592 8.60088 17.7299 9.15599 17.7299 10.1324C17.7299 11.1088 17.1592 11.6688 16.1556 11.6688H14.8333V8.60088ZM22.7053 14.3898C22.4009 14.9945 21.7302 15.3761 21.0072 15.3761C19.9371 15.3761 19.1903 14.712 19.1903 13.7108C19.1903 12.7196 19.9133 12.1496 21.2498 12.0653L22.6862 11.9761V11.5499C22.6862 10.9204 22.2915 10.5784 21.5875 10.5784C21.0072 10.5784 20.5839 10.8907 20.4983 11.3665H19.4614C19.4947 10.3653 20.3984 9.63675 21.6208 9.63675C22.9383 9.63675 23.7945 10.3554 23.7945 11.4706V15.3167H22.729V14.3898H22.7053ZM21.3163 14.4592C20.7027 14.4592 20.3127 14.1519 20.3127 13.6811C20.3127 13.1954 20.6885 12.9129 21.4067 12.8683L22.6861 12.784V13.2202C22.6861 13.9438 22.0964 14.4592 21.3163 14.4592ZM27.3284 15.619C26.867 16.9721 26.3391 17.4181 25.2166 17.4181C25.131 17.4181 24.8456 17.4082 24.779 17.3884V16.4616C24.8503 16.4715 25.0263 16.4814 25.1167 16.4814C25.6256 16.4814 25.911 16.2584 26.087 15.6785L26.1916 15.3365L24.2415 9.7111H25.4449L26.8004 14.2759H26.8242L28.1798 9.7111H29.3499L27.3284 15.619Z"
            fill="black"
          />
          <rect
            x="0.5"
            y="0.5"
            width="33"
            height="23"
            rx="3.5"
            stroke="#E2E8F0"
          />
        </svg>
      </div>
    </div>
  </div>
)

export const Wrapper: React.FC<Props> = (props) => {
  useEffect(() => {
    props.onLoadAdjustedPricing()
  }, [])

  const [interval, setInterval] = useState<"monthly" | "yearly">("monthly")
  const isSubscribed = Boolean(props.actualPlan)
  const tiers = paymentTiers
  // const tiers = isSubscribed ? paymentTiers : [freeTier].concat(paymentTiers)
  const { href } = useLocation()
  const url = new URL(href || "https://www.foudroyer.com")
  const why = url.searchParams.get("why")

  return (
    <>
      <div className="isolate overflow-x-hidden">
        <div className="max-w-9xl mx-auto overflow-hidden px-6 pb-80 pt-24 text-center lg:px-8">
          <div className="mx-auto max-w-4xl">
            <span className="font-display text-base font-semibold text-pink-400">
              <FormattedMessage id={tiers[0].label} />
            </span>

            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {(!why ||
                (why !== "indexation/quota" &&
                  why !== "indexation/report" &&
                  why !== "indexation/index-all" &&
                  why !== "indexation/trial-expired" &&
                  why !== "indexation/auto-index" &&
                  why !== "multi-google-search" &&
                  why !== "indexation/add-website")) && (
                <FormattedMessage id={"marketing/pricing/title"} />
              )}

              {why === "indexation/add-website" && (
                <FormattedMessage id="marketing/pricing/title/add-website" />
              )}

              {why === "indexation/auto-index" && (
                <FormattedMessage id="marketing/pricing/title/indexation/auto-index" />
              )}

              {why === "indexation/index-all" && (
                <FormattedMessage id="marketing/pricing/title/indexation/index-all" />
              )}

              {why === "indexation/quota" && (
                <FormattedMessage id="marketing/pricing/title/indexation/quota" />
              )}
              {why === "indexation/report" && (
                <FormattedMessage id="marketing/pricing/title/report/quota" />
              )}

              {why === "indexation/trial-expired" && (
                <FormattedMessage id="marketing/pricing/title/trial-expired" />
              )}

              {why === "multi-google-search" && (
                <FormattedMessage id="marketing/pricing/title/multi-google-search" />
              )}
            </h2>
          </div>

          <div className="relative mt-4">
            <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-700">
              {(!why ||
                (why !== "indexation/quota" &&
                  why !== "multi-google-search" &&
                  why !== "indexation/index-all" &&
                  why !== "indexation/auto-index" &&
                  why !== "indexation/trial-expired")) && (
                <FormattedMessage id={`marketing/pricing/description`} />
              )}

              {why === "indexation/index-all" && (
                <FormattedMessage id="marketing/pricing/description/indexation/index-all" />
              )}

              {why === "indexation/auto-index" && (
                <FormattedMessage id="marketing/pricing/description/indexation/auto-index" />
              )}

              {why === "indexation/quota" && (
                <FormattedMessage id="marketing/pricing/description/indexation/quota" />
              )}
              {why === "indexation/trial-expired" && (
                <FormattedMessage id="marketing/pricing/description/trial-expired" />
              )}

              {why === "multi-google-search" && (
                <FormattedMessage id="marketing/pricing/description/multi-google-search" />
              )}
            </p>

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

        <div className="mt-12 flow-root bg-white pb-8">
          <div className="-mt-80">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="w-full grid-cols-3 gap-6 md:grid">
                <div></div>
                <PricingSwitchBillingInterval
                  enabled={interval === "yearly"}
                  setEnabled={() => {
                    if (interval === "yearly") setInterval("monthly")
                    if (interval === "monthly") setInterval("yearly")
                  }}
                />
                <div></div>
              </div>

              <div
                className={clsx(
                  "mx-auto mt-4 grid max-w-md grid-cols-1 gap-4 lg:max-w-7xl",
                  tiers.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
                )}
              >
                {tiers.map((tier, tierIndex) => {
                  const tierPlan =
                    tier.plan === PaymentPlansEntity["indexation/free"]
                      ? { level: 0 }
                      : findPlanByNameAndInterval({
                          interval: "monthly",
                          planName: tier.plan,
                        })

                  const actualPlan = props.actualPlan
                    ? findPlanByNameAndInterval({
                        interval: "monthly",
                        planName: props.actualPlan.plan,
                      })
                    : { level: -1 }

                  return (
                    <div
                      key={tierIndex}
                      className={classNames(
                        "relative flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-slate-200 sm:p-6",
                        tier.highlight &&
                          !props.actualPlan?.plan &&
                          "ring-4 !ring-pink-300",
                        tier.plan === props.actualPlan?.plan &&
                          "ring-4 !ring-pink-300"
                      )}
                    >
                      {tier.highlight && !props.actualPlan?.plan && (
                        <div className="absolute right-4 top-4">
                          <div className="flex items-center justify-center rounded-lg bg-pink-400 px-3 py-1 font-display text-sm text-white">
                            <FormattedMessage id="marketing/pricing/popular" />
                          </div>
                        </div>
                      )}

                      {props.actualPlan?.plan === tier.plan && (
                        <div className="absolute right-4 top-4">
                          <div className="flex items-center justify-center rounded-lg bg-pink-400 px-3 py-1 font-display text-sm text-white">
                            <>Your plan</>
                          </div>
                        </div>
                      )}
                      <div>
                        <h2
                          id={tier.id}
                          className="font-display text-base font-semibold leading-7 text-pink-400"
                        >
                          <FormattedMessage id={tier.name} />
                        </h2>
                        <div className="flex items-baseline ">
                          {tier.reduction && (
                            <span className="mr-2 font-display text-3xl font-bold tracking-tight text-slate-900">
                              {roundDecimal(
                                props.products[tier.plan][interval] /
                                  (interval === "yearly" ? 12 : 1) || 0
                              )}
                              {getSymbolFromCurrency(props.products.currency)}
                            </span>
                          )}

                          {/* {tier.reduction && (
                        <span className="font-display text-3xl font-bold tracking-tight text-slate-900">
                          {props.products[tier.plan][interval] /
                            (interval === "yearly" ? 12 : 1) || 0}
                          {getSymbolFromCurrency(props.products.currency)}
                        </span>
                      )} */}
                          {/* {tier.reduction && (
                        <span className="font-display text-3xl font-bold tracking-tight text-slate-900">
                          {Math.round(
                            props.products[tier.plan][interval] *
                              tier.reduction || 0
                          )}
                          {getSymbolFromCurrency(props.products.currency)}
                        </span>
                      )} */}

                          {(interval === "yearly" ||
                            tier.plan ===
                              PaymentPlansEntity["indexation/free"]) && (
                            <span
                              className={classNames(
                                "font-display text-3xl font-bold tracking-tight",
                                tier.reduction &&
                                  "text-base font-semibold text-slate-400 line-through"
                              )}
                            >
                              {tier.plan ===
                              PaymentPlansEntity["indexation/free"]
                                ? 0
                                : ""}

                              {tier.plan !==
                                PaymentPlansEntity["indexation/free"] &&
                                props.products[tier.plan]["monthly"]}

                              {getSymbolFromCurrency(props.products.currency)}
                            </span>
                          )}

                          <span className="font-display text-base font-medium leading-7 text-slate-400">
                            <FormattedMessage id="marketing/pricing/premium/month" />
                          </span>
                        </div>

                        <ul
                          role="list"
                          className="mt-6 space-y-4 text-sm leading-6 "
                        >
                          {tier.features.map((feature, featureIndex) => (
                            <div key={featureIndex}>
                              <li
                                key={featureIndex}
                                className={"flex gap-x-3 font-display"}
                              >
                                <CheckIcon
                                  className="h-6 w-5 flex-none text-pink-400"
                                  aria-hidden="true"
                                />

                                <FormattedMessage id={feature} />
                              </li>
                            </div>
                          ))}

                          <div
                            className={clsx(
                              "relative flex items-center justify-center",
                              tier.featuresComingSoon.length === 0 &&
                                "opacity-0"
                            )}
                          >
                            <hr className="absolute inset-0 my-auto translate-y-1/2 transform border-dotted border-slate-400" />
                            <div
                              className={clsx(
                                "relative flex items-center justify-center bg-white px-4 font-display text-xs font-medium uppercase text-slate-400"
                              )}
                            >
                              Coming Soon
                            </div>
                          </div>

                          {tier.featuresComingSoon.map(
                            (feature, featureIndex) => (
                              <div key={featureIndex}>
                                <li
                                  key={featureIndex}
                                  className={"flex gap-x-3 font-display"}
                                >
                                  <CheckIcon
                                    className="h-6 w-5 flex-none text-pink-400"
                                    aria-hidden="true"
                                  />

                                  <FormattedMessage id={feature} />
                                </li>
                              </div>
                            )
                          )}
                        </ul>
                      </div>
                      <div className="mt-8">
                        <ButtonSecondary
                          onClick={() =>
                            props.onSubscribe(
                              tier.plan as PaymentPlansEntity,
                              interval
                            )
                          }
                          disabled={tierPlan.level <= actualPlan.level}
                          fullWidth
                        >
                          {tier.plan ===
                            PaymentPlansEntity["indexation/free"] && (
                            <FormattedMessage id="marketing/pricing/free/cta" />
                          )}
                          {tier.plan !==
                            PaymentPlansEntity["indexation/free"] && (
                            <FormattedMessage
                              id={"marketing/pricing/premium/cta"}
                            />
                          )}
                        </ButtonSecondary>
                      </div>
                    </div>
                  )
                })}
                <div className="flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl bg-white p-8 ring-1 ring-slate-200 sm:gap-y-10 sm:p-10 lg:col-span-4 lg:flex-row lg:items-center">
                  <div className="lg:min-w-0 lg:flex-1">
                    <h2 className="font-display text-lg font-semibold leading-8 tracking-tight text-pink-400">
                      <FormattedMessage
                        id={"marketing/pricing/on-demand/label"}
                      />
                    </h2>
                    <p className="mt-1 text-base leading-7 text-slate-900">
                      <FormattedMessage
                        id={"marketing/pricing/on-demand/description"}
                      />
                    </p>
                  </div>
                  <ButtonSecondary onClick={props.onSupport}>
                    <FormattedMessage id={"marketing/pricing/on-demand/cta"} />
                    <span aria-hidden="true" className="ml-1">
                      &rarr;
                    </span>
                  </ButtonSecondary>
                </div>
              </div>

              <PaymentsMethods />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Connected: React.FC<ContainerProps> = (props) => <Wrapper {...props} />
export const Pricing = connector(Connected)

const ConnectedLanding: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)
export const PricingLanding = connector(ConnectedLanding)
