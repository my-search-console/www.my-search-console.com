export const Store = "REDUX_LANG_STORE"
export interface StoreAction {
  type: typeof Store
  payload: {
    lang: string
  }
}

export type LangActionTypes = StoreAction
