import React from "react"
import { CustomIntlProvider } from "./src/components/general/CustomIntlProvider/CustomIntlProvider"
import { NewsModal } from "./src/components/general/News/components/NewsModal/NewsModal"

export default ({ element, props }) => {
  return (
    <CustomIntlProvider langKey={props.pageContext.langKey}>
      <>
        {element}
        <NewsModal />
      </>
    </CustomIntlProvider>
  )
}
