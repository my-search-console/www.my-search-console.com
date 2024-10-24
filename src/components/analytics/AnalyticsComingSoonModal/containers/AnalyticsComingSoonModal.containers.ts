import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  isOpen: state.analytics.analyticsComingSoonModal.isOpen,
})

const mapDispatch = (dispatch: any) => ({
  onClose: () => {
    dispatch(
      actions.analytics.AnalyticsSetAnalyticsComingSoonModalIsOpen({
        value: false,
      })
    )
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
