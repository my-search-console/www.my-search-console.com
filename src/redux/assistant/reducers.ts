import * as types from "./types"

export interface AssistantState {}

const initialState: AssistantState = {}

export function rankingReducer(
  state = initialState,
  action: types.AssistantActionTypes
): AssistantState {
  return state
}
