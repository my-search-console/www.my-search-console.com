import React from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { Text } from "./Text"
import { Code } from "./Code"

export const RobotsEmpty: React.FC<{ context: any }> = () => (
  <>
    <Text>
      <FormattedMessage id={`issues/modal/error/description/robots/empty`} />
    </Text>

    <Code>
      <div>User-agent: *</div>
      <div>Allow: /</div>
      <div>Sitemap: https://www.example.com/sitemap.xml</div>
    </Code>
  </>
)
