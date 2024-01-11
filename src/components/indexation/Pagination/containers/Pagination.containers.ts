import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  page: state.indexation.pagination.page,
  limit: state.indexation.pagination.limit,
  total: state.indexation.pagination.total,
})

const mapDispatch = (dispatch: any) => ({
  onNext: () => {
    dispatch(actions.indexation.pagination.$next())
  },
  onPrevious: () => {
    dispatch(actions.indexation.pagination.$previous())
  },
  onSelect: (page: number) => {
    dispatch(actions.indexation.pagination.$select(page))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
