import React from "react"
import { Provider } from "react-redux"
import { StaticInitialization } from "./src/components/general/StaticInitialization/StaticInitialization"
import { ModuleProvider } from "./src/modules/ModuleProvider"
import { init } from "./src/redux/store"

const module = new ModuleProvider().build()

const { store } = init({}, module)

export default ({ element }) => {
  return (
    <Provider store={store}>
      <StaticInitialization>
        <>{element}</>
      </StaticInitialization>
    </Provider>
  )
}
