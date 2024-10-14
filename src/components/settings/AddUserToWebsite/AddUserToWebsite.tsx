import { UserWithRoleEntity, WebsiteEntity } from "@foudroyer/interfaces"
import React from "react"
import { AddUserToWebsiteInput } from "./components/AddUserToWebsiteInput/AddUserToWebsiteInput"
import { AddUserToWebsiteList } from "./components/AddUserToWebsiteList/AddUserToWebsiteList"
import {
  connector,
  ContainerProps,
} from "./containers/AddUserToWebsite.container"

export const Wrapper: React.FC<{
  website: WebsiteEntity | null
  users: UserWithRoleEntity[]
  onClick: (website: WebsiteEntity | null) => void
}> = (props) => {
  return (
    <div>
      <AddUserToWebsiteInput />
      <AddUserToWebsiteList />
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const AddUserToWebsite = connector(Container)
