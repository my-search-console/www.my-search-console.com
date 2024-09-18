import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import { actions } from "./actions"

import { rankingReducer } from "./analytics/reducers"
import { authReducer } from "./auth/reducers"
import { darkModeReducer } from "./dark-mode/reducers"
import { diReducer } from "./di/reducers"
import { DiInjectable } from "./di/types"
import { indexationReducer } from "./indexation/reducers"
import { keywordsReducer } from "./keywords/reducers"
import { langReducer } from "./lang/reducers"
import { loaderReducer } from "./loader/reducers"
import { modalReducer } from "./modal/reducers"
import { notificationsReducer } from "./notifications/reducers"
import { paymentsReducer } from "./payments/reducers"
import { statsReducer } from "./stats/reducers"
import { websitesReducer } from "./websites/reducers"

const enhancer = applyMiddleware(thunk)

export const reducers = combineReducers({
  di: diReducer,
  notifications: notificationsReducer,
  lang: langReducer,
  auth: authReducer,
  ranking: rankingReducer,
  indexation: indexationReducer,
  websites: websitesReducer,
  modal: modalReducer,
  loader: loaderReducer,
  darkMode: darkModeReducer,
  payments: paymentsReducer,
  keywords: keywordsReducer,
  stats: statsReducer,
})

export type RootState = ReturnType<typeof reducers>

export const init = (initialState = {}, di: DiInjectable) => {
  const store = createStore(reducers, initialState, enhancer)

  store.dispatch(actions.di.register(di))

  return { store }
}
