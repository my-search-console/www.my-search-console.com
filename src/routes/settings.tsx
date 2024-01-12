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
import { ConnectService } from "../components/settings/ConnectService/ConnectService"
import { GoogleKeyUpdate } from "../components/settings/GoogleKeyUpdate/GoogleKeyUpdate"
import { UpdateCredentialsModal } from "../components/indexation/UpdateCredentialsModal/UpdateCredentialsModal"
import { useIntl } from "react-intl"
import { Protected } from "../components/general/Protected/Protected"
import { RouteComponentProps, useLocation } from "@reach/router"
import { UpdateSitemapModal } from "../components/indexation/UpdateSitemapModal/UpdateSitemapModal"
import { UpdateSitemap } from "../components/settings/UpdateSitemap/UpdateSitemap"
import { DeleteWebsite } from "../components/settings/DeleteWebsite/DeleteWebsite"
import { IndexNowCheckModal } from "../components/indexation/IndexMeNowCheckModal/IndexNowCheckModal"
import { ManageSubscription } from "../components/settings/ManageSubscription/ManageSubscription"
import { AddManuallyPagesToIndexation } from "../components/settings/AddManuallyPagesToIndexation/AddManuallyPagesToIndexation"
import { MakeWebsitePublic } from "../components/settings/MakeWebsitePublic/MakeWebsitePublic"
import { Invoices } from "../components/settings/Invoices/Invoices"

export const SettingsRoute: React.FC<RouteComponentProps> = () => {
  const intl = useIntl()
  const location = useLocation()

  return (
    <Protected>
      <Seo
        title={intl.formatMessage({
          id: `seo/settings/title`,
        })}
        description={intl.formatMessage({
          id: `seo/settings/description`,
        })}
        image="/og/en-banner.jpg"
        lang="en"
        langUrls={[
          {
            lang: "en",
            url: "/settings",
            isDefault: true,
          },
        ]}
      />
      <div className="relative min-h-screen">
        <Navbar />

        <Container>
          <div className="mt-4" />
          <FilterBar />
          <div className="relative">
            <ConnectService />
            <GoogleKeyUpdate />
            <UpdateSitemap />
            <AddManuallyPagesToIndexation />
            <MakeWebsitePublic />
            <ManageSubscription />
            <Invoices />
            <DeleteWebsite />
          </div>
        </Container>
      </div>

      <UpdateCredentialsModal />
      <MobileNavbar />
      <CreateWebsiteModal />
      <HistogramModal />
      <PremiumModal />
      <Footer />
      <Notifications />
    </Protected>
  )
}
