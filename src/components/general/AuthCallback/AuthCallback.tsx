import { RouteComponentProps } from "@reach/router"
import React from "react"
import { useIntl } from "react-intl"
import { Container } from "../../UI/Container"
import { Help } from "../Help/Help"
import { Loader } from "../Loader/Loader"
import { Seo } from "../Seo/Seo"

export const AuthCallback: React.FC<RouteComponentProps> = () => {
  const intl = useIntl()

  return (
    <>
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

      <Container className="relative">
        <div className="fixed inset-0 z-40 flex h-full w-full items-center justify-center">
          <div className="text-center">
            <div className="font-display">Waiting for authentication…</div>
            <div className="font-display text-sm text-slate-500">
              If nothing happens, please contact me through the help center
              below.
            </div>
            <div className="relative mt-8">
              <Loader />
            </div>
          </div>
          <Help forceShow />
        </div>
      </Container>
    </>
  )
}
