import { ReactNode } from "react"
import { connect, ConnectedProps } from "react-redux"
import { actions } from "../../../../redux/actions"
import { RootState } from "../../../../redux/store"

const mapState = (state: RootState) => {
  const website = state.websites.map.get(state.websites.activeWebsite || "")

  return {
    connectedWithGoogle: true,
    connectedWithBing: Boolean(website?.bing_domain),
    connectedWithYandex: Boolean(website?.yandex_domain),
  }
}

const mapDispatch = (dispatch: any) => ({
  onClick: (source: "yandex" | "bing") => {
    dispatch(actions.websites.$linkSourceToWebsite(source))
  },
})

export const connector = connect(mapState, mapDispatch)
export type ContainerProps = ConnectedProps<typeof connector>
