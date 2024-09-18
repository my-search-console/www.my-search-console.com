import React from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { Code } from "./Code"
import { Text } from "./Text"

export const RobotsJavascript: React.FC<{ context: any }> = () => (
  <>
    <Text>
      <FormattedMessage id={`issues/modal/error/description/robots/empty`} />
    </Text>

    <Code>
      <div>/.json$</div>
      <div>/.js$</div>
    </Code>
  </>
)
