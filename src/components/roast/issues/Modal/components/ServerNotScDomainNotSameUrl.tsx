import React from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { Text } from "./Text"

export const ServerNotScDomainNotSameUrl: React.FC<{ context: any }> = (
  props
) => (
  <>
    <Text>
      <FormattedMessage
        id={`issues/modal/error/description/server/not-sc-domain/not-same-url`}
      />
    </Text>

    {/* <Code>
      <div>Google Search Domain: {props.context.scDomain}</div>
      <div>The real domain: {props.context.siteUrl}</div>
    </Code> */}
  </>
)
