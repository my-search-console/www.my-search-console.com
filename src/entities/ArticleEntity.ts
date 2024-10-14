export enum ArticleTypes {
  QUOTE = "article/quote",
  RICH_TEXT = "article/rich_text",
  TITLE = "article/title",
  IMAGE = "article/image",
  TOC = "article/toc",
  VIDEO = "article/video",
  RECIPE = "article/recipe",
  PRODUCT = "article/product",
  ARTICLE = "article/article",
}

export type ArticleTOC = {
  id: string
  type: ArticleTypes.TOC
  title: {
    component: string
    value: string
  }
  items: Array<{ label: string; to: string; depth: number }>
}

export type ArticleVideo = {
  id: string
  type: ArticleTypes.VIDEO
  src: any
  ring: string
  illustration: any
  alt: string
  autoplay: boolean
}

export type ArticleProduct = {
  id: string
  type: ArticleTypes.PRODUCT
  product: {
    buttons: { url: string; label: string; theme: "primary" | "secondary" }[]
    name: string
    lang: string
    description: string
    image: {
      src: any
      alt: string
    }
  }
}

export type ArticleRecipe = {
  id: string
  type: ArticleTypes.RECIPE
  difficulty: string
  preparationDuration: number
  cookDuration: number
  recipeCuisine: string
  recipeCategory: string
  calories: number
  name: string
  description: string
  keywords: string
  image169: {
    src: any
  }
  image43: {
    src: any
  }
  image11: {
    src: any
  }
  tools: Array<{ quantity: number; url: string | null; value: string }>
  ingredients: {
    portions: number
    items: Array<{
      quantity: number
      url: string | null
      value: string
      weight: string
    }>
  }
  steps: Array<{
    content: string
    name: string
    illustration: {
      alt: string
      src: any | null
    }
  }>
}

export type ArticleQuote = {
  id: string
  type: ArticleTypes.QUOTE
  text: string
  author: string
}

export type ArticleRichText = {
  id: string
  type: ArticleTypes.RICH_TEXT
  content: string
}

export type ArticleTitle = {
  type: ArticleTypes.TITLE
  value: string
  id: string
  component: string
  faq: boolean
}

export type ArticleImage = {
  id: string
  type: ArticleTypes.IMAGE
  src?: string
  alt: string
  legend: string
}

export type ArticleToArticle = {
  id: string
  type: ArticleTypes.ARTICLE
  article: ArticleEntity
}

export type ArticleEntity = {
  id: string
  title: string
  lang: string
  hidden: boolean
  version: "v1" | "v2" | null
  canonical: string
  description: string
  published_at: Date
  updated_at: Date
  url: string
  meta: {
    title: string
    description: string
    indexable: boolean
  }
  illustration: {
    alt: string
    src: any
  }
  preview: {
    alt: string
    src: any
  }
  content: Array<
    | ArticleQuote
    | ArticleRichText
    | ArticleTitle
    | ArticleImage
    | ArticleTOC
    | ArticleRecipe
    | ArticleProduct
    | ArticleToArticle
    | ArticleVideo
  >
  author: {
    name: string
    id: string
    bio: string
    lang: string
    url: string
    staff: boolean
    username: string
    image: {
      alt: string
      src: any
    }
  }
  category: {
    id: string
    meta: {
      title: string
      description: string
    }
    title: string
    description: string
    url: string
    name: string
    hidden: boolean
    lang: string
  }
  relatedArticles: ArticleEntity[]
}
