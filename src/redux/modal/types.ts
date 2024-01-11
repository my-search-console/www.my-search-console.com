import { ITranslations } from "../../interfaces/ITranslations";

export const open = "REDUX_MODAL_OPEN";
export const close = "REDUX_MODAL_CLOSE";
export const openCta = "REDUX_MODAL_CTA_OPEN";
export const closeCta = "REDUX_MODAL_CTA_CLOSE";
export const ctaFetching = "REDUX_MODAL_CTA_FETCHING";
export const ctaFetchEnd = "REDUX_MODAL_CTA_FETCHEND";

export interface openAction {
  type: typeof open;
}

export interface closeAction {
  type: typeof close;
}

export interface ctaFetchingAction {
  type: typeof ctaFetching;
}

export interface ctaFetchEndAction {
  type: typeof ctaFetchEnd;
}

export interface openCtaAction {
  type: typeof openCta;
  payload: {
    onSubmit?: Function;
    title: ITranslations["keys"];
    description?: ITranslations["keys"];
  };
}

export const onOpenComingSoon = "modals/onOpenComingSoon";
export interface onOpenComingSoonAction {
  type: typeof onOpenComingSoon;
  payload: {
    type: "yandex" | "bing" | "builder" | "ranking";
  };
}

export const onCloseComingSoon = "modals/onCloseComingSoon";
export interface onCloseComingSoonAction {
  type: typeof onCloseComingSoon;
}

export interface closeCtaAction {
  type: typeof closeCta;
}

export type ModalActionTypes =
  | openAction
  | closeAction
  | openCtaAction
  | closeCtaAction
  | onOpenComingSoonAction
  | onCloseComingSoonAction
  | ctaFetchingAction
  | ctaFetchEndAction;
