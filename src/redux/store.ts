import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { actions } from "./actions"

import { diReducer } from "./di/reducers"
import { DiInjectable } from "./di/types"
import { langReducer } from "./lang/reducers"
import { authReducer } from "./auth/reducers"
import { websitesReducer } from "./websites/reducers"
import { notificationsReducer } from "./notifications/reducers"
import { rankingReducer } from "./analytics/reducers"
import { indexationReducer } from "./indexation/reducers"
import { modalReducer } from "./modal/reducers"
import { loaderReducer } from "./loader/reducers"
import { darkModeReducer } from "./dark-mode/reducers"
import { paymentsReducer } from "./payments/reducers"
import { keywordsReducer } from "./keywords/reducers"
import { opportunitiesReducer } from "./opportunities/reducers"
import { spreadReducer } from "./spread/reducers"
import { roastReducer } from "./roast/reducers"

const enhancer = applyMiddleware(thunk)

export const reducers = combineReducers({
  di: diReducer,
  roast: roastReducer,
  notifications: notificationsReducer,
  spread: spreadReducer,
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
  opportunities: opportunitiesReducer,
})

export type RootState = ReturnType<typeof reducers>

export const init = (initialState = {}, di: DiInjectable) => {
  const store = createStore(reducers, initialState, enhancer)

  store.dispatch(actions.di.register(di))

  return { store }
}
