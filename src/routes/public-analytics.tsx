import { RouteComponentProps } from "@reach/router"
import React from "react"
import { useIntl } from "react-intl"
import { AnalyticsLoadPublicData } from "../components/analytics/AnalyticsLoadPublicData/AnalyticsLoadPublicData"
import { FilterBar } from "../components/analytics/FilterBar/FilterBar"
import { GeneralChart } from "../components/analytics/GeneralChart/GeneralChart"
import { GlobalStats } from "../components/analytics/GlobalStats/GlobalStats"
import { HorizontalHistogram } from "../components/analytics/HorizontalHistogram/HorizontalHistogram"
import { Navbar } from "../components/general/Navbar/Navbar"
import { Seo } from "../components/general/Seo/Seo"
import { Footer } from "../components/marketing/Footer"
import { Container } from "../components/UI/Container"

export const PublicAnalyticsRoute: React.FC<RouteComponentProps> = () => {
  const intl = useIntl()
  return (
    <>
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

      <AnalyticsLoadPublicData />

      <div className="relative">
        <Navbar />

        <Container>
          <div className="mt-4" />
          <div className="relative">
            <FilterBar readonly={true} />
            <div className="mt-4" />
            <GlobalStats />
            <GeneralChart />
            <HorizontalHistogram hideActions />
          </div>
          <div className="mt-4" />
        </Container>
      </div>

      <Footer />
    </>
  )
}
