import React from "react"

import { Wrapper as FullPageLoader } from "../components/general/FullPageLoader/FullPageLoader"
import { RedirectToWebsiteOrCreate } from "../components/general/RedirectToWebsiteOrCreate/RedirectToWebsiteOrCreate"
import { CreateWebsiteModal } from "../components/general/CreateWebsiteModal/CreateWebsiteModal"
import { Seo } from "../components/general/Seo/Seo"
import { Notifications } from "../components/general/Notifications/Notifications"
import { Protected } from "../components/general/Protected/Protected"

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
            <CreateWebsiteModal />
          </main>
        </section>
        <Notifications />
      </Protected>
    </>
  )
}

export default Administration
