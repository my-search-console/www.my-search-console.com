import type { GatsbyConfig } from "gatsby"
import path from "path"

const URL = "https://www.my-search-console.com"

const config: GatsbyConfig = {
  siteMetadata: {
    url: URL,
    siteUrl: URL,
    favicon: `/favicon.png`,
    author: "Kevin Marques",
    image: "/og/en.jpg",
    twitterUsername: "KM_Marques",
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    `gatsby-transformer-json`,
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/assets/logo/icon.png",
        name: `My Search Console`,
        short_name: `My Search Console`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#fbcfe8`,
        display: `standalone`,
      },
    },

    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",

    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `./cms/pages`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "news",
        path: `./cms/news`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: "./src/assets/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: "./cms/assets/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${path.resolve(__dirname)}/src/admin/index.tsx`,
        manualInit: true,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: require("./src/robots").concat(["no-index"]),
        createLinkInHead: false,
        entryLimit: 5000,
        resolveSiteUrl: () => URL,
        resolvePages: ({ allSitePage: { nodes: allPages } }) => {
          return allPages.map((page) => {
            if (page.path.endsWith("]/")) {
              return { path: "no-index" }
            }

            if (page.path.includes("administration")) {
              return { path: "no-index" }
            }

            if (page.path.includes("authentication")) {
              return { path: "no-index" }
            }

            if (page.path.includes("/user/")) {
              return { path: "no-index" }
            }

            if (page?.pageContext?.meta?.indexable === false)
              return { path: "no-index" }

            return { ...page, lastmod: page.updated_at }
          })
        },
        filterPages: ({ path }) => {
          if (path.includes("administration")) return true
          if (path.includes("upsell")) return true
          if (path.includes("no-index")) return true
          return false
        },
        serialize: (props) => {
          return {
            url: props.path,
            lastmod: props.pageContext.updated_at,
            priority: props.pageContext.updated_at ? 1 : 1,
          }
        },
        query: `
        {
          allSitePage {
            nodes {
              path
              pageContext
            }
          }
        }
      `,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/assets/logo/icon.png",
        name: `Foudroyer`,
        short_name: `Foudroyer`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#fbcfe8`,
        display: `standalone`,
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: "./src/assets/",
      },
      __key: "assets",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-plugin-posthog`,
      options: {
        // Specify the API key for your Posthog Project (required)
        apiKey: "phc_S12kKoz6D9mIV2wfp0MQpcMEUDGsHOiCjM5edIEHW8s",
        // Specify the app host if self-hosting (optional, default: https://app.posthog.com)
        apiHost: "https://eu.i.posthog.com",
        // Puts tracking script in the head instead of the body (optional, default: true)
        head: true,
        // Enable posthog analytics tracking during development (optional, default: false)
        isEnabledDevMode: true,
        // Pass custom variables to posthog.init() (optional)
        initOptions: {
          person_profiles: "identified_only",
          loaded: (posthog) => {
            posthog.debug() // debug mode in development
          },
        },
      },
    },
  ],
}

if (process.env.NODE_ENV === "production") {
  config.plugins?.push({
    resolve: "@sentry/gatsby",
    options: {
      dsn: "https://f6d6eb4963584afc93e51f7d3136b07e@o1172147.ingest.sentry.io/6267024",
    },
  })
}

export default config
