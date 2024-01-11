import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Navbar } from "../../components/general/Navbar/Navbar"
import { Footer } from "../../components/marketing/Footer"
import { Seo } from "../../components/general/Seo/Seo"
import { CreateWebsiteModal } from "../../components/general/CreateWebsiteModal/CreateWebsiteModal"
import { UpdateCredentialsModal } from "../../components/indexation/UpdateCredentialsModal/UpdateCredentialsModal"
import { UpdateSitemapModal } from "../../components/indexation/UpdateSitemapModal/UpdateSitemapModal"
import { IndexNowCheckModal } from "../../components/indexation/IndexMeNowCheckModal/IndexNowCheckModal"
import { Notifications } from "../../components/general/Notifications/Notifications"
import { Protected } from "../../components/general/Protected/Protected"
import { useIntl } from "react-intl"
import { SupportUsModal } from "../../components/indexation/SupportUsModal/SupportUsModal"
import { MobileNavbar } from "../../components/general/MobileNavbar/MobileNavbar"
import { IndexationPageSwitcher } from "../../components/indexation/IndexationPageSwitcher/IndexationPageSwitcher"
import { FilterBar } from "../../components/analytics/FilterBar/FilterBar"
import { Container } from "../../components/UI/Container"
import { PremiumModal } from "../../components/payment/PremiumModal/PremiumModal"
import logo from "../assets/logo/glasses.svg"
import {
  ArrowLeftIcon,
  BellAlertIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid"
import { ButtonSecondary } from "../../components/UI/Button/Button"
import { Confetti } from "../../components/general/Confetti/Confetti"
import { FoudroyerLink } from "../../components/general/FoudroyerLink/FoudroyerLink"
import { Hero } from "../../components/roast/issues/Hero/Hero"
import { Issues } from "../../components/roast/issues/Issues/Issues"
import { IssueTypes } from "../../entities/IssueEntity"

export const ServerRoute: React.FC<RouteComponentProps> = () => {
  const intl = useIntl()
  return (
    <Protected>
      <Seo
        title={intl.formatMessage({
          id: `seo/indexation/title`,
        })}
        description={intl.formatMessage({
          id: `seo/indexation/description`,
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
      <Navbar />

      <Container className="relative">
        <div className="mt-4" id="pagination-anchor-scroll"></div>
        <Hero type={IssueTypes.server} />
        <Issues type={IssueTypes.server} />
      </Container>

      <Footer />

      <MobileNavbar />
      <SupportUsModal />
      <CreateWebsiteModal />
      <UpdateSitemapModal />
      <PremiumModal />
      <UpdateCredentialsModal />
      <IndexNowCheckModal />
      <Notifications />
    </Protected>
  )
}
