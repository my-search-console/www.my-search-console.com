import { WebsiteEntity } from "@foudroyer/interfaces/dist/entities/WebsiteEntity"
import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => ({
  websites: state.websites.entities.map((id) =>
    state.websites.map.get(id)
  ) as WebsiteEntity[],
  fetching: state.websites.fetching,
  plan: state.payments.actualIndexationPlan,
})

const mapDispatch = (dispatch: any) => ({
  onDisplay: () => {
    dispatch(
      actions.websites.$fetchAll({
        force: true,
      })
    )
  },

  onAddWebsite: () => {
    dispatch(actions.websites.$WebsiteCreateModal())
  },

  onSeeDetails: (params: { website: WebsiteEntity }) => {
    dispatch(actions.websites.navigateOrShowModal(params.website))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
