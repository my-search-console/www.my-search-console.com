import { Modules } from "../../interfaces/IModule"
import { TestModule } from "../../modules/TestModule"
import * as types from "./types"

type DiState = Modules

const initialState: DiState = new TestModule().build()

export function diReducer(
  state = initialState,
  action: types.DiActionTypes
): DiState {
  if (action.type === types.register) {
    return {
      ...state,
      ...action.payload,
    }
  }

  return state
}
