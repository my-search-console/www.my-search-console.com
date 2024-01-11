import { Link } from "gatsby"
import React from "react"
import { normalizeUrl } from "../../../utils/normalizeUrl"
import { useIntl } from "react-intl"

export const FoudroyerLink: React.FC<{
  to: string
  children: any
  className?: string
  target?: string
  ariaLabel?: string
}> = (props) => {
  const { locale } = useIntl()
  return (
    <Link
      className={props.className}
      to={normalizeUrl({ url: props.to, locale })}
      target={props.target}
      aria-label={props.ariaLabel}
    >
      {props.children}
    </Link>
  )
}
