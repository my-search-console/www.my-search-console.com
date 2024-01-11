import React from "react"
import { GlobalStats } from "../components/analytics/GlobalStats/GlobalStats"
import { GeneralChart } from "../components/analytics/GeneralChart/GeneralChart"
import { HorizontalHistogram } from "../components/analytics/HorizontalHistogram/HorizontalHistogram"
import { Seo } from "../components/general/Seo/Seo"
import { Navbar } from "../components/general/Navbar/Navbar"
import { Container } from "../components/UI/Container"
import { Footer } from "../components/marketing/Footer"
import { FilterBar } from "../components/analytics/FilterBar/FilterBar"
import { HistogramModal } from "../components/analytics/HistogramModal/HistogramModal"
import { AnalyticsToastDataLate } from "../components/analytics/AnalyticsToastDataLate/AnayticsToastDataLate"
import { AnalyticsToastDataSyncing } from "../components/analytics/AnalyticsToastDataSyncing/AnalyticsToastDataSyncing"
import { PremiumModal } from "../components/payment/PremiumModal/PremiumModal"
import { Notifications } from "../components/general/Notifications/Notifications"
import { CreateWebsiteModal } from "../components/general/CreateWebsiteModal/CreateWebsiteModal"
import { MobileNavbar } from "../components/general/MobileNavbar/MobileNavbar"
import { useIntl } from "react-intl"
import { RouteComponentProps } from "@reach/router"
import { Protected } from "../components/general/Protected/Protected"
import { AnalyticsComingSoonModal } from "../components/analytics/AnalyticsComingSoonModal/AnalyticsComingSoonModal"
import { AnalyticsPaywall } from "../components/analytics/AnalyticsPaywall/AnalyticsPaywall"

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

      <MobileNavbar />
      <CreateWebsiteModal />
      <HistogramModal />
      <PremiumModal />
      <Footer />
      <Notifications />
    </Protected>
  )
}
