import React from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { Text } from "./Text"
import { Code } from "./Code"

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
