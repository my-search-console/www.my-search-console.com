import React from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { Text } from "./Text"

export const ServerNotHttps: React.FC<{ context: any }> = (props) => (
  <>
    <Text>
      <FormattedMessage
        id={`issues/modal/error/description/server/not-https`}
      />
    </Text>
  </>
)
