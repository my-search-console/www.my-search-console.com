import React, { ReactNode } from "react"
import { Seo } from "../components/general/Seo/Seo"
import { Navbar } from "../components/general/Navbar/Navbar"
import { Container } from "../components/UI/Container"
import { Footer } from "../components/marketing/Footer"
import { useIntl } from "react-intl"
import { RouteComponentProps } from "@reach/router"
import { Chart } from "../components/spread/Chart/Chart"
import ReactMarkdown from "react-markdown"
import { Notifications } from "../components/general/Notifications/Notifications"
import { ScopeNotFoundModal } from "../components/general/ScopeNotFoundModal/ScopeNotFoundModal"
import { StaticInitialization } from "../components/general/StaticInitialization/StaticInitialization"

const Hero: React.FC<{
  label?: ReactNode
  title: ReactNode
  description: string
}> = (props) => {
  return (
    <div className="relative">
      <div
        style={{
          animationDelay: "300ms",
        }}
        className="absolute right-20 top-20 hidden h-20 w-20 animate-bounce  rounded-full bg-pink-50 lg:block"
      ></div>
      <div className="absolute left-20 top-28 hidden h-20 w-20 animate-bounce  rounded-xl bg-blue-50 delay-300 lg:block"></div>

      <Container className="flex flex-col items-center justify-center pb-4 pt-20 text-center">
        {props.label && (
          <p className="text-center font-display text-lg font-medium text-pink-400">
            {props.label}
          </p>
        )}
        <h1 className="mx-auto flex max-w-3xl flex-col font-display text-4xl font-semibold leading-tight tracking-tight text-slate-900 ">
          {props.title}
        </h1>

        {props.description && (
          <ReactMarkdown
            className={
              "mx-auto mt-4 max-w-3xl text-lg leading-normal tracking-tight text-slate-500"
            }
          >
            {props.description}
          </ReactMarkdown>
        )}
      </Container>
    </div>
  )
}

export const SpreadRoute: React.FC<RouteComponentProps> = () => {
  const intl = useIntl()
  return (
    <StaticInitialization>
      <Seo
        title={intl.formatMessage({
          id: `seo/analytics/title`,
        })}
        description={intl.formatMessage({
          id: `seo/analytics/description`,
        })}
        image="/og/en-banner.jpg"
        lang="en"
        langUrls={[
          {
            lang: "en",
            url: "/analytics",
            isDefault: true,
          },
        ]}
      />

      <div className="relative">
        <Navbar />

        <Hero
          label="Do you have good metrics ?"
          title={<h1>Share your traffic success</h1>}
          description={
            "Export to jpeg the graph with your global stats from the year on Google Search Console. We extract the stats from all your websites from your GSC and show them in the graph. Everything is anonymous, we don't store your data."
          }
        />

        <div className="mx-auto max-w-3xl">
          <Chart />
        </div>
        <div className="mt-8"></div>
      </div>

      <ScopeNotFoundModal />
      <Notifications />
      <Footer />
    </StaticInitialization>
  )
}
