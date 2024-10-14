import React, { useContext } from "react"
import { ArticleTOC } from "../../../entities/ArticleEntity"
import { As } from "../../general/As/As"

export const Toc: React.FC<ArticleTOC> = (props) => {
  return (
    <div className="container mx-auto px-4 font-display md:max-w-3xl md:px-0">
      <As
        component={props.title.component}
        className={`mt-8 text-3xl font-extrabold tracking-tight md:text-4xl`}
      >
        {props.title.value}
      </As>

      <ol className="-ml-2 mt-4 list-inside list-none text-lg">
        {props.items.map((item) => (
          <li
            key={item.to + item.label}
            style={{ paddingLeft: `${item.depth * 10}px` }}
          >
            <a
              href={item.to}
              className={`inline-block rounded px-2 py-1 transition-colors duration-300 ease-in-out`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}
