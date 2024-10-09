import { LogsEntity } from "@foudroyer/interfaces"
import * as types from "./types"

interface LogsState {
  logs: LogsEntity[]
  tags: string[]
  isFetching: boolean
  logsInFetchingState: Set<string>
  createOrUpdateForm: {
    form: LogsEntity | null
    isFetching: boolean
  }
}

const initialState: LogsState = {
  logs: [],
  tags: [],
  isFetching: false,
  logsInFetchingState: new Set(),
  createOrUpdateForm: {
    form: null,
    isFetching: false,
  },
}

export function logsReducer(
  state = initialState,
  action: types.LogsActionTypes
): LogsState {
  if (action.type === types.LogsSetFetching) {
    return {
      ...state,
      isFetching: action.payload,
    }
  }

  if (action.type === types.LogsFormSetFetching) {
    return {
      ...state,
      createOrUpdateForm: {
        ...state.createOrUpdateForm,
        isFetching: action.payload,
      },
    }
  }

  if (action.type === types.LogsStore) {
    return {
      ...state,
      logs: action.payload,
      logsInFetchingState: new Set(),
    }
  }

  if (action.type === types.LogsAddFetchingState) {
    return {
      ...state,
      logsInFetchingState: new Set(state.logsInFetchingState).add(
        action.payload
      ),
    }
  }

  if (action.type === types.LogsRemoveFetchingState) {
    const newFetchingState = new Set(state.logsInFetchingState)
    newFetchingState.delete(action.payload)
    return {
      ...state,
      logsInFetchingState: newFetchingState,
    }
  }

  return state
}
