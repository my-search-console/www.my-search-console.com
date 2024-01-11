export const setLoading = "loader/setLoading";
export interface setLoadingAction {
  type: typeof setLoading;
  payload: { value: boolean };
}

export type DarkModeActionTypes = setLoadingAction;
