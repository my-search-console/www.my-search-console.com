import { connect, ConnectedProps } from "react-redux"
import { RootState } from "../../../../redux/store"
import { PaymentPlansEntity } from "@my-search-console/interfaces"

const mapState = (state: RootState) => ({
  isPremium: state.payments.plans.size > 0,
})

const mapDispatch = (dispatch: any) => ({})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
