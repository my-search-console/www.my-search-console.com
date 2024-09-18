import { RouteComponentProps } from "@reach/router"
import React from "react"
import { useIntl } from "react-intl"
import { Navbar } from "../components/general/Navbar/Navbar"
import { Notifications } from "../components/general/Notifications/Notifications"
import { Protected } from "../components/general/Protected/Protected"
import { Seo } from "../components/general/Seo/Seo"
import { Footer } from "../components/marketing/Footer"
import { PremiumModal } from "../components/payment/UpsellConfirmationModal/UpsellConfirmationModal"
import { AddMoreSearchConsoles } from "../components/settings/AddMoreSearchConsoles/AddMoreSearchConsoles"
import { Invoices } from "../components/settings/Invoices/Invoices"
import { ManageSubscription } from "../components/settings/ManageSubscription/ManageSubscription"
import { Container } from "../components/UI/Container"

export const UserRoute: React.FC<RouteComponentProps> = () => {
  const intl = useIntl()

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
          <div className="relative">
            <AddMoreSearchConsoles />
            <ManageSubscription />
            <Invoices />
          </div>
        </Container>
      </div>

      <PremiumModal />
      <Footer />
      <Notifications />
    </Protected>
  )
}
