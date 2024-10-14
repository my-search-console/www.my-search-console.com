import {
  PaymentEntity,
  PaymentPlansEntity,
  PaymentPricesEntity,
} from "@foudroyer/interfaces"
import { AnalyticsPaymentEntityPaymentSources } from "../../entities/AnalyticsEntity"
import { InvoiceEntity } from "../../interfaces/IPaymentsRepository"
import * as types from "./types"

interface PaymentsState {
  isLoading: boolean
  payments: PaymentEntity[]
  plans: Set<PaymentPlansEntity>
  modal: {
    isOpen: boolean
    type: "indexation"
    source: AnalyticsPaymentEntityPaymentSources | null
    isUpsell: boolean
    isClosable: boolean
  }
  invoices: {
    modal: {
      isOpen: boolean
    }
    invoices: InvoiceEntity[]
  }
  actualIndexationPlan: PaymentEntity | null
  actualAnalyticsPlan: PaymentPlansEntity
  paymentPlan: string
  products: PaymentPricesEntity
  upsellConfirmationModal: {
    plan: PaymentPlansEntity
    interval: "yearly" | "monthly"
    isOpen: boolean
  }
}

const initialState: PaymentsState = {
  isLoading: false,
  payments: [],
  plans: new Set(),
  modal: {
    isOpen: false,
    source: null,
    type: "indexation",
    isUpsell: false,
    isClosable: true,
  },
  upsellConfirmationModal: {
    plan: PaymentPlansEntity["indexation"],
    interval: "monthly",
    isOpen: false,
  },
  invoices: {
    modal: {
      isOpen: false,
    },
    invoices: [],
  },
  actualIndexationPlan: null,
  actualAnalyticsPlan: PaymentPlansEntity["analytics/free"],
  paymentPlan: "",
  products: {
    currency: "EUR",
    ["indexation/free"]: {
      monthly: 0,
      yearly: 0,
    },
    indexation: {
      monthly: 29.99,
      yearly: 299,
    },
    enterprise: {
      monthly: 129.99,
      yearly: 1290,
    },
    newbie: {
      monthly: 9.99,
      yearly: 99,
    },
    [PaymentPlansEntity["indexation/teams"]]: {
      monthly: 49.99,
      yearly: 499,
    },
    ["analytics/free"]: {
      monthly: 0,
      yearly: 0,
    },
    ["analytics/beginner"]: {
      monthly: 9.99,
      yearly: 99,
    },
    ["analytics/pro"]: {
      monthly: 19.99,
      yearly: 199,
    },
    ["analytics/enterprise"]: {
      monthly: 29.99,
      yearly: 299,
    },
  },
}

export function paymentsReducer(
  state = initialState,
  action: types.PaymentsActionTypes
): PaymentsState {
  if (action.type === types.PaymentsSetLoading) {
    return {
      ...state,
      isLoading: action.payload.value,
    }
  }

  if (action.type === types.PaymentSetPaymentPlan) {
    return {
      ...state,
      paymentPlan: action.payload,
    }
  }

  if (action.type === types.PaymentsStore) {
    return {
      ...state,
      payments: action.payload,
      plans: new Set(action.payload.map(({ plan }) => plan)),
      actualIndexationPlan:
        action.payload.find(({ plan }) => !plan.includes("analytics")) || null,
      actualAnalyticsPlan:
        action.payload.find(({ plan }) => plan.includes("analytics"))?.plan ||
        PaymentPlansEntity["analytics/free"],
    }
  }

  if (action.type === types.PaymentsStorePlans) {
    return {
      ...state,
      products: action.payload,
    }
  }

  if (action.type === types.PaymentsStoreInvoices) {
    return {
      ...state,
      invoices: {
        ...state.invoices,
        invoices: action.payload,
      },
    }
  }

  if (action.type === types.PaymentsOpenModal) {
    if (action.payload.value === true) {
      return {
        ...state,
        modal: {
          ...state.modal,
          source: action.payload.source,
          isOpen: true,
          isUpsell: action.payload.isUpsell || false,
          isClosable: action.payload.isClosable === false ?? true,
        },
      }
    }

    return {
      ...state,
      modal: {
        ...state.modal,
        isOpen: false,
      },
    }
  }

  if (action.type === types.PaymentsUpsellConfirmationOpenModal) {
    if (action.payload.isOpen === true) {
      return {
        ...state,
        upsellConfirmationModal: {
          ...state.upsellConfirmationModal,
          ...action.payload,
        },
      }
    }

    return {
      ...state,
      upsellConfirmationModal: {
        ...state.upsellConfirmationModal,
        isOpen: false,
      },
    }
  }

  if (action.type === types.PaymentsOpenInvoicesModal) {
    if (action.payload === true) {
      return {
        ...state,
        invoices: {
          ...state.invoices,
          modal: {
            isOpen: true,
          },
        },
      }
    }

    return {
      ...state,
      invoices: {
        ...state.invoices,
        modal: {
          isOpen: false,
        },
      },
    }
  }

  return state
}
