import React from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { Text } from "./Text"

export const RobotsCrawlAllowed: React.FC<{ context: any }> = () => (
  <>
    <Text>
      <FormattedMessage
        id={`issues/modal/error/description/robots/crawl-allowed`}
      />
    </Text>
  </>
)
