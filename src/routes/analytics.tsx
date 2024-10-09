import { RouteComponentProps } from "@reach/router"
import React from "react"
import { useIntl } from "react-intl"
import { AnalyticsCalendarModal } from "../components/analytics/AnalyticsCalendarModal/AnalyticsCalendarModal"
import { AnalyticsPaywall } from "../components/analytics/AnalyticsPaywall/AnalyticsPaywall"
import { HistogramModal } from "../components/analytics/HistogramModal/HistogramModal"
import { MobileNavbar } from "../components/general/MobileNavbar/MobileNavbar"
import { Navbar } from "../components/general/Navbar/Navbar"
import { Notifications } from "../components/general/Notifications/Notifications"
import { Protected } from "../components/general/Protected/Protected"
import { Seo } from "../components/general/Seo/Seo"
import { Footer } from "../components/marketing/Footer"
import { PremiumModal } from "../components/payment/UpsellConfirmationModal/UpsellConfirmationModal"
import { Container } from "../components/uiii/Container"

export const AnalyticsRoute: React.FC<RouteComponentProps> = () => {
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

      <div className="relative">
        <Navbar />

        <Container>
          <AnalyticsPaywall />
        </Container>
      </div>

      <AnalyticsCalendarModal />
      <MobileNavbar />
      <HistogramModal />
      <PremiumModal />
      <Footer />
      <Notifications />
    </Protected>
  )
}
