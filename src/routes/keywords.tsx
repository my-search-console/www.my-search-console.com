import React from "react"
import { Seo } from "../components/general/Seo/Seo"
import { Navbar } from "../components/general/Navbar/Navbar"
import { Container } from "../components/UI/Container"
import { Footer } from "../components/marketing/Footer"
import { FilterBar } from "../components/analytics/FilterBar/FilterBar"
import { HistogramModal } from "../components/analytics/HistogramModal/HistogramModal"
import { PremiumModal } from "../components/payment/PremiumModal/PremiumModal"
import { Notifications } from "../components/general/Notifications/Notifications"
import { CreateWebsiteModal } from "../components/general/CreateWebsiteModal/CreateWebsiteModal"
import { MobileNavbar } from "../components/general/MobileNavbar/MobileNavbar"
import { useIntl } from "react-intl"
import { RouteComponentProps } from "@reach/router"
import { Protected } from "../components/general/Protected/Protected"
import { HorizontalHistogramKeywords } from "../components/keywords/HorizontalHistogramKeywords/HorizontalHistogramKeywords"
import { AddKeywordsModal } from "../components/keywords/AddKeywordsModal/AddKeywordsModal"
import { KeywordsPaywall } from "../components/keywords/KeywordsPaywall/KeywordsPaywall"

export const KeywordsRoute: React.FC<RouteComponentProps> = () => {
  const intl = useIntl()
  return (
    <Protected>
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

      <div className="relative min-h-screen">
        <Navbar />

        <Container>
          <KeywordsPaywall />
        </Container>
      </div>

      <CreateWebsiteModal />
      <MobileNavbar />
      <AddKeywordsModal />
      <HistogramModal />
      <PremiumModal />
      <Footer />
      <Notifications />
    </Protected>
  )
}
