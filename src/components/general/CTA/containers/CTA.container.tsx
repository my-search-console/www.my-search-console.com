import { connect, ConnectedProps } from "react-redux"
import { ITranslations } from "../../../../interfaces/ITranslations"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  isOpen: state.modal.cta.isOpen,
  title: state.modal.cta.title as ITranslations["keys"],
  description: state.modal.cta.description as ITranslations["keys"],
  isLoading: state.modal.cta.isLoading,
})

const mapDispatch = (dispatch: any) => ({
  onSubmit: () => dispatch(actions.modal.fetchSubmit()),
  onCancel: () => dispatch(actions.modal.closeCta()),
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
