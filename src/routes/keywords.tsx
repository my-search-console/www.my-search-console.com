import { RouteComponentProps } from "@reach/router"
import React from "react"
import { useIntl } from "react-intl"
import { AnalyticsActivateModal } from "../components/analytics/AnalyticsActivateModal/AnalyticsActivateModal"
import { HistogramModal } from "../components/analytics/HistogramModal/HistogramModal"
import { CreateWebsiteModal } from "../components/general/CreateWebsiteModal/CreateWebsiteModal"
import { MobileNavbar } from "../components/general/MobileNavbar/MobileNavbar"
import { Navbar } from "../components/general/Navbar/Navbar"
import { Notifications } from "../components/general/Notifications/Notifications"
import { Protected } from "../components/general/Protected/Protected"
import { Seo } from "../components/general/Seo/Seo"
import { AddKeywordsModal } from "../components/keywords/AddKeywordsModal/AddKeywordsModal"
import { KeywordsPaywall } from "../components/keywords/KeywordsPaywall/KeywordsPaywall"
import { Footer } from "../components/marketing/Footer"
import { PremiumModal } from "../components/payment/UpsellConfirmationModal/UpsellConfirmationModal"
import { Container } from "../components/ui/Container"

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
      <AnalyticsActivateModal />
      <Notifications />
    </Protected>
  )
}
