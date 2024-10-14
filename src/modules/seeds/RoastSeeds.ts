import { IssueNames, IssueTypes } from "../../entities/IssueEntity"
import { RoastWithReportEntity } from "../../entities/RoastEntity"

export const WebsitePremium: RoastWithReportEntity = {
  id: "www.sudoku.academy",
  url: "www.sudoku.academy",
  search_console_domain: "sudoku.academy",
  favicon:
    "https://www.sudoku.academy/favicon-32x32.png?v=db867b827bb53317e9978af476122ebc",
  indexation: [],
  robots: [],
  server: [],
  sitemap: [],
}

export const WebsiteForDemo: RoastWithReportEntity = {
  id: "www.japon-et-decouvertes.fr",
  search_console_domain: "www.japon-et-decouvertes.fr",
  url: "www.japon-et-decouvertes.fr",
  favicon: "https://www.japon-et-decouvertes.fr/favicon.svg",
  indexation: [],
  robots: [
    {
      updated_at: new Date(),
      created_at: new Date(),
      context: {},
      fk_website_id: "www.japon-et-decouvertes.fr",
      id: `${Math.random()}/${Date.now()}`,
      name: IssueNames["robots/crawl-allowed"],
      status: "dont-pass",
      type: IssueTypes.robots,
    },
    {
      updated_at: new Date(),
      created_at: new Date(),
      context: {},
      fk_website_id: "www.japon-et-decouvertes.fr",
      id: `${Math.random()}/${Date.now()}`,
      name: IssueNames["robots/empty"],
      status: "dont-pass",
      type: IssueTypes.robots,
    },
    {
      updated_at: new Date(),
      created_at: new Date(),
      context: {},
      fk_website_id: "www.japon-et-decouvertes.fr",
      id: `${Math.random()}/${Date.now()}`,
      name: IssueNames["robots/javascript"],
      status: "warning",
      type: IssueTypes.robots,
    },
  ],
  server: [
    {
      updated_at: new Date(),
      created_at: new Date(),
      context: {
        siteUrl: "https://www.japon-et-decouvertes.fr",
        errorCode: "400",
      },
      fk_website_id: "www.japon-et-decouvertes.fr",
      id: `${Math.random()}/${Date.now()}`,
      name: IssueNames["server/error"],
      status: "dont-pass",
      type: IssueTypes.server,
    },
    {
      updated_at: new Date(),
      created_at: new Date(),
      context: {},
      fk_website_id: "www.japon-et-decouvertes.fr",
      id: `${Math.random()}/${Date.now()}`,
      name: IssueNames["server/not-https"],
      status: "dont-pass",
      type: IssueTypes.server,
    },
    {
      updated_at: new Date(),
      created_at: new Date(),
      context: {
        scDomain: "https://japon-et-decouvertes.fr",
        siteUrl: "https://www.japon-et-decouvertes.fr",
      },
      fk_website_id: "www.japon-et-decouvertes.fr",
      id: `${Math.random()}/${Date.now()}`,
      name: IssueNames["server/not-sc-domain/not-same-url"],
      status: "dont-pass",
      type: IssueTypes.server,
    },
    {
      updated_at: new Date(),
      created_at: new Date(),
      context: {},
      fk_website_id: "www.japon-et-decouvertes.fr",
      id: `${Math.random()}/${Date.now()}`,
      name: IssueNames["server/not-sc-domain"],
      status: "warning",
      type: IssueTypes.server,
    },
    {
      updated_at: new Date(),
      created_at: new Date(),
      context: {},
      fk_website_id: "www.japon-et-decouvertes.fr",
      id: `${Math.random()}/${Date.now()}`,
      name: IssueNames["server/no-index"],
      status: "dont-pass",
      type: IssueTypes.server,
    },
  ],
  sitemap: [
    {
      updated_at: new Date(),
      created_at: new Date(),
      context: {},
      fk_website_id: "www.japon-et-decouvertes.fr",
      id: `${Math.random()}/${Date.now()}`,
      name: IssueNames["sitemap/no-sitemap"],
      status: "dont-pass",
      type: IssueTypes.sitemap,
    },
    {
      updated_at: new Date(),
      created_at: new Date(),
      context: {
        sitemapUrl: "https://www.japon-et-decouvertes.fr/sitemap.xml",
        errorCode: "500",
      },
      fk_website_id: "www.japon-et-decouvertes.fr",
      id: `${Math.random()}/${Date.now()}`,
      name: IssueNames["sitemap/server-error"],
      status: "dont-pass",
      type: IssueTypes.sitemap,
    },
    {
      updated_at: new Date(),
      created_at: new Date(),
      context: {},
      fk_website_id: "www.japon-et-decouvertes.fr",
      id: `${Math.random()}/${Date.now()}`,
      name: IssueNames["sitemap/bad-formed"],
      status: "dont-pass",
      type: IssueTypes.sitemap,
    },
    {
      updated_at: new Date(),
      created_at: new Date(),
      context: {},
      fk_website_id: "sitemap/hreflang-without-loc",
      id: `${Math.random()}/${Date.now()}`,
      name: IssueNames["sitemap/contains-external-url"],
      status: "dont-pass",
      type: IssueTypes.sitemap,
    },
    {
      updated_at: new Date(),
      created_at: new Date(),
      context: {},
      fk_website_id: "sitemap/contains-external-url",
      id: `${Math.random()}/${Date.now()}`,
      name: IssueNames["sitemap/hreflang-without-loc"],
      status: "dont-pass",
      type: IssueTypes.sitemap,
    },
    {
      updated_at: new Date(),
      created_at: new Date(),
      context: {},
      fk_website_id: "sitemap/contains-external-url",
      id: `${Math.random()}/${Date.now()}`,
      name: IssueNames["sitemap/no-same-website"],
      status: "dont-pass",
      type: IssueTypes.sitemap,
    },
  ],
}

export const WebsiteHaiku: RoastWithReportEntity = {
  ...WebsiteForDemo,
  id: "www.temple-du-haiku.fr",
  search_console_domain: "www.temple-du-haiku.fr",
  url: "www.temple-du-haiku.fr",
  favicon: "https://www.temple-du-haiku.fr/manifest/16x16.png",
}

export const WebsiteFoudroyer: RoastWithReportEntity = {
  ...WebsiteForDemo,
  id: "www.foudroyer.com",
  search_console_domain: "foudroyer.com",
  url: "www.foudroyer.com",
  favicon: "https://www.foudroyer.com/favicon-32x32.png",
}

export const WebsiteMunbeob: RoastWithReportEntity = {
  ...WebsiteForDemo,
  id: "www.munbeob.com",
  search_console_domain: "www.munbeob.com",
  url: "www.munbeob.com",
  favicon: "https://www.munbeob.com/favicon-32x32.png",
}

export const WebsitesBasic: RoastWithReportEntity[] = [WebsitePremium]

export const AllRoastSeeds: RoastWithReportEntity[] = [
  WebsiteForDemo,
  WebsiteHaiku,
  WebsiteFoudroyer,
  WebsiteMunbeob,
]
