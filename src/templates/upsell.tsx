import { PageProps } from "gatsby"
import React from "react"
import { useIntl } from "react-intl"
import { Navbar } from "../components/general/Navbar/Navbar"
import { Seo } from "../components/general/Seo/Seo"
import { Footer } from "../components/marketing/Footer"
import { Notifications } from "../components/general/Notifications/Notifications"
import { ScopeNotFoundModal } from "../components/general/ScopeNotFoundModal/ScopeNotFoundModal"
import { PricingUpsell } from "../components/marketing/PricingUpsell/PricingUpsell"

type Props = PageProps<
  {},
  {
    langKey: string
    level: string
    isIndex: boolean
    canonicals: Array<{
      lang: string
      url: string
      isDefault: boolean
      label: string
    }>
  }
>

const PricingUpsellPage: React.FC<Props> = (props) => {
  const intl = useIntl()

  return (
    <>
      <Seo
        title={intl.formatMessage({
          id: `seo/pricing/title`,
        })}
        description={intl.formatMessage({
          id: `seo/pricing/description`,
        })}
        index={false}
        image={`/og/${props.pageContext.langKey}-banner.jpg`}
        lang={props.pageContext.langKey}
        langUrls={props.pageContext.canonicals}
      />

      <div className="overflow-hidden">
        <Navbar />

        <main className="relative">
          <PricingUpsell />
        </main>
      </div>

      <ScopeNotFoundModal />
      <Notifications />
      <Footer />
    </>
  )
}

export default PricingUpsellPage
