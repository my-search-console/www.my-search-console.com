export const AssistantSetOpenState = "AssistantSetOpenState"
export interface AssistantSetOpenStateAction {
  type: typeof AssistantSetOpenState
  payload: {
    isOpen: boolean
  }
}

export type AssistantActionTypes = AssistantSetOpenStateAction
