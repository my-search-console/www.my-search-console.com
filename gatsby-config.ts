import type { GatsbyConfig } from "gatsby"
import path from "path"
import {
  MIXPANEL_DEVELOPMENT_API_KEY,
  MIXPANEL_HOST,
  MIXPANEL_PRODUCTION_API_KEY,
} from "./src/constants/mixpanel"

const URL = "https://www.foudroyer.com"

const MIXPANEL_API_KEY =
  process.env.NODE_ENV === "production"
    ? MIXPANEL_PRODUCTION_API_KEY
    : MIXPANEL_DEVELOPMENT_API_KEY

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
        name: "pages",
        path: `./cms/pages`,
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

            if (page?.pageContext?.meta?.indexable === false)
              return { path: "no-index" }

            return { ...page }
          })
        },
        filterPages: ({ path }) => {
          if (path.includes("administration")) return true
          if (path.includes("upsell")) return true
          if (path.includes("no-index")) return true
          return false
        },
        serialize: ({ path, lastmod }) => {
          return {
            url: path,
            lastmod,
            priority: lastmod ? 1 : 1,
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
      resolve: `gatsby-plugin-umami`,
      options: {
        websiteId: "74cd50e0-f967-42c1-abd5-ccb69a83a403",
        srcUrl: "https://analytics.eu.umami.is/script.js",
        includeInDevelopment: false,
        autoTrack: true,
        respectDoNotTrack: true,
        dataCache: false,
      },
    },

    {
      resolve: "gatsby-plugin-mixpanel",
      options: {
        apiToken: MIXPANEL_API_KEY,
        mixpanelConfig: {
          api_host: MIXPANEL_HOST,
          debug: process.env.NODE_ENV === "production" ? false : true,
          persistence: "localStorage",
        },
        pageViews: "all",
        trackPageViewsAs: "Page View",
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
