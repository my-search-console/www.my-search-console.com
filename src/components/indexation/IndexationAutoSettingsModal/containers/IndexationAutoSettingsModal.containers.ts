import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  indexation_auto_activated:
    state.indexation.indexation_auto_settings_modal.indexation_auto_activated,
  indexation_auto_update_pages_activated:
    state.indexation.indexation_auto_settings_modal
      .indexation_auto_update_pages_activated,

  submitting: state.indexation.indexation_auto_settings_modal.submitting,
})

const mapDispatch = (dispatch: any) => ({
  onClose: () => {
    dispatch(actions.indexation.$IndexationAutoSettingsModalClose())
  },
  onSave: () => {
    dispatch(actions.indexation.$IndexationAutoSettingsModalSave())
  },
  onChange(
    key: "indexation_auto_activated" | "indexation_auto_update_pages_activated",
    value: boolean
  ) {
    dispatch(
      actions.indexation.IndexationAutoSettingsModalChange({
        key,
        value,
      })
    )
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
