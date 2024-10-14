import React from "react"
import { Navbar } from "../components/general/Navbar/Navbar"
import { Notifications } from "../components/general/Notifications/Notifications"
import { Seo } from "../components/general/Seo/Seo"
import { Video } from "../components/general/Video/Video"
import { ArticleTitle } from "../components/marketing/ArticleTitle/ArticleTitle"
import { Author } from "../components/marketing/Author/Author"
import { Faq } from "../components/marketing/Faq/Faq"
import { Features } from "../components/marketing/Features/Features"
import { Footer } from "../components/marketing/Footer"
import { Hero } from "../components/marketing/Hero/Hero"
import { Mdx } from "../components/marketing/Mdx/Mdx"
import { PricingLanding } from "../components/marketing/Pricing/Pricing"
import { Testimonials } from "../components/marketing/Testimonials/Testimonials"
import { Text } from "../components/marketing/Text/Text"
import { Title } from "../components/marketing/Title/Title"
import { Toc } from "../components/marketing/Toc/Toc"
import SpreadPage from "../components/spread/SpreadPage/SpreadPage"
import {
  ArticleEntity,
  ArticleTOC,
  ArticleTypes,
} from "../entities/ArticleEntity"
import { slugifyForAnchors } from "../utils/normalizeUrl"

const getTableOfContentItems = (
  content: ArticleEntity["content"]
): ArticleTOC["items"] => {
  return content
    .filter(({ type }) => type === ArticleTypes.TITLE)
    .map((item: any) => ({
      label: item.value,
      to: `#${slugifyForAnchors(item.value)}`,
      depth: Number(item.component.replace("h", "")) - 2,
    }))
}

function Page(props) {
  return (
    <div className="antialiased">
      <Seo
        title={props.pageContext.meta.title}
        description={props.pageContext.meta.description}
        lang={props.pageContext.langKey}
        image={`/og/${props.pageContext.langKey}-banner.jpg`}
        langUrls={[]}
      />

      <Navbar />

      {props.pageContext.content.map((content, index) => {
        if (content.type === "marketing/hero")
          return (
            <Hero
              key={index}
              label={content.label.value}
              title={content.title.value}
              description={content.description}
              nbUsers={content.nbUsers}
            />
          )
        if (content.type === "marketing/show-off")
          return <SpreadPage key={index} />

        if (content.type === "marketing/title")
          return <Title key={index} title={content.title.value} />

        if (content.type === "marketing/text")
          return <Text key={index} value={content.value} />

        if (content.type === "marketing/video")
          return (
            <Video
              key={index}
              src={content.src.publicURL}
              illustration={content.illustration}
              alt={content.alt}
              autoplay={content.autoplay}
            />
          )

        if (content.type === "marketing/author")
          return (
            <Author
              key={index}
              illustration={content.illustration}
              name={content.name}
            />
          )

        if (content.type === "marketing/pricing")
          return <PricingLanding key={index} />

        if (content.type === "marketing/features")
          return (
            <Features
              key={index}
              title={content.title}
              description={content.description}
              label={content.label}
              features={content.features}
              invert={!Boolean(index % 2)}
            />
          )

        if (content.type === "marketing/testimonials")
          return <Testimonials key={index} />

        if (content.type === "marketing/faq") return <Faq key={index} />

        if (content.type === ArticleTypes.RICH_TEXT)
          return <Mdx key={index}>{content.content}</Mdx>

        if (content.type === ArticleTypes.TITLE)
          return <ArticleTitle key={index} {...content} />

        if (content.type === ArticleTypes.TOC)
          return (
            <Toc
              key={index}
              {...content}
              items={getTableOfContentItems(props.pageContext.content)}
            />
          )

        return content.type
      })}

      <Notifications />
      <Footer />
    </div>
  )
}

export default Page
