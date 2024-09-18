import React from "react"

import { CreateWebsiteModal } from "../components/general/CreateWebsiteModal/CreateWebsiteModal"
import { Wrapper as FullPageLoader } from "../components/general/FullPageLoader/FullPageLoader"
import { Notifications } from "../components/general/Notifications/Notifications"
import { Protected } from "../components/general/Protected/Protected"
import { RedirectToWebsiteOrCreate } from "../components/general/RedirectToWebsiteOrCreate/RedirectToWebsiteOrCreate"
import { Seo } from "../components/general/Seo/Seo"

function Administration(props) {
  return (
    <>
      <Protected>
        <Seo
          title={""}
          description={""}
          lang={""}
          langUrls={[]}
          index={false}
        />

        <section className="flex min-h-full flex-col font-sans text-slate-600 antialiased">
          <main className="relative">
            <FullPageLoader show />
            <RedirectToWebsiteOrCreate />
          </main>
        </section>
        <CreateWebsiteModal />
        <Notifications />
      </Protected>
    </>
  )
}

export default Administration
