import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  isOpen: state.ranking.analyticsComingSoonModal.isOpen,
})

const mapDispatch = (dispatch: any) => ({
  onClose: () => {
    dispatch(
      actions.ranking.AnalyticsSetAnalyticsComingSoonModalIsOpen({
        value: false,
      })
    )
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
