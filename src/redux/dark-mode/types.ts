export const ToggleDarkMode = "REDUX_DARK_MODE_ToggleDarkMode"
export interface ToggleDarkModeAction {
  type: typeof ToggleDarkMode
}

export const Set = "REDUX_DARK_MODE_Set"
export interface SetAction {
  type: typeof Set
  payload: boolean
}

export type DarkModeActionTypes = ToggleDarkModeAction | SetAction
