import { WebsiteEntity } from "@foudroyer/interfaces"
import { connect, ConnectedProps } from "react-redux"
import { IndexationSearchEngines } from "../../../../../../entities/SearchEngineEntity"
import { actions } from "../../../../../../redux/actions"
import { RootState } from "../../../../../../redux/store"

const mapState = (
  state: RootState,
  props: { source: IndexationSearchEngines }
) => ({
  website: state.websites.website,
  source: props.source,
})

const mapDispatch = (dispatch: any) => ({
  onClick: (params: {
    website: WebsiteEntity
    source: IndexationSearchEngines
  }) => {
    dispatch(
      actions.indexation.$IndexationToggle({
        type: "source",
        source: params.source,
        website: params.website,
      })
    )
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
