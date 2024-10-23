import { Link } from "gatsby"
import React from "react"
import { useIntl } from "react-intl"
import { normalizeUrl } from "../../../utils/normalizeUrl"

export const FoudroyerLink: React.FC<{
  to: string
  children: any
  className?: string
  target?: string
  ariaLabel?: string
  rel?: string
}> = (props) => {
  const { locale } = useIntl()
  const to = normalizeUrl({ url: props.to, locale })

  if (props.to.startsWith("/")) {
    return (
      <Link
        rel={props.rel}
        className={props.className}
        to={to}
        target={props.target}
      >
        {props.children}
      </Link>
    )
  }

  return (
    <a rel={props.rel} href={to} className={props.className}>
      {props.children}
    </a>
  )
}
