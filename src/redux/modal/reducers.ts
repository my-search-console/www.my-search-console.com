import * as types from "./types";

interface ModalState {
  isOpen: boolean;
  cta: {
    isOpen: boolean;
    title: string | null;
    description: string | null;
    onSubmit: Function | null;
    isLoading: boolean;
  };
  comingSoon: {
    isOpen: boolean;
    type: "bing" | "yandex" | "builder" | "ranking";
  };
}

const initialState: ModalState = {
  isOpen: false,
  cta: {
    isOpen: false,
    title: null,
    description: null,
    onSubmit: null,
    isLoading: false,
  },
  comingSoon: {
    type: "bing",
    isOpen: false,
  },
};

export function modalReducer(
  state = initialState,
  action: types.ModalActionTypes
): ModalState {
  if (action.type === types.open) {
    return {
      ...state,
      isOpen: true,
    };
  }

  if (action.type === types.close) {
    return {
      ...state,
      isOpen: false,
    };
  }

  if (action.type === types.openCta) {
    return {
      ...state,
      cta: {
        ...state.cta,
        isOpen: true,
        onSubmit: action.payload.onSubmit || null,
        title: action.payload.title || null,
        description: action.payload.description || null,
        isLoading: false,
      },
    };
  }

  if (action.type === types.closeCta) {
    return {
      ...state,
      cta: { ...state.cta, isOpen: false, isLoading: false, onSubmit: null },
    };
  }

  if (action.type === types.onOpenComingSoon) {
    return {
      ...state,
      comingSoon: {
        ...state.comingSoon,
        isOpen: true,
        type: action.payload.type,
      },
    };
  }

  if (action.type === types.onCloseComingSoon) {
    return {
      ...state,
      comingSoon: { ...state.comingSoon, isOpen: false },
    };
  }

  if (action.type === types.ctaFetching) {
    return {
      ...state,
      cta: { ...state.cta, isLoading: true },
    };
  }

  if (action.type === types.ctaFetchEnd) {
    return {
      ...state,
      cta: { ...state.cta, isLoading: false },
    };
  }

  return state;
}
