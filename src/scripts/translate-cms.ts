import delay from "delay"
import fs from "fs"
import path from "path"
import { v4 } from "uuid"
import { languagesAvailable } from "../constants/langs"

const OPEN_AI_API_KEY =
  "sk-proj-vC2yyJ98Z2h5ODPdsGIzT3BlbkFJ1t3Ij7otfAbvUpWfRYWq"

const openaiTranslate = async (params: {
  text: string
  to: string
  from: string
}) => {
  const data = JSON.stringify({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a translator. I'll give you sentences that you have to translate into the lang I submit.

        For example, if I give you from: fr, to: en, you have to translate from french to english.

        If you translate into korean, please only write in korean and no english words.

        Do not translate those words: Foudroyer.
        
        Give me only the translation.`,
      },
      {
        role: "user",
        content: `from:${params.from}, to:${params.to}
        
        ${params.text}`,
      },
    ],
    temperature: 0,
  })

  const config: RequestInit = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPEN_AI_API_KEY}`,
      "OpenAI-Organization": "org-3K3cTd4u3YLE1OZ1W7GLS9GX",
      "OpenAI-Project": "proj_pnK3hpJaWbJr3nET71pMLa1q",
    },
    body: data,
  }

  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    config
  )

  const json = (await response.json()) as {
    choices: [{ message: { content: string } }]
  }

  return json.choices.map(({ message }) => message.content).join("")
}

const translate = async (params: {
  to: string
  from: string
  text: string
}) => {
  return openaiTranslate(params)
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
        to: params.lang,
        from: article.lang,
      }),
      description: await translate({
        text: article.meta.description,
        to: params.lang,
        from: article.lang,
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
                to: params.lang,
                from: article.lang,
              }),
            },
            label: {
              ...content.label,
              value: await translate({
                text: content.label.value,
                to: params.lang,
                from: article.lang,
              }),
            },
            description: await translate({
              text: content.description,
              to: params.lang,
              from: article.lang,
            }),
          }
        }

        if (content.type === "marketing/video") {
          return {
            ...content,
            alt: await translate({
              text: content.alt,
              to: params.lang,
              from: article.lang,
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
                to: params.lang,
                from: article.lang,
              }),
            },
          }
        }

        if (content.type === "marketing/text") {
          return {
            ...content,
            value: await translate({
              text: content.value,
              to: params.lang,
              from: article.lang,
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
                to: params.lang,
                from: article.lang,
              }),
            },
            title: {
              ...content.title,
              value: await translate({
                text: content.title.value,
                to: params.lang,
                from: article.lang,
              }),
            },
            description: await translate({
              text: content.description,
              to: params.lang,
              from: article.lang,
            }),
            features: await Promise.all(
              (content.features || []).map(async (feature) => ({
                ...feature,
                title: {
                  ...feature.title,
                  value: await translate({
                    text: feature.title.value,
                    to: params.lang,
                    from: article.lang,
                  }),
                },
                description: await translate({
                  text: feature.description,
                  to: params.lang,
                  from: article.lang,
                }),
                video: {
                  ...feature.video,
                  alt: await translate({
                    text: feature.video.alt,
                    to: params.lang,
                    from: article.lang,
                  }),
                },
              }))
            ),
          }
        }

        if (content.type === "article/toc") {
          return {
            ...content,
            title: {
              ...content.title,
              value: await translate({
                text: content.title.value,
                to: params.lang,
                from: article.lang,
              }),
            },
          }
        }

        if (content.type === "article/title") {
          return {
            ...content,
            value: await translate({
              text: content.value,
              to: params.lang,
              from: article.lang,
            }),
            faq: content.faq,
          }
        }

        if (content.type === "article/rich_text") {
          return {
            ...content,
            content: await translate({
              text: content.content,
              to: params.lang,
              from: article.lang,
            }),
          }
        }

        return content
      })
    ),
  }

  await delay(1000)

  return translated
}

const translateNews = async (params: { article: any; lang: string }) => {
  const article = params.article
  const date = new Date()

  const translated = {
    ...article,
    id: v4(),
    published_at: date,
    updated_at: date,
    lang: params.lang.toLowerCase(),
    title: await translate({
      text: params.article.title,
      to: params.lang,
      from: article.lang,
    }),
    description: await translate({
      text: params.article.description,
      to: params.lang,
      from: article.lang,
    }),
    content: await Promise.all(
      article.content.map(async (content) => {
        if (content.type === "article/rich_text") {
          return {
            ...content,
            content: await translate({
              text: content.content,
              to: params.lang,
              from: article.lang,
            }),
          }
        }

        if (content.type === "article/title") {
          return {
            ...content,
            value: await translate({
              text: content.value,
              to: params.lang,
              from: article.lang,
            }),
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

const news = async (params: { target: string; file: string }) => {
  const article: any = JSON.parse(
    fs.readFileSync(path.resolve("cms/news", params.file), "utf-8")
  )

  const translated = await translateNews({
    article,
    lang: params.target,
  })

  const articleTranslated: any = {
    ...translated,
  }

  const filename = `${params.target.toLowerCase()}-${articleTranslated.campaign
    .split("/")
    .join("-")}`

  fs.writeFileSync(
    path.resolve("cms/news", filename + ".json"),
    JSON.stringify(articleTranslated)
  )
}

async function run() {
  for (const language of languagesAvailable.filter((lang) => lang !== "en")) {
    console.log(language)

    await blog({
      target: language,
      file: "en-legal-notice.json",
    })
  }
}

run()
