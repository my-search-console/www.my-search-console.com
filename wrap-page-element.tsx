import React from "react"
import { CustomIntlProvider } from "./src/components/general/CustomIntlProvider/CustomIntlProvider"

export default ({ element, props }) => {
  return (
    <CustomIntlProvider langKey={props.pageContext.langKey}>
      <>{element}</>
    </CustomIntlProvider>
  )
}
