import classNames from "classnames"
import React, { ReactNode } from "react"
import { As } from "../../general/As/As"
import { Video } from "../../general/Video/Video"

export const Features: React.FC<{
  title: {
    component: string
    value: ReactNode
  }
  description: ReactNode
  label: {
    component: string
    value: ReactNode
  }
  tool?: "indexation" | "analytics" | "keywords" | "opportunities"
  invert?: boolean
  features: {
    title: {
      component: string
      value: ReactNode
    }
    description: ReactNode
    video: {
      alt?: string
      autoplay?: boolean
      src: {
        publicURL: string
      }
      illustration?: any
    }
  }[]
}> = (props) => {
  const [selected, setSelected] = React.useState(0)

  return (
    <div className="overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
        <div className="px-6 md:px-0 lg:pr-4">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-2xl">
            <As
              component={props.label.component}
              className="font-display text-base font-semibold leading-7 text-pink-400"
            >
              {props.label.value}
            </As>

            <As
              component={props.title.component}
              className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            >
              {props.title.value}
            </As>

            <As
              component={"p"}
              className="mt-4 text-lg leading-8 text-slate-500"
            >
              {props.description}
            </As>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-2 lg:items-start">
          <div className={classNames(props.invert && "order-last")}>
            <dl className="mx-auto mt-6 max-w-2xl text-base  leading-7 text-slate-600 lg:mx-0 lg:max-w-lg">
              {props.features.map((feature, index) => (
                <div
                  key={index}
                  onClick={() => setSelected(index)}
                  className={classNames(
                    index === selected
                      ? "block bg-pink-50"
                      : "hover:bg-pink-50",
                    "relative my-2 flex cursor-pointer flex-col items-start justify-center rounded-lg border border-transparent p-4 transition-all duration-300 ease-in-out"
                  )}
                >
                  <dt className="flex items-center font-display font-semibold text-slate-900">
                    <span
                      // @ts-ignore
                      className="mr-3 text-pink-400"
                      aria-hidden="true"
                    >
                      0{index + 1}
                    </span>

                    <As component={feature.title.component}>
                      {feature.title.value}
                    </As>
                  </dt>
                  <dd className="ml-9 inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mx-auto flex h-full max-w-2xl items-start px-2 lg:mx-0 lg:max-w-lg lg:pt-6">
            {props.features
              .filter((_, index) => index === selected)
              .map((feature) => (
                <Video
                  key={feature.video.src.publicURL}
                  src={feature.video.src.publicURL}
                  illustration={feature.video.illustration}
                  alt={feature.video?.alt || ""}
                  autoplay={feature.video.autoplay}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
