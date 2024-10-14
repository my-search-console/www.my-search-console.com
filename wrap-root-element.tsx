import React from "react"
import { Provider } from "react-redux"
import { StaticInitialization } from "./src/components/general/StaticInitialization/StaticInitialization"
import { ModuleProvider } from "./src/modules/ModuleProvider"
import { init } from "./src/redux/store"

export default ({ element }) => {
  const module = new ModuleProvider().build()

  const { store } = init({}, module)

  return (
    <Provider store={store}>
      <StaticInitialization>
        <>{element}</>
      </StaticInitialization>
    </Provider>
  )
}
