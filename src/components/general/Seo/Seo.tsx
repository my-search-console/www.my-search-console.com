import { useLocation } from "@reach/router"
import { graphql, useStaticQuery } from "gatsby"
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"

type Breadcrumb = { label: string; url: string }

const getBreadcrumb = (breadcrumbs: Breadcrumb[], endpoint) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map(({ label, url }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: label,
      item: `${endpoint}${url}`,
    })),
  }
}

export type FAQType = { question: string; answer: string }

export const getFaq = (faqs: FAQType[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }, index) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  }
}

export const Seo: React.FC<{
  title: string
  description: string
  image?: string
  imageExternal?: boolean
  lang: string
  article?: boolean
  breadcrumbs?: Array<Breadcrumb>
  index?: boolean
  faq?: FAQType[] | null
  langUrls: Array<{ lang: string; url: string; isDefault: boolean }>
}> = ({
  title,
  description,
  image,
  faq,
  breadcrumbs,
  index = true,
  lang,
  langUrls,
  ...props
}) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(query)
  const { siteUrl, favicon, defaultImage, twitterUsername } = site.siteMetadata
  const [loaded, setLoaded] = useState(false)

  const seo = {
    title,
    favicon: favicon,
    description: description,
    image: `https://api.my-search-console.com/og/?url=${siteUrl}${pathname}`,
    url: `${siteUrl}${pathname}`,
  }

  const defaultLangUrl = langUrls.find((lang) => lang.isDefault === true)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <Helmet title={seo.title} htmlAttributes={{ lang }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {langUrls.map(({ lang, url }) => (
        <link rel="alternate" hrefLang={lang} href={siteUrl + url} key={lang} />
      ))}

      <link
        rel="alternate"
        hrefLang={"x-default"}
        href={siteUrl + defaultLangUrl?.url}
      />

      <meta name="theme-color" content="#fbcfe8" />

      <link rel="icon" href={seo.favicon} />

      <meta name="viewport" content="width=device-width, user-scalable=no" />

      <meta name="description" content={seo.description} />

      <meta name="image" content={seo.image} />
      <meta property="og:image" content={seo.image} />
      <meta name="twitter:image" content={seo.image} />

      {seo.url && <meta property="og:url" content={seo.url} />}

      {seo.title && <meta property="og:title" content={seo.title} />}

      {!index && <meta name="robots" content="noindex" />}

      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}

      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />

      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}

      {seo.title && <meta name="twitter:title" content={seo.title} />}

      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}

      {breadcrumbs && (
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumb(breadcrumbs, siteUrl))}
        </script>
      )}

      {faq && (
        <script type="application/ld+json">
          {JSON.stringify(getFaq(faq))}
        </script>
      )}

      <script defer src="https://cdn.paddle.com/paddle/paddle.js"></script>

      {loaded && (
        <script
          async
          type="text/javascript"
          src="https://static.senja.io/dist/platform.js"
        ></script>
      )}

      {loaded && (
        <script
          async
          src="https://cdn.tolt.io/tolt.js"
          data-tolt="b7898a88-b136-4b52-bbce-97b7b78df3c5"
        ></script>
      )}
    </Helmet>
  )
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl: url
        defaultImage: image
        twitterUsername
        favicon
      }
    }
  }
`
