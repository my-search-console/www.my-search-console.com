import React from "react"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { LogItem } from "../LogItem/LogItem"
import { connector, ContainerProps } from "./containers/LogsList.container"

const Wrapper: React.FC<ContainerProps> = (props) => {
  return (
    <div className="relative mx-auto w-full grid-cols-1 gap-4 md:grid-cols-2">
      <button
        onClick={props.onOpen}
        className="w-full my-4 text-sm font-display rounded-md p-4 flex border-dashed border hover:bg-slate-50 border-slate-300 justify-center"
      >
        + <FormattedMessage id="logs/create/button" />
      </button>

      <div className="">
        <ul role="list" className="">
          {props.logs.map((log, index) => (
            <LogItem log={log} isLast={index === props.logs.length - 1} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const LogsList = connector(Container)
