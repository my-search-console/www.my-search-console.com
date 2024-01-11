import React from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { Text } from "./Text"
import { Code } from "./Code"

export const ServerError: React.FC<{ context: any }> = (props) => (
  <>
    <Text>
      <FormattedMessage id={`issues/modal/error/description/server/error`} />
    </Text>

    <Code>
      <div>{props.context.siteUrl}</div>
      <div>Error: {props.context.errorCode}</div>
    </Code>
  </>
)
