import { OpportunityEntity } from "@my-search-console/interfaces"
import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../../redux/actions"
import { RootState } from "../../../../../../redux/store"

const mapState = (
  state: RootState,
  props: {
    data: OpportunityEntity
  }
) => ({
  data: props.data,
})

const mapDispatch = (dispatch: any) => ({
  onClick(opportunity: string) {
    dispatch(
      actions.ranking.$RankingStoreFilter({ type: "query", value: opportunity })
    )
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
