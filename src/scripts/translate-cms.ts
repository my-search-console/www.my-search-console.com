import fs from "fs"
import path from "path"
import Deepl from "deepl"
import { v4 } from "uuid"
import { v2 } from "@google-cloud/translate"
import delay from "delay"
import _ from "lodash"
import { languagesAvailable } from "../constants/langs"

const GoogleTranslate = new v2.Translate({
  key: "AIzaSyCguDU_gef45N20O_hErnquXjUzDaabY0g",
})

const AUTH_KEY = "6ba13bd8-0352-4e4d-2cf2-95466ea829d7"

const translate = async (params: { text: string; lang: string }) => {
  if (["ar", "vi", "th"].includes(params.lang)) {
    let [translations] = await GoogleTranslate.translate(
      params.text,
      params.lang
    )

    return translations
  }

  const translation = await Deepl({
    text: params.text,
    // @ts-ignore
    target_lang: params.lang.toUpperCase(),
    auth_key: AUTH_KEY,
    split_sentences: "nonewlines",
  })

  return translation.data.translations.map(({ text }) => text).join("")
}

const translateArticle = async (params: { article: any; lang: string }) => {
  const article = params.article
  const date = new Date()

  const translated = {
    ...article,
    id: v4(),
    published_at: date,
    updated_at: date,
    meta: {
      ...article.meta,
      title: await translate({
        text: article.meta.title,
        lang: params.lang,
      }),
      description: await translate({
        text: article.meta.description,
        lang: params.lang,
      }),
    },
    lang: params.lang.toLowerCase(),
    content: await Promise.all(
      article.content.map(async (content) => {
        if (content.type === "marketing/hero") {
          return {
            ...content,
            title: {
              ...content.title,
              value: await translate({
                text: content.title.value,
                lang: params.lang,
              }),
            },
            label: {
              ...content.label,
              value: await translate({
                text: content.label.value,
                lang: params.lang,
              }),
            },
            description: await translate({
              text: content.description,
              lang: params.lang,
            }),
          }
        }

        if (content.type === "marketing/video") {
          return {
            ...content,
            alt: await translate({
              text: content.alt,
              lang: params.lang,
            }),
          }
        }

        if (content.type === "marketing/title") {
          return {
            ...content,
            title: {
              ...content.title,
              value: await translate({
                text: content.title.value,
                lang: params.lang,
              }),
            },
          }
        }

        if (content.type === "marketing/text") {
          return {
            ...content,
            value: await translate({
              text: content.value,
              lang: params.lang,
            }),
          }
        }

        if (content.type === "marketing/features") {
          return {
            ...content,
            label: {
              ...content.label,
              value: await translate({
                text: content.label.value,
                lang: params.lang,
              }),
            },
            title: {
              ...content.title,
              value: await translate({
                text: content.title.value,
                lang: params.lang,
              }),
            },
            description: await translate({
              text: content.description,
              lang: params.lang,
            }),
            features: await Promise.all(
              (content.features || []).map(async (feature) => ({
                ...feature,
                title: {
                  ...feature.title,
                  value: await translate({
                    text: feature.title.value,
                    lang: params.lang,
                  }),
                },
                description: await translate({
                  text: feature.description,
                  lang: params.lang,
                }),
                video: {
                  ...feature.video,
                  alt: await translate({
                    text: feature.video.alt,
                    lang: params.lang,
                  }),
                },
              }))
            ),
          }
        }

        return content
      })
    ),
  }

  await delay(1000)

  return translated
}

const blog = async (params: { target: string; file: string }) => {
  const article: any = JSON.parse(
    fs.readFileSync(path.resolve("cms/pages", params.file), "utf-8")
  )

  const translated = await translateArticle({
    article,
    lang: params.target,
  })

  const articleTranslated: any = {
    ...translated,
  }

  const filename = `${params.target.toLowerCase()}-${articleTranslated.url
    .split("/")
    .join("-")}`

  fs.writeFileSync(
    path.resolve("cms/pages", filename + ".json"),
    JSON.stringify(articleTranslated)
  )
}

async function run() {
  for (const language of languagesAvailable.filter((lang) => lang !== "en")) {
    console.log(language)

    await blog({
      target: language,
      file: "en-refund-policy.json",
    })
  }
}

run()
