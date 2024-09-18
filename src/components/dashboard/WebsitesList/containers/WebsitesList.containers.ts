import { WebsiteEntity } from "@foudroyer/interfaces/dist/entities/WebsiteEntity"
import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"
import { IndexationSearchEngines } from "./../../../../entities/SearchEngineEntity"

const mapState = (state: RootState) => ({
  websites: state.websites.entities.map((id) =>
    state.websites.map.get(id)
  ) as WebsiteEntity[],
  fetching: state.websites.fetching,
  filter: state.websites.filter,
})

const mapDispatch = (dispatch: any) => ({
  onDisplay: () => {
    dispatch(
      actions.websites.$fetchAll({
        force: true,
      })
    )
  },
  onClickUser: (params: { websiteId: string }) => {
    dispatch(
      actions.websites.$WebsitesOpenAddUsersModal({
        websiteId: params.websiteId,
      })
    )
  },
  onToggleAutoIndexing: (params: { website: WebsiteEntity }) => {
    dispatch(
      actions.indexation.$IndexationAutoSettingsModalOpen({
        websiteId: params.website.id,
      })
    )
  },
  onToggleSource: (params: {
    website: WebsiteEntity
    source: IndexationSearchEngines
  }) => {
    dispatch(
      actions.indexation.$IndexationToggle({
        source: params.source,
        website: params.website,
      })
    )
  },
  onAddWebsite: () => {
    dispatch(actions.websites.$WebsiteCreateModal())
  },
  onClickKeys: (params: { website: WebsiteEntity }) => {
    dispatch(
      actions.websites.setCredentialsIsOpen({
        value: true,
        website: params.website,
      })
    )
  },
  onClickSitemap: (params: { website: WebsiteEntity }) => {
    dispatch(
      actions.websites.$openSitemapModal({ websiteId: params.website.id })
    )
  },
  onSeeDetails: (params: { website: WebsiteEntity }) => {
    dispatch(actions.websites.navigateOrShowModal(params.website))
  },

  onDelete(websiteId: string) {
    dispatch(actions.websites.$DeleteConfirmModalOpen({ websiteId }))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
