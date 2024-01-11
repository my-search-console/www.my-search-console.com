import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../../../redux/actions"
import { RankingStatEntity } from "../../../../../../entities/RankingWebsiteEntity"
import { RootState } from "../../../../../../redux/store"

const mapState = (
  state: RootState,
  props: { stats: RankingStatEntity; barWidth: number; color: "pink" | "gray" }
) => ({
  stats: props.stats,
  barWidth: props.barWidth,
  isSelected: state.keywords.selectedKeywordsToDelete.has(props.stats.query),
  color: props.color,
})

const mapDispatch = (dispatch: any) => ({
  onSelect(keyword: string) {
    dispatch(actions.keywords.KeywordsSetSelectedKeywords({ keyword }))
  },
  onClick(keyword: string) {
    dispatch(
      actions.ranking.$RankingStoreFilter({ type: "query", value: keyword })
    )
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
