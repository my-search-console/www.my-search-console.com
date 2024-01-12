const path = require("path")
const languages = require("./src/constants/languages.json")

const PageTemplate = path.resolve(`./src/templates/page.tsx`)
const Administration = path.resolve(`./src/templates/administration.tsx`)
const PricingUpsell = path.resolve(`./src/templates/upsell.tsx`)

const axios = require("axios")

// const ShowOffGetNumberOfDownloadsFromUmami = async () => {
//   return axios.default
//     .get(
//       `https://api.umami.is/v1/event-data/fields?websiteId=74cd50e0-f967-42c1-abd5-ccb69a83a403&startAt=0&endAt=${new Date().getTime()}`,
//       {
//         headers: {
//           "x-umami-api-key": "ArSF73b6uLZell8JVjeYQF4tZ4CWvuQ4",
//         },
//       }
//     )
//     .then(({ data }) => {
//       return data.map(({ total, fieldValue }) => ({
//         gptId: fieldValue,
//         count: total,
//       }))
//     })
//     .catch((e) => {
//       return 10
//     })
// }

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const nbUsers = await axios
    .get(
      process.env.NODE_ENV === "production"
        ? "https://api.foudroyer.com/stats/users/total"
        : "http://localhost:8080/stats/users/total"
    )
    .then((res) => res.data)
    .catch((err) => {
      return 6000
    })

  languages.forEach(({ id }) => {
    createPage({
      path: id === "en" ? "/pricing/upsell/" : `/${id}/pricing/upsell/`,
      component: PricingUpsell,
      context: {
        langKey: id,
        languages,
        canonicals: languages.map((lang) => {
          if (lang.id === "en")
            return {
              lang: lang.id,
              label: lang.label,
              url: "/pricing/upsell/",
              isDefault: true,
            }

          return {
            lang: lang.id,
            url: `/${id}/pricing/upsell/`,
            label: lang.label,
            isDefault: false,
          }
        }),
      },
    })
  })

  languages.forEach(({ id }) => {
    createPage({
      path: id === "en" ? "/administration/" : `/${id}/administration/`,
      component: Administration,
      context: {
        langKey: id,
        languages,
        canonicals: languages.map((lang) => {
          if (lang.id === "en")
            return {
              lang: lang.id,
              label: lang.label,
              url: `/administration/`,
              isDefault: true,
            }

          return {
            lang: lang.id,
            url: `/${lang.id}/administration/`,
            label: lang.label,
            isDefault: false,
          }
        }),
      },
    })
  })

  const result = await graphql(
    `
      {
        pages: allPagesJson {
          nodes {
            id
            meta {
              description
              indexable
              title
            }
            content {
              ... on MarketingHero {
                description
                type
                title {
                  component
                  value
                }
                label {
                  component
                  value
                }
                buttons {
                  label
                  rel
                  target
                  theme
                  url
                }
              }
              ... on MarketingTitle {
                __typename
                title {
                  component
                  value
                }
                type
              }
              ... on MarketingText {
                __typename
                value
                type
              }

              ... on MarketingFeatures {
                description
                type
                title {
                  value
                  component
                }
                label {
                  component
                  value
                }
                features {
                  title {
                    component
                    value
                  }
                  description
                  video {
                    alt
                    autoplay
                    src {
                      publicURL
                    }
                    illustration {
                      childImageSharp {
                        gatsbyImageData(
                          width: 800
                          placeholder: BLURRED
                          formats: [AUTO, WEBP]
                        )
                      }
                    }
                  }
                }
              }

              ... on MarketingVideo {
                __typename
                type
                alt
                autoplay
                src {
                  publicURL
                }
                illustration {
                  childImageSharp {
                    gatsbyImageData(
                      width: 1200
                      placeholder: BLURRED
                      formats: [AUTO, WEBP]
                    )
                  }
                }
              }

              ... on MarketingAuthor {
                name
                type
                illustration {
                  alt
                  src {
                    childImageSharp {
                      gatsbyImageData(
                        width: 100
                        placeholder: BLURRED
                        formats: [AUTO, WEBP]
                      )
                    }
                  }
                }
              }

              ... on MarketingPricing {
                __typename
                type
                show
              }

              ... on MarketingTestimonials {
                __typename
                type
                show
              }

              ... on MarketingFaq {
                __typename
                type
                show
              }
            }
            lang
            published_at
            updated_at
            url
            type
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const pages = result.data.pages.nodes.map((page) => {
    return {
      ...page,
      content: page.content.map((content) => {
        if (content.type === "marketing/hero") {
          return {
            ...content,
            nbUsers: nbUsers,
          }
        }
        return content
      }),
    }
  })

  const normalize = (lang, url) => {
    const isHome = url === "home"

    if (isHome) {
      if (lang === "en") return `/`
      return `/${lang}/`
    }

    if (lang === "en") return `/${url}/`
    return `/${lang}/${url}/`
  }

  pages.forEach((page) => {
    createPage({
      path: normalize(page.lang, page.url),
      component: PageTemplate,
      context: {
        langKey: page.langKey,
        languages,
        canonicals: pages
          .filter(({ url, lang }) => {
            return page.url === url
          })
          .map(({ url, lang }) => {
            return {
              lang,
              url: normalize(lang, url),
              isDefault: lang === "en",
            }
          }),
        meta: page.meta,
        content: page.content,
      },
    })
  })
}

module.exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  createTypes([
    `
    type Global__Cms__Link {
      label: String
      url: String
      target: String
      rel: String
    }

    type Global__Meta__Seo {
      title: String
      description: String
      indexable: Boolean
      image: Global__Cms__Image
    }

    type Global__Cms__Image {
      src: File @fileByRelativePath
      alt: String
    }
    `,

    schema.buildObjectType({
      name: "Fields",
      fields: {
        slug: "String",
        type: "String",
      },
    }),

    schema.buildObjectType({
      name: "TextWithHtmlTag",
      fields: {
        value: "String",
        component: "String",
      },
    }),

    schema.buildObjectType({
      name: "Frontmatter",
      fields: {
        type: "String",
      },
    }),

    // CMS
    schema.buildObjectType({
      name: "MarketingCloud",
      fields: {
        type: "String!",
        label: "TextWithHtmlTag",
        title: "TextWithHtmlTag",
        description: "String",
        cloud: "[Global__Cms__Image]",
      },
    }),

    schema.buildObjectType({
      name: "MarketingHeroButton",
      fields: {
        theme: "String",
        label: "String",
        url: "String",
        target: "String",
        rel: "String",
      },
    }),

    schema.buildObjectType({
      name: "MarketingHero",
      fields: {
        type: "String!",
        label: "TextWithHtmlTag",
        title: "TextWithHtmlTag",
        image: "Global__Cms__Image",
        description: "String",
        buttons: "[MarketingHeroButton]",
      },
    }),

    schema.buildObjectType({
      name: "MarketingTitle",
      fields: {
        type: "String!",
        title: "TextWithHtmlTag",
      },
    }),

    schema.buildObjectType({
      name: "MarketingText",
      fields: {
        type: "String!",
        value: "String",
      },
    }),

    schema.buildObjectType({
      name: "MarketingAuthor",
      fields: {
        type: "String!",
        name: "String",
        illustration: "Global__Cms__Image",
      },
    }),

    schema.buildObjectType({
      name: "MarketingDiscover",
      fields: {
        type: "String!",
        label: "TextWithHtmlTag",
        title: "TextWithHtmlTag",
        image: "Global__Cms__Image",
        description: "String",
        to: "Global__Cms__Link",
      },
    }),

    `type ArticleContentVideo {
      type:  String!
      src: File @fileByRelativePath
      ring: String
      illustration: File @fileByRelativePath
      alt: String
      autoplay: Boolean
    }`,

    `
    
    type MarketingVideo {
      type:  String!
      src: File @fileByRelativePath
      illustration: File @fileByRelativePath
      alt: String
      autoplay: Boolean
    }
    
    type GlobalVideo {
      src: File @fileByRelativePath
      illustration: File @fileByRelativePath
      alt: String
      autoplay: Boolean
    }
    `,

    `type ArticleRecipeIngredientItem {
      value: String
      quantity: Int
      weight: String
      url: String
    }`,

    `type ArticleRecipeIngredient {
      portions: Int
      items: [ArticleRecipeIngredientItem]
    }`,

    `type ArticleRecipeToolItem {
      value: String
      quantity: Int
      url: String
    }`,

    `type ArticleRecipeStep {
      content: String
      name: String
      illustration: Global__Cms__Image
    }`,

    schema.buildObjectType({
      name: "ArticleRecipe",
      fields: {
        type: "String!",
        name: "String",
        calories: "Int",
        description: "String",
        illustration: "Global__Cms__Image",
        difficulty: "String",
        preparationDuration: "Int",
        cookDuration: "Int",
        recipeCuisine: "String",
        recipeCategory: "String",
        keywords: "String",
        ingredients: "ArticleRecipeIngredient",
        tools: "[ArticleRecipeToolItem]",
        steps: "[ArticleRecipeStep]",
      },
    }),

    `
    type Faq {
      question: String
      answer: String
      component: String
    }

    type MarketingFaqCta {
      visible: Boolean
      title: TextWithHtmlTag
      description: String
      button: Global__Cms__Link
    }

    type MarketingContactInlineItem {
      type: String
      label: String
      description: String
      information: String
    }
    `,

    schema.buildObjectType({
      name: "MarketingContactInline",
      fields: {
        type: "String!",
        informations: "[MarketingContactInlineItem]",
      },
    }),

    schema.buildObjectType({
      name: "MarketingFaq",
      fields: {
        type: "String!",
        title: "TextWithHtmlTag",
        label: "TextWithHtmlTag",
        description: "String",
        items: "[Faq]",
        cta: "MarketingFaqCta",
      },
    }),

    schema.buildObjectType({
      name: "MarketingPricing",
      fields: {
        type: "String!",
        show: "Boolean",
      },
    }),

    schema.buildObjectType({
      name: "MarketingTestimonials",
      fields: {
        type: "String!",
        show: "Boolean",
      },
    }),

    schema.buildObjectType({
      name: "MarketingFaq",
      fields: {
        type: "String!",
        show: "Boolean",
      },
    }),

    `type MarketingNewsletterInput {
      placeholder: String
      method: String
      action: String
    }`,

    schema.buildObjectType({
      name: "MarketingNewsletter",
      fields: {
        type: "String!",
        title: "TextWithHtmlTag",
        description: "String",
        button: "String",
        input: "MarketingNewsletterInput",
      },
    }),

    // schema.buildObjectType({
    //   name: "MarketingCategory",
    //   fields: {
    //     type: "String!",
    //     title: "TextWithHtmlTag",
    //     description: "String",
    //     more: "Global__Cms__Link",
    //     category: {
    //       type: "CategoriesJson",
    //       resolve: async (source, args, context, info) => {
    //         const found = await context.nodeModel.findOne({
    //           type: "CategoriesJson",
    //           query: {
    //             filter: {
    //               jsonId: { eq: source.category },
    //             },
    //           },
    //         })

    //         return found
    //       },
    //     },
    //     nbArticles: "Int",
    //   },
    // }),

    // schema.buildObjectType({
    //   name: "ArticleProduct",
    //   fields: {
    //     type: "String!",
    //     product: {
    //       type: "ProductsJson",
    //       resolve: async (source, args, context, info) => {
    //         const found = await context.nodeModel.findOne({
    //           type: "ProductsJson",
    //           query: {
    //             filter: {
    //               jsonId: { eq: source.product },
    //             },
    //           },
    //         })

    //         return found
    //       },
    //     },
    //   },
    // }),

    // schema.buildObjectType({
    //   name: "ArticleToArticle",
    //   fields: {
    //     type: "String!",
    //     article: {
    //       type: "ArticlesJson",
    //       resolve: async (source, args, context, info) => {
    //         const found = await context.nodeModel.findOne({
    //           type: "ArticlesJson",
    //           query: {
    //             filter: {
    //               jsonId: { eq: source.article },
    //             },
    //           },
    //         })

    //         return found
    //       },
    //     },
    //   },
    // }),

    `
    type MarketingRelatedArticlesItem {
      id: String
    }
    `,

    schema.buildObjectType({
      name: "MarketingFeature",
      fields: {
        description: "String",
        title: "TextWithHtmlTag",
        video: "GlobalVideo",
      },
    }),

    schema.buildObjectType({
      name: "MarketingFeatures",
      fields: {
        type: "String!",
        label: "TextWithHtmlTag",
        title: "TextWithHtmlTag",
        description: "String",
        features: "[MarketingFeature]",
      },
    }),

    schema.buildObjectType({
      name: "MarketingRelatedArticles",
      fields: {
        type: "String!",
        title: "TextWithHtmlTag",
        label: "TextWithHtmlTag",
        description: "String",
        articles: "[MarketingRelatedArticlesItem]",
      },
    }),

    schema.buildUnionType({
      name: `PageContent`,
      types: [
        `MarketingHero`,
        `MarketingTitle`,
        `MarketingText`,
        `MarketingAuthor`,
        "MarketingVideo",
        "MarketingPricing",
        "MarketingFeatures",
        "MarketingFaq",
        "MarketingTestimonials",
        // `MarketingCloud`,
        // "MarketingDiscover",
        // "MarketingFaq",
        // "MarketingCategory",
        // "MarketingNewsletter",
        // "MarketingRelatedArticles",
        // "MarketingContactInline",

        `ArticleContentRichText`,
        // `ArticleContentVideo`,
        `ArticleToc`,
        `ArticleContentImage`,
        "ArticleContentTitle",
        // "ArticleQuote",
      ],
      resolveType: (value) => {
        if (value.type === "marketing/hero") return "MarketingHero"
        if (value.type === "marketing/title") return "MarketingTitle"
        if (value.type === "marketing/text") return "MarketingText"
        if (value.type === "marketing/author") return "MarketingAuthor"
        if (value.type === "marketing/video") return "MarketingVideo"
        if (value.type === "marketing/pricing") return "MarketingPricing"
        if (value.type === "marketing/testimonials")
          return "MarketingTestimonials"
        if (value.type === "marketing/features") return "MarketingFeatures"
        if (value.type === "marketing/faq") return "MarketingFaq"
        // if (value.type === "marketing/cloud") return "MarketingCloud"
        // if (value.type === "marketing/discover") return "MarketingDiscover"
        // if (value.type === "marketing/faq") return "MarketingFaq"
        // if (value.type === "marketing/category") return "MarketingCategory"
        // if (value.type === "marketing/newsletter") return "MarketingNewsletter"
        // if (value.type === "marketing/related-articles")
        //   return "MarketingRelatedArticles"
        // if (value.type === MarketingTypes.CONTACT_INLINE)
        //   return "MarketingContactInline"

        if (value.type === "article/rich_text") return "ArticleContentRichText"
        // if (value.type === "article/video") return "ArticleContentVideo"
        if (value.type === "article/title") return "ArticleContentTitle"
        if (value.type === "article/image") return "ArticleContentImage"
        if (value.type === "article/toc") return "ArticleToc"
        // if (value.type === "article/quote") return "ArticleQuote"
        // if (value.type === "article/recipe") return "ArticleRecipe"

        throw new Error(
          `GraphQl/Schema/ResolveType: ${value.type} is not resolved`
        )
      },
    }),

    // schema.buildObjectType({
    //   name: "CmsNavigationHeaderTab",
    //   fields: {
    //     target: "String",
    //     rel: "String",
    //     url: "String",
    //     label: "String",
    //     theme: "String",
    //   },
    // }),

    // schema.buildObjectType({
    //   name: "HeaderJson",
    //   interfaces: ["Node"],
    //   fields: {
    //     type: "String",
    //     logo: "Global__Cms__Image",
    //     tabs: "[CmsNavigationHeaderTab]",
    //     right: "[CmsNavigationHeaderTab]",
    //   },
    // }),

    // schema.buildObjectType({
    //   name: "DrawerAction",
    //   fields: {
    //     rel: "String",
    //     url: "String",
    //     target: "String",
    //     label: "String",
    //     theme: "String",
    //   },
    // }),

    // schema.buildObjectType({
    //   name: "DrawerTab",
    //   fields: {
    //     rel: "String",
    //     url: "String",
    //     target: "String",
    //     label: "String",
    //   },
    // }),

    schema.buildObjectType({
      name: "PagesJson",
      interfaces: ["Node"],
      fields: {
        meta: "Global__Meta__Seo",
        type: "String",
        url: "String",
        lang: "String",
        updated_at: "Date",
        published_at: "Date",
        content: "[PageContent]",
      },
    }),

    // schema.buildObjectType({
    //   name: "CategoriesJson",
    //   interfaces: ["Node"],
    //   fields: {
    //     meta: "Global__Meta__Seo",
    //     type: "String",
    //     url: "String",
    //     id: "String",
    //     lang: "String",
    //     hidden: "Boolean",
    //     title: "String",
    //     description: "String",
    //     name: "String",
    //     updated_at: "Date",
    //     published_at: "Date",
    //   },
    // }),

    // schema.buildObjectType({
    //   name: "HomeJson",
    //   interfaces: ["Node"],
    //   fields: {
    //     id: "String",
    //     type: "String",
    //     lang: "String",
    //     title: "String",
    //     description: "String",
    //     tab: "String",
    //     meta: "Global__Meta__Seo",
    //     updated_at: "Date",
    //     published_at: "Date",
    //   },
    // }),

    // schema.buildObjectType({
    //   name: "ArticlesJson",
    //   interfaces: ["Node"],
    //   fields: {
    //     meta: "Global__Meta__Seo",
    //     type: "String",
    //     url: "String",
    //     version: "String",
    //     lang: "String",
    //     canonical: "String",
    //     id: "String",
    //     hidden: "Boolean",
    //     title: "String",
    //     description: "String",
    //     illustration: "Global__Cms__Image",
    //     updated_at: "Date",
    //     published_at: "Date",
    //     content: "[ArticleContent]",
    //     category: {
    //       type: "CategoriesJson",
    //       resolve: async (source, args, context, info) => {
    //         const found = await context.nodeModel.findOne({
    //           type: "CategoriesJson",
    //           query: {
    //             filter: {
    //               jsonId: { eq: source.category },
    //             },
    //           },
    //         })

    //         return found
    //       },
    //     },
    //     author: {
    //       type: "AuthorsJson",
    //       resolve: async (source, args, context, info) => {
    //         const found = await context.nodeModel.findOne({
    //           type: "AuthorsJson",
    //           query: {
    //             filter: {
    //               jsonId: { eq: source.author },
    //             },
    //           },
    //         })

    //         return found
    //       },
    //     },
    //   },
    // }),

    `
    type ProductsButtonsJson {
      url: String
      label: String
      theme: String
    }

    type ArticleContentImage {
      type:  String!
      src: File @fileByRelativePath
      alt: String
      legend: String
    }

    type ArticleContentRichText {
      type: String!
      content: String
    }

    type ArticleQuote {
      type: String!
      text: String
      author: String
    }

    type ArticleContentTitle {
      type: String!
      value: String
      component: String
      faq: Boolean
    }

    type ArticleToc {
      type: String!
      title: TextWithHtmlTag
    }

    type FooterNetwork {
      target: String
      url: String
      rel: String
      network: String
    }

    type FooterTab {
      label: String
      url: String
      rel: String
      target: String
    }

    type Footer {
      type: String!
      logo: Global__Cms__Image
      markup: String
      tabs: [FooterTab]
      networks: [FooterNetwork]
    }
    `,
  ])
}
