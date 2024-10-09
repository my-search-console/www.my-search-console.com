import { ChevronLeftIcon } from "@heroicons/react/20/solid"
import { useLocation } from "@reach/router"
import { graphql, useStaticQuery } from "gatsby"
import React, { useState } from "react"
import { useIntl } from "react-intl"
import Markdown from "react-markdown"
import { Modal } from "../../../../ui/Modal/Modal"
import { Image } from "../../../Image/Image"
import { Video } from "../../../Video/Video"
import { connector, ContainerProps } from "./containers/NewsModal.containers"

type Props = {
  onClose: () => void
}

const NewsContentRichText = (props) => (
  <div className="">
    <Markdown
      components={{
        p: (props) => <p className="text-slate-900 mb-4" {...props}></p>,
        strong: (props) => <strong className="font-medium" {...props}></strong>,
      }}
    >
      {props.content}
    </Markdown>
  </div>
)

const NewsContentTitle = (props) => {
  if (props.component === "h1")
    return (
      <h1 className="mt-2 font-display text-xl tracking-tight">
        {props.value}
      </h1>
    )
  if (props.component === "h2")
    return (
      <h2 className="mt-6 font-display text-lg tracking-tight">
        {props.value}
      </h2>
    )
  if (props.component === "h3")
    return (
      <h3 className="mt-6 font-display text-lg tracking-tight">
        {props.value}
      </h3>
    )
  if (props.component === "h4")
    return <h4 className="mt-6 font-display tracking-tight">{props.value}</h4>
  if (props.component === "h5")
    return <h5 className="mt-6 font-display tracking-tight">{props.value}</h5>
  return <h6 className="mt-2 font-display tracking-tight">{props.value}</h6>
}

const NewsContentVideo = (props) => {
  return (
    <div className="mt-6">
      <Video
        autoplay={props.autoplay}
        src={props.src.publicURL}
        alt=""
        illustration={props.illustration}
      />
    </div>
  )
}

const NewsContentImage = (props) => {
  return (
    <div className="my-4 mt-6 overflow-hidden rounded-lg ring-8 ring-pink-100">
      <Image className="" {...props} />
    </div>
  )
}

const NewsContent: React.FC<{
  onBack: () => void
  news: {
    title: string
    description: string
    published_at: Date
    content: any
  }
}> = (props) => {
  const intl = useIntl()

  return (
    <div>
      <div className="-mt-4 grid grid-cols-3 items-center border-b border-slate-100 pb-2">
        <div>
          <button
            onClick={props.onBack}
            className="h-10 w-10 rounded-md text-center transition-all duration-300 ease-in-out hover:bg-pink-50 hover:text-pink-400"
          >
            <ChevronLeftIcon
              className="inline-block h-6 w-6"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="mx-auto font-display text-pink-400">Notifications</div>
        <div></div>
      </div>
      <div className="mt-8">
        <div className="-mb-2 font-display text-xs text-pink-400">
          {new Intl.DateTimeFormat(intl.locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(new Date(props.news.published_at))}
        </div>

        {props.news.content.map((content, index) => {
          if (content.type === "article/rich_text")
            return <NewsContentRichText key={index} {...content} />
          if (content.type === "article/title")
            return <NewsContentTitle key={index} {...content} />
          if (content.type === "article/video")
            return <NewsContentVideo key={index} {...content} />
          if (content.type === "article/image")
            return <NewsContentImage key={index} {...content} />

          return <>{content.type}</>
        })}
      </div>
    </div>
  )
}

const NewsList: React.FC<{
  news: {
    id: string
    title: string
    description: string
    published_at: Date
  }[]
  onSelect: (id: string) => void
}> = (props) => {
  const intl = useIntl()

  return (
    <div>
      <div className="-mt-4 grid grid-cols-3 items-center border-b border-slate-100 pb-2">
        <div>
          <button className="h-10 w-10"></button>
        </div>
        <div className="mx-auto font-display text-pink-400">Notifications</div>
        <div></div>
      </div>

      <div className="mt-8 divide-y divide-slate-100">
        {props.news.map((news) => (
          <div
            onClick={() => props.onSelect(news.id)}
            className="cursor-pointer rounded-md px-4 py-4 transition-all ease-in-out hover:bg-slate-50"
          >
            <div className="font-display text-xs text-pink-400">
              {new Intl.DateTimeFormat(intl.locale, {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date(news.published_at))}
            </div>
            <div className="font-display text-slate-900">{news.title}</div>
            <div className="text-sm text-slate-700">{news.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const useNews = () => {
  const intl = useIntl()
  const query = useStaticQuery(graphql`
    query FetchNewsJson {
      news: allNewsJson(sort: { fields: published_at, order: DESC }) {
        nodes {
          content {
            ... on ArticleContentRichText {
              content
              type
            }
            ... on ArticleContentVideo {
              alt
              autoplay
              type
              src {
                publicURL
              }
              illustration {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            ... on ArticleContentImage {
              alt
              legend
              type
              src {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            ... on ArticleContentTitle {
              value
              component
              type
            }
          }
          lang
          title
          published_at
          updated_at
          description
          id: jsonId
        }
      }
    }
  `)

  const newsInLanguage = query.news.nodes.filter(
    ({ lang }) => lang === intl.locale
  )

  return newsInLanguage
}

export const Wrapper: React.FC<Props> = (props) => {
  const { hash } = useLocation()

  const news = useNews()

  const [newsSelected, setNewsSelected] = useState<string | null>(null)
  const newsContent = news.find(({ id }) => id === newsSelected)

  return (
    <Modal isOpen={hash.includes("news-modal")} onClose={props.onClose}>
      <div className="relative max-w-lg">
        {!newsSelected && (
          <NewsList news={news} onSelect={(id) => setNewsSelected(id)} />
        )}
        {newsSelected && (
          <NewsContent
            onBack={() => setNewsSelected(null)}
            news={newsContent}
          />
        )}
      </div>
    </Modal>
  )
}

export const Container: React.FC<ContainerProps> = (props) => (
  <Wrapper {...props} />
)

export const NewsModal = connector(Container)
