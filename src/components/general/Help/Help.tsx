import { UserEntity } from "@foudroyer/interfaces"
import { ChatBubbleLeftIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"
import React from "react"
import { getCrispUrl } from "../../../utils/crisp"
import { connector, ContainerProps } from "./containers/Help.container"

export const Wrapper: React.FC<{
  user: UserEntity | null
  forceShow?: boolean
}> = (props) => {
  if (!props.user && !props.forceShow) return <></>

  return (
    <a
      href={getCrispUrl(props.user)}
      className={classNames(
        "fixed bottom-8 right-8 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow"
      )}
      target="_blank"
      aria-label="Help link"
    >
      <ChatBubbleLeftIcon className="h-6 w-6" />
    </a>
  )
}

const Connected: React.FC<ContainerProps> = (props) => <Wrapper {...props} />

export const Help = connector(Connected)
