import React from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { Text } from "./Text"

export const SitemapNoSitemap: React.FC<{ context: any }> = (props) => (
  <>
    <Text>
      <FormattedMessage
        id={`issues/modal/error/description/sitemap/no-sitemap`}
      />
    </Text>
  </>
)
