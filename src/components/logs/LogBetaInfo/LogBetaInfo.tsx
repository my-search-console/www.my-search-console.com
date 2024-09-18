import React from "react"
import { getCrispUrl } from "../../../utils/crisp"
import { FormattedMessage } from "../../general/FormattedMessage/FormattedMessage"
import { connector, ContainerProps } from "./containers/LogBetaInfo.container"

const Wrapper: React.FC<ContainerProps> = (props) => {
  return (
    <div className="bg-amber-50 text-sm  border border-amber-100 p-4 rounded-md">
      <p className="text-amber-900 font-display">
        <FormattedMessage id="logs/beta/title" />
      </p>

      <p className="text-amber-700">
        <FormattedMessage id="logs/beta/description" />
      </p>
      <p className="text-amber-700">
        <a
          href={getCrispUrl(props.user)}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          <FormattedMessage id="logs/beta/feedback" />
        </a>
      </p>
    </div>
  )
}

export const LogBetaInfo = connector(Wrapper)
