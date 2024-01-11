import { is } from "ramda"
import {
  PaymentEntity,
  PaymentPlansEntity,
  PaymentPricesEntity,
  ProductEntity,
} from "@foudroyer/interfaces"
import * as types from "./types"
import { AnalyticsPaymentEntityPaymentSources } from "../../entities/AnalyticsEntity"

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
    invoices: any[]
  }
  paymentPlan: string
  products: PaymentPricesEntity
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
  invoices: {
    modal: {
      isOpen: false,
    },
    invoices: [],
  },
  paymentPlan: "",
  products: {
    currency: "EUR",
    indexation: {
      monthly: 29.99,
      yearly: 1299,
    },
    enterprise: {
      monthly: 129.99,
      yearly: 299,
    },
    newbie: {
      monthly: 9.99,
      yearly: 99,
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
