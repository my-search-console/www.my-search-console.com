import { BellAlertIcon, BellIcon } from "@heroicons/react/24/outline"
import dayjs from "dayjs"
import React, { useEffect } from "react"
import { useNews } from "../NewsModal/NewsModal"
import { connector, ContainerProps } from "./containers/NewsButton.container"

export const Wrapper: React.FC<{
  onClick: () => void
  onMount: () => void
  lastTimeOpenNewsModal: Date | null
}> = (props) => {
  useEffect(() => {
    props.onMount()
  }, [])

  const news = useNews()
  const lastNewsPublishedAt = news[0].published_at
  const shouldShowAlert = dayjs(
    props.lastTimeOpenNewsModal || new Date("2020-01-01")
  ).isBefore(lastNewsPublishedAt)

  return (
    <div className="relative">
      <button
        className="inline-flex cursor-pointer items-center justify-center rounded p-2 text-slate-900 transition duration-300 ease-in-out   hover:bg-pink-50  hover:text-pink-500 focus:outline-none"
        onClick={props.onClick}
      >
        {shouldShowAlert && (
          <>
            <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-pink-400"></div>
            <BellAlertIcon className="h-6 w-6" />
          </>
        )}
        {!shouldShowAlert && (
          <>
            <BellIcon className="h-6 w-6" />
          </>
        )}
      </button>
    </div>
  )
}

const Connected: React.FC<ContainerProps> = (props) => <Wrapper {...props} />

export const NewsButton = connector(Connected)
