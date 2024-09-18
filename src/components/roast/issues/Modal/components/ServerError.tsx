import React from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { Code } from "./Code"
import { Text } from "./Text"

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
