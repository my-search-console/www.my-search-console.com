import React from "react"
import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image"

type Props = {
  src?: any
  alt: string
  className?: string
  referrerPolicy?: any
}

export const Image: React.FC<Props> = (props) => {
  if (!props.src) return <div />
  if (!props.src?.childImageSharp) return <img {...props} />

  const image = getImage(props.src.childImageSharp) as IGatsbyImageData

  return (
    <GatsbyImage image={image} alt={props.alt} className={props.className} />
  )
}
