import React from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { Text } from "./Text"
import { Code } from "./Code"

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
