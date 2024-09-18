import React from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { Code } from "./Code"
import { Text } from "./Text"

export const SitemapServerError: React.FC<{ context: any }> = (props) => (
  <>
    <Text>
      <FormattedMessage
        id={`issues/modal/error/description/sitemap/server-error`}
      />
    </Text>

    <Code>
      <div>{props.context.sitemapUrl}</div>
      {/* <div>Error code: {props.context.errorCode}</div> */}
    </Code>
  </>
)
