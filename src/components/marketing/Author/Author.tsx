import React, { ReactNode } from "react"
import { Image } from "../../general/Image/Image"
import { Container } from "../../ui/Container"

export const Author: React.FC<{
  name: ReactNode
  illustration: any
}> = (props) => {
  return (
    <Container className="mx-auto py-10">
      <div className="mx-auto flex max-w-3xl items-center">
        <Image
          src={props.illustration.src}
          className="h-12 w-12 rounded-full"
          alt={props.illustration.alt}
        />

        <div className="ml-4 inline-block leading-none">
          <div className="flex items-center justify-between text-slate-500">
            <div className="h-1 w-full bg-gradient-to-r from-white to-pink-100"></div>
            <span className="ml-2 flex-shrink-0">Author</span>
          </div>
          <div className="font-display text-lg">{props.name}</div>
        </div>
      </div>
    </Container>
  )
}
