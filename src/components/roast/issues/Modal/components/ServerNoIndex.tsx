import React from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { Code } from "./Code"
import { Text } from "./Text"

export const ServerNoIndex: React.FC<{ context: any }> = (props) => (
  <>
    <Text>
      <FormattedMessage id={`issues/modal/error/description/server/no-index`} />
    </Text>

    <Code>
      <div>{`<meta name="robots" content="all">`}</div>
    </Code>
  </>
)
