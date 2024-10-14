import React from "react"
import { ArticleTitle as ArticleTitleEntity } from "../../../entities/ArticleEntity"
import { H1, H2, H3, H4, H5, H6 } from "../Mdx/components"
import { slugifyForAnchors } from "../../../utils/normalizeUrl"

export const ArticleTitle: React.FC<ArticleTitleEntity> = (props) => {
  if (props.component === "h1")
    return <H1 id={slugifyForAnchors(props.value)}>{props.value}</H1>
  if (props.component === "h2")
    return <H2 id={slugifyForAnchors(props.value)}>{props.value}</H2>
  if (props.component === "h3")
    return <H3 id={slugifyForAnchors(props.value)}>{props.value}</H3>
  if (props.component === "h4")
    return <H4 id={slugifyForAnchors(props.value)}>{props.value}</H4>
  if (props.component === "h5")
    return <H5 id={slugifyForAnchors(props.value)}>{props.value}</H5>
  if (props.component === "h6")
    return <H6 id={slugifyForAnchors(props.value)}>{props.value}</H6>

  return <p id={slugifyForAnchors(props.value)}>{props.value}</p>
}
