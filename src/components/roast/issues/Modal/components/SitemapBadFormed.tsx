import React from "react"
import { FormattedMessage } from "../../../../general/FormattedMessage/FormattedMessage"
import { Text } from "./Text"
import { Code } from "./Code"

export const SitemapBadFormed: React.FC<{ context: any }> = (props) => (
  <>
    <Text>
      <FormattedMessage
        id={`issues/modal/error/description/sitemap/bad-formed`}
      />
    </Text>

    <Code>
      <div>{props.context.sitemapUrl}</div>
    </Code>

    <a
      className="text-sm text-blue-500 hover:underline"
      target="_blank"
      href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview"
    >
      https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
    </a>
  </>
)
