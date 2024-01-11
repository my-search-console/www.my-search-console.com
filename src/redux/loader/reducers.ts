import * as types from "./types";

interface PlayState {
  isLoading: boolean;
}

const initialState: PlayState = {
  isLoading: false,
};

export function loaderReducer(
  state = initialState,
  action: types.DarkModeActionTypes
): PlayState {
  if (action.type === types.setLoading) {
    return {
      ...state,
      isLoading: action.payload.value,
    };
  }

  return state;
}
