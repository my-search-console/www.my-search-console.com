import { Link } from "gatsby"
import React, { ReactNode, useContext } from "react"

export const A: React.FC<{ children: ReactNode; href: string }> = ({
  children,
  href,
}) => {
  const rel = href.includes("$obfuscated")
    ? "obfuscated"
    : href.includes("$nofollow")
    ? "nofollow"
    : "follow"

  return (
    <Link
      to={href.replace("$obfuscated", "").replace("$nofollow", "")}
      rel={rel}
      className={` font-medium hover:underline`}
    >
      {children}
    </Link>
  )
}
