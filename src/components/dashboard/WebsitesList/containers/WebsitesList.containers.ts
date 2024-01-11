import { Select } from "./../../../../redux/websites/types"
import { CreateWebsiteModal } from "./../../../general/CreateWebsiteModal/CreateWebsiteModal"
import { IndexationSearchEngines } from "./../../../../entities/SearchEngineEntity"
import { WebsiteEntity } from "@foudroyer/interfaces/dist/entities/WebsiteEntity"
import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  websites: state.websites.entities.map((id) =>
    state.websites.map.get(id)
  ) as WebsiteEntity[],
  fetching: state.websites.fetching,
})

const mapDispatch = (dispatch: any) => ({
  onDisplay: () => {
    dispatch(
      actions.websites.$fetchAll({
        force: true,
      })
    )
  },
  onToggleAutoIndexing: (params: { website: WebsiteEntity }) => {
    dispatch(
      actions.indexation.$IndexationToggle({
        type: "auto-indexing",
        website: params.website,
      })
    )
  },
  onToggleSource: (params: {
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
  onAddWebsite: () => {
    dispatch(actions.websites.$WebsiteCreateModal())
  },
  onBoost: (params: { website: WebsiteEntity }) => {
    dispatch(
      actions.websites.setCredentialsIsOpen({
        value: true,
        website: params.website,
      })
    )
  },
  onSeeDetails: (params: { website: WebsiteEntity }) => {
    dispatch(actions.websites.navigateOrShowModal(params.website))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
