import React from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { Text } from "./Text"
import { Code } from "./Code"

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
