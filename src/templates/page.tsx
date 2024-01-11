import React from "react"
import { Hero } from "../components/marketing/Hero/Hero"
import { Navbar } from "../components/general/Navbar/Navbar"
import { Title } from "../components/marketing/Title/Title"
import { Video } from "../components/general/Video/Video"
import { Text } from "../components/marketing/Text/Text"
import { Seo } from "../components/general/Seo/Seo"
import { Footer } from "../components/marketing/Footer"
import { Author } from "../components/marketing/Author/Author"
import { PricingLanding } from "../components/marketing/Pricing/Pricing"
import { Features } from "../components/marketing/Features/Features"
import { Faq } from "../components/marketing/Faq/Faq"
import { Testimonials } from "../components/marketing/Testimonials/Testimonials"
import { ScopeNotFoundModal } from "../components/general/ScopeNotFoundModal/ScopeNotFoundModal"
import { Notifications } from "../components/general/Notifications/Notifications"
import { PremiumModal } from "../components/payment/PremiumModal/PremiumModal"
import { NewsModal } from "../components/general/News/components/NewsModal/NewsModal"

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

        return content.type
      })}

      <ScopeNotFoundModal />
      <PremiumModal />
      <Notifications />
      <Footer />
    </div>
  )
}

export default Page
