import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  isOpen: state.keywords.addKeywordsModal.isOpen,
  isFetching: state.keywords.isFetching,
  canSubmit: state.keywords.selectedKeywordsToCreate.size > 0,
  selectedKeywordsToCreate: Array.from(state.keywords.selectedKeywordsToCreate),
  keywordInput: state.keywords.addKeywordsModal.input,
})

const mapDispatch = (dispatch: any) => ({
  onClose: () => {
    dispatch(
      actions.keywords.KeywordsSetAddKeywordsModalIsOpen({ value: false })
    )
  },
  onChange: (newValue: string) => {
    dispatch(
      actions.keywords.KeywordsSetAddKeywordsModalInput({ value: newValue })
    )
  },
  onSubmit: () => {
    dispatch(actions.keywords.$create())
  },
  onAddToSelectedKeywordsToCreate: () => {
    dispatch(actions.keywords.KeywordsStoreInputToKeywords())
  },
  onRemoveFromSelectedKeywordsToCreate: (keyword: string) => {
    dispatch(
      actions.keywords.KeywordsSelectedKeywordsToCreateRemoveKeyword({
        keyword,
      })
    )
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
