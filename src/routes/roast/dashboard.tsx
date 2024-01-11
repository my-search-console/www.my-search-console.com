import React from "react"
import { Seo } from "../../components/general/Seo/Seo"
import { Navbar } from "../../components/general/Navbar/Navbar"
import { Container } from "../../components/UI/Container"
import { Footer } from "../../components/marketing/Footer"
import { PremiumModal } from "../../components/payment/PremiumModal/PremiumModal"
import { Notifications } from "../../components/general/Notifications/Notifications"
import { CreateWebsiteModal } from "../../components/general/CreateWebsiteModal/CreateWebsiteModal"
import { useIntl } from "react-intl"
import { RouteComponentProps } from "@reach/router"
import { Protected } from "../../components/general/Protected/Protected"
import { WebsitesList } from "../../components/roast/dashboard/WebsitesList/WebsitesList"
import { IndexNowCheckModal } from "../../components/indexation/IndexMeNowCheckModal/IndexNowCheckModal"
import { UpdateCredentialsModal } from "../../components/indexation/UpdateCredentialsModal/UpdateCredentialsModal"

export const DashboardRoute: React.FC<RouteComponentProps> = () => {
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
          <div className="mt-8" />

          <WebsitesList />

          <div className="relative"></div>
          <div className="mt-4" />
        </Container>
      </div>

      <CreateWebsiteModal />
      <IndexNowCheckModal />
      <UpdateCredentialsModal />
      <CreateWebsiteModal />
      <PremiumModal />
      <Footer />
      <Notifications />
    </Protected>
  )
}
