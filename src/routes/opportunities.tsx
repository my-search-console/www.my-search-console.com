import React from "react"
import { Seo } from "../components/general/Seo/Seo"
import { Navbar } from "../components/general/Navbar/Navbar"
import { Container } from "../components/UI/Container"
import { Footer } from "../components/marketing/Footer"
import { FilterBar } from "../components/analytics/FilterBar/FilterBar"
import { PremiumModal } from "../components/payment/PremiumModal/PremiumModal"
import { Notifications } from "../components/general/Notifications/Notifications"
import { CreateWebsiteModal } from "../components/general/CreateWebsiteModal/CreateWebsiteModal"
import { MobileNavbar } from "../components/general/MobileNavbar/MobileNavbar"
import { useIntl } from "react-intl"
import { RouteComponentProps } from "@reach/router"
import { Protected } from "../components/general/Protected/Protected"
import { OpportunitiesHorizontalHistogram } from "../components/opportunities/OpportunitiesHorizontalHistogram/OpportunitiesHorizontalHistogram"
import { HelperBlock } from "../components/general/HelperBlock/HelperBlock"
import { FormattedMessage } from "../components/general/FormattedMessage/FormattedMessage"
import { OpportunitiesPaywall } from "../components/opportunities/OpportunitiesPaywall/OpportunitiesPaywall"

export const OpportunitiesRoute: React.FC<RouteComponentProps> = () => {
  const intl = useIntl()
  return (
    <Protected>
      <Seo
        title={intl.formatMessage({
          id: `seo/opportunities/title`,
        })}
        description={intl.formatMessage({
          id: `seo/opportunities/description`,
        })}
        image="/og/en-banner.jpg"
        lang="en"
        langUrls={[
          {
            lang: "en",
            url: "/opportunities",
            isDefault: true,
          },
        ]}
      />

      <div className="relative min-h-screen">
        <Navbar />

        <Container>
          <OpportunitiesPaywall />
        </Container>
      </div>

      <CreateWebsiteModal />
      <MobileNavbar />
      <PremiumModal />
      <Footer />
      <Notifications />
    </Protected>
  )
}
